const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

  const { PurchaseOrders, POItems } = this.entities;

  this.before('CREATE', PurchaseOrders, req => {

    if (!req.data.poNumber) {
      req.reject(400, 'PO Number is mandatory');
    }

    if (!req.data.vendor_ID) {
      req.reject(400, 'Vendor is mandatory');
    }

    req.data.status ??= 'Pending';
    req.data.approvalStatus ??= 'Pending Approval';
    req.data.createdAt = new Date();
    req.data.createdBy = req.user.id;
  });

  this.before('CREATE', POItems, req => {

    if (!req.data.purchaseOrder_ID) {
      req.reject(400, 'Purchase Order reference is mandatory');
    }

    if (!req.data.material_ID) {
      req.reject(400, 'Material is mandatory');
    }

    const { quantity, unitPrice } = req.data;

    if (!quantity || quantity <= 0) {
      req.reject(400, 'Quantity must be greater than zero');
    }

    if (!unitPrice || unitPrice <= 0) {
      req.reject(400, 'Unit price must be greater than zero');
    }

    req.data.totalPrice = quantity * unitPrice;
  });

  this.before('UPDATE', POItems, async req => {

    const tx = cds.tx(req);

    const item = await tx.run(
      SELECT.one.from(POItems).where({ ID: req.data.ID })
    );

    const po = await tx.run(
      SELECT.one.from(PurchaseOrders)
        .where({ ID: item.purchaseOrder_ID })
    );

    if (po.approvalStatus === 'Approved') {
      req.reject(409, 'Cannot update items of an approved PO');
    }
  });

  this.after('READ', PurchaseOrders, data => {

    const rows = Array.isArray(data) ? data : [data];

    rows.forEach(po => {
      po.statusText =
        po.approvalStatus === 'Approved'
          ? 'Approved'
          : 'Pending';
    });
  });

  this.on('CREATE', PurchaseOrders, req =>
    cds.tx(req).run(req.query)
  );

  this.on('READ', PurchaseOrders, req =>
    cds.tx(req).run(req.query)
  );

  this.on('UPDATE', PurchaseOrders, async req => {

    const tx = cds.tx(req);

    const po = await tx.run(
      SELECT.one.from(PurchaseOrders).where(req.data)
    );

    if (po.approvalStatus === 'Approved') {
      req.reject(409, 'Approved PO cannot be changed');
    }

    return tx.run(req.query);
  });

  this.on('DELETE', PurchaseOrders, async req => {

    const tx = cds.tx(req);

    const po = await tx.run(
      SELECT.one.from(PurchaseOrders).where(req.data)
    );

    if (po.approvalStatus === 'Approved') {
      req.reject(409, 'Approved PO cannot be deleted');
    }

    return tx.run(req.query);
  });

  this.on('approvePO', async req => {

    if (!req.user.is('Manager')) {
      req.reject(403, 'Only Manager can approve Purchase Orders');
    }

    const tx = cds.tx(req);

    const po = await tx.run(
      SELECT.one.from(PurchaseOrders)
        .where({ ID: req.data.poId })
    );

    if (!po) req.reject(404, 'PO not found');
    if (po.approvalStatus === 'Approved') return 'Already Approved';

    await tx.run(
      UPDATE(PurchaseOrders)
        .set({ status: 'Approved', approvalStatus: 'Approved' })
        .where({ ID: req.data.poId })
    );

    return 'Approved';
  });

  this.on('getTotal', async req => {

    const tx = cds.tx(req);

    const items = await tx.run(
      SELECT.from(POItems)
        .columns('totalPrice')
        .where({ purchaseOrder_ID: req.data.poId })
    );

    return items.reduce((sum, i) => sum + i.totalPrice, 0);
  });

  this.on('getnorthwind', async(req) => {
    const request = await fetch('https://services.odata.org/northwind/northwind.svc/Products?$format=json');

    const response = await request.json();
    return response;
  })
});
