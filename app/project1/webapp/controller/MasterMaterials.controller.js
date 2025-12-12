sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("com.sap.dashboard.controller.MasterMaterials", {
        onInit: function () {
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Dashboard");
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var oTable = this.byId("materialsTable");
            var oBinding = oTable.getBinding("items");
            
            if (sQuery) {
                var aFilters = [
                    new Filter("materialCode", FilterOperator.Contains, sQuery),
                    new Filter("materialName", FilterOperator.Contains, sQuery),
                    new Filter("materialType", FilterOperator.Contains, sQuery),
                    new Filter("materialGroup", FilterOperator.Contains, sQuery)
                ];
                oBinding.filter(new Filter({
                    filters: aFilters,
                    and: false
                }));
            } else {
                oBinding.filter([]);
            }
        },

        onAddMaterial: function () {
            MessageToast.show("Add Material functionality - to be implemented");
        },

        onMaterialSelect: function (oEvent) {
            var oItem = oEvent.getSource();
            var oContext = oItem.getBindingContext();
            MessageToast.show("Selected: " + oContext.getProperty("materialName"));
        }
    });
});