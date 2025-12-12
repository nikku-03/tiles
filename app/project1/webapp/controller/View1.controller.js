sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("com.sap.dashboard.controller.Dashboard", {
        onInit: function () {
            // var oDashboardModel = new JSONModel({
            //     vendorCount: 0,
            //     newVendorsThisWeek: 0,
            //     materialCount: 0,
            //     activeMaterialPercentage: 0,
            //     purchaseOrderCount: 0,
            //     pendingApprovalCount: 0,
            //     goodsReceiptCount: 0,
            //     overdueReceiptCount: 0,
            //     invoiceCount: 0,
            //     invoicesNeedingVerification: 0,
            //     invoicePrintingTotal: 0,
            //     invoicePrintingAmount: 0,
            //     auditReportCount: 0,
            //     errorLogCount: 0,
            //     errorsRequiringAttention: 0,
            //     securityStatus: ""
            // });
            // this.getView().setModel(oDashboardModel, "dashboardModel");
            
            // this._loadDashboardStats();
        },

        _loadDashboardStats: function () {
            var oModel = this.getView().getModel();
            var that = this;

            oModel.callFunction("/getDashboardStats", {
                method: "GET",
                success: function (oData) {
                    that.getView().getModel("dashboardModel").setData(oData.value);
                },
                error: function (oError) {
                    MessageToast.show("Error loading dashboard statistics");
                }
            });
        },

        onVendorPress: function () {
            this.getOwnerComponent().getRouter().navTo("Vendors");
        },

        onMaterialsPress: function () {
            this.getOwnerComponent().getRouter().navTo("Materials");
        },

        onPurchaseOrdersPress: function () {
            this.getOwnerComponent().getRouter().navTo("PurchaseOrders");
        },

        onGoodsReceiptPress: function () {
            this.getOwnerComponent().getRouter().navTo("GoodsReceipt");
        },

        onInvoicesPress: function () {
            this.getOwnerComponent().getRouter().navTo("Invoices");
        },

        onAuditPress: function () {
            this.getOwnerComponent().getRouter().navTo("Audit");
        }
    });
});