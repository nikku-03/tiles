sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("com.sap.dashboard.controller.VendorPurchaseOrders", {

    onInit: function () {
      this.getOwnerComponent()
        .getRouter()
        .getRoute("VendorPOs")
        .attachPatternMatched(this._onMatched, this);
    },

    _onMatched: function (oEvent) {
      this._vendorId = oEvent.getParameter("arguments").vendorId;

      const oTable = this.byId("poTable");
      const oBinding = oTable.getBinding("items");

      const oFilter = new Filter(
        "vendor/ID",
        FilterOperator.EQ,
        this._vendorId
      );

      oBinding.filter([oFilter]);
    },

    onPOSelect: function (oEvent) {
      const oItem = oEvent.getSource();
      const oCtx = oItem.getBindingContext("");
      const sPOId = oCtx.getProperty("ID");

      this.getOwnerComponent()
        .getRouter()
        .navTo("PODetail", {
          poId: sPOId
        });
    },

    onNavBack: function () {
      history.go(-1);
    }

  });
});
