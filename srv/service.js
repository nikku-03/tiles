const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    
    const db = this.entities;
    
    // Dashboard Summary
    this.on('READ', 'DashboardSummary', async (req) => {
        const vendorCount = await SELECT.from(db.VendorMaster).count();
        const materialCount = await SELECT.from(db.MasterMaterials).count();
        const poCount = await SELECT.from(db.PurchaseOrders).count();
        const grCount = await SELECT.from(db.GoodsReceipt).count();
        const invoiceCount = await SELECT.from(db.InvoiceReport).count();
        const errorCount = await SELECT.from(db.ErrorLogs).count();
        
        return [
            { metric: 'VendorMaster', count: vendorCount, status: 'Active', additionalInfo: '35 new this week' },
            { metric: 'MasterMaterials', count: materialCount, status: 'Active', additionalInfo: '98% active' },
            { metric: 'PurchaseOrders', count: poCount, status: 'Pending', additionalInfo: '3 pending approval' },
            { metric: 'GoodsReceipt', count: grCount, status: 'Warning', additionalInfo: '4 overdue' },
            { metric: 'InvoiceReport', count: invoiceCount, status: 'Warning', additionalInfo: '2 need verification' },
            { metric: 'ErrorLogs', count: errorCount, status: 'Critical', additionalInfo: 'Requires attention' }
        ];
    });
    
    // Get Vendor Statistics
    this.on('getVendorStats', async (req) => {
        const total = await SELECT.from(db.VendorMaster).count();
        const active = await SELECT.from(db.VendorMaster).where({ status: 'Active' }).count();
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const newThisWeek = await SELECT.from(db.VendorMaster)
            .where({ createdAt: { '>': oneWeekAgo } })
            .count();
        
        return {
            totalVendors: total,
            newThisWeek: newThisWeek,
            activeVendors: active
        };
    });
    
    // Get Material Statistics
    this.on('getMaterialStats', async (req) => {
        const total = await SELECT.from(db.MasterMaterials).count();
        const active = await SELECT.from(db.MasterMaterials).where({ status: 'Active' }).count();
        const inactive = total - active;
        const activePercentage = total > 0 ? (active / total) * 100 : 0;
        
        return {
            totalMaterials: total,
            activePercentage: parseFloat(activePercentage.toFixed(2)),
            inactiveCount: inactive
        };
    });
    
    // Get Purchase Order Statistics
    this.on('getPOStats', async (req) => {
        const total = await SELECT.from(db.PurchaseOrders).count();
        const pending = await SELECT.from(db.PurchaseOrders)
            .where({ approvalStatus: 'Pending Approval' })
            .count();
        const approved = await SELECT.from(db.PurchaseOrders)
            .where({ approvalStatus: 'Approved' })
            .count();
        const rejected = await SELECT.from(db.PurchaseOrders)
            .where({ approvalStatus: 'Rejected' })
            .count();
        
        return {
            totalOrders: total,
            pendingApproval: pending,
            approved: approved,
            rejected: rejected
        };
    });
    
    // Approve Order Action
    this.on('approveOrder', async (req) => {
        const { orderID } = req.data;
        
        await UPDATE(db.PurchaseOrders)
            .set({ approvalStatus: 'Approved', status: 'In Process' })
            .where({ ID: orderID });
        
        return 'Purchase Order approved successfully';
    });
    
    // Reject Order Action
    this.on('rejectOrder', async (req) => {
        const { orderID, reason } = req.data;
        
        await UPDATE(db.PurchaseOrders)
            .set({ approvalStatus: 'Rejected', status: 'Rejected' })
            .where({ ID: orderID });
        
        return `Purchase Order rejected: ${reason}`;
    });
    
    // Verify Invoice Action
    this.on('verifyInvoice', async (req) => {
        const { invoiceID } = req.data;
        
        await UPDATE(db.InvoiceReport)
            .set({ verificationStatus: 'Verified', status: 'Approved' })
            .where({ ID: invoiceID });
        
        return 'Invoice verified successfully';
    });
    
    // Resolve Error Action
    this.on('resolveError', async (req) => {
        const { errorID } = req.data;
        
        await UPDATE(db.ErrorLogs)
            .set({ 
                requiresAttention: false, 
                resolvedAt: new Date(),
                resolvedBy: req.user.id 
            })
            .where({ ID: errorID });
        
        return 'Error resolved';
    });
    
    // Auto generate vendor code
    this.before('CREATE', 'VendorMaster', async (req) => {
        if (!req.data.vendorCode) {
            const count = await SELECT.from(db.VendorMaster).count();
            req.data.vendorCode = `VEN${String(count + 1).padStart(6, '0')}`;
        }
        req.data.createdAt = new Date();
    });
    
    // Auto generate material code
    this.before('CREATE', 'MasterMaterials', async (req) => {
        if (!req.data.materialCode) {
            const count = await SELECT.from(db.MasterMaterials).count();
            req.data.materialCode = `MAT${String(count + 1).padStart(6, '0')}`;
        }
        req.data.createdAt = new Date();
    });
    
    // Auto generate PO number
    this.before('CREATE', 'PurchaseOrders', async (req) => {
        if (!req.data.poNumber) {
            const count = await SELECT.from(db.PurchaseOrders).count();
            req.data.poNumber = `PO${String(count + 1).padStart(8, '0')}`;
        }
    });
    
    // Auto generate GR number
    this.before('CREATE', 'GoodsReceipt', async (req) => {
        if (!req.data.grNumber) {
            const count = await SELECT.from(db.GoodsReceipt).count();
            req.data.grNumber = `GR${String(count + 1).padStart(8, '0')}`;
        }
    });
});