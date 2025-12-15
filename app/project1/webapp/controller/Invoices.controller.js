sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, Filter, FilterOperator, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("com.sap.dashboard.controller.Invoices", {
        onInit: function () {
            // Mock data directly in controller
            var oData = {
                InvoiceReport: [
                    {
                        invoiceNumber: "INV1001",
                        purchaseOrder: { poNumber: "PO2001" },
                        vendor: { vendorName: "Vendor A" },
                        invoiceDate: "2025-12-01",
                        dueDate: "2025-12-10",
                        totalAmount: 1200,
                        currency: "USD",
                        status: "Paid",
                        verificationStatus: "Verified"
                    },
                    {
                        invoiceNumber: "INV1002",
                        purchaseOrder: { poNumber: "PO2002" },
                        vendor: { vendorName: "Vendor B" },
                        invoiceDate: "2025-12-05",
                        dueDate: "2025-12-15",
                        totalAmount: 800,
                        currency: "USD",
                        status: "Pending",
                        verificationStatus: "Pending"
                    }
                ],
                InvoicePrinting: [
                    {
                        printID: "PR1001",
                        invoice: { invoiceNumber: "INV1001" },
                        printDate: "2025-12-02T10:30:00",
                        printedBy: "User1",
                        copies: 2
                    },
                    {
                        printID: "PR1002",
                        invoice: { invoiceNumber: "INV1002" },
                        printDate: "2025-12-06T15:00:00",
                        printedBy: "User2",
                        copies: 1
                    }
                ]
            };
            
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Dashboard");
        },

        onTabSelect: function (oEvent) {
            var sKey = oEvent.getParameter("key");
            MessageToast.show("Selected tab: " + sKey);
        },

        onSearchInvoice: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var oTable = this.byId("invoiceTable");
            var oBinding = oTable.getBinding("items");

            if (sQuery) {
                var aFilters = [
                    new Filter("invoiceNumber", FilterOperator.Contains, sQuery),
                    new Filter("status", FilterOperator.Contains, sQuery)
                ];
                oBinding.filter(new Filter({ filters: aFilters, and: false }));
            } else {
                oBinding.filter([]);
            }
        },

        onInvoiceSelect: function (oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext();
            MessageToast.show("Selected Invoice: " + oContext.getProperty("invoiceNumber"));
        }
    });
});
