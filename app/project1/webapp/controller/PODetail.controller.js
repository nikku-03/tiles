sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("com.sap.dashboard.controller.PODetail", {

    onInit: function () {
      this.getOwnerComponent()
        .getRouter()
        .getRoute("PODetail") // MUST match manifest.json
        .attachPatternMatched(this._onMatched, this);
    },

    _onMatched: function (oEvent) {
      const sPOId = oEvent.getParameter("arguments").poId;

      const oTable = this.byId("itemsTable");
      if (!oTable) {
        return;
      }

      oTable.bindItems({
        path: `/PurchaseOrders('${sPOId}')/items`,
        template: this.byId("itemTemplate")
      });
    },

    onNavBack: function () {
      history.go(-1);
    }

  });
});
