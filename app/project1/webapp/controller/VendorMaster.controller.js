// // sap.ui.define([
// //     "sap/ui/core/mvc/Controller",
// //     "sap/ui/model/Filter",
// //     "sap/ui/model/FilterOperator",
// //     "sap/m/MessageToast"
// // ], function (Controller, Filter, FilterOperator, MessageToast) {
// //     "use strict";

// //     return Controller.extend("com.sap.dashboard.controller.VendorMaster", {
// //         onInit: function () {
            
// //         },

// //         onNavBack: function () {
// //             this.getOwnerComponent().getRouter().navTo("Dashboard");
// //         },

// //         onSearch: function (oEvent) {
// //             var sQuery = oEvent.getParameter("query");
// //             var oTable = this.byId("vendorTable");
// //             var oBinding = oTable.getBinding("items");
            
// //             if (sQuery) {
// //                 var aFilters = [
// //                     new Filter("vendorCode", FilterOperator.Contains, sQuery),
// //                     new Filter("vendorName", FilterOperator.Contains, sQuery),
// //                     new Filter("country", FilterOperator.Contains, sQuery),
// //                     new Filter("city", FilterOperator.Contains, sQuery)
// //                 ];
// //                 oBinding.filter(new Filter({
// //                     filters: aFilters,
// //                     and: false
// //                 }));
// //             } else {
// //                 oBinding.filter([]);
// //             }
// //         },

// //         onAddVendor: function () {
// //             MessageToast.show("Add Vendor functionality - to be implemented");
// //         },

// //         onVendorSelect: function (oEvent) {
// //             var oItem = oEvent.getSource();
// //             var oContext = oItem.getBindingContext();
// //             MessageToast.show("Selected: " + oContext.getProperty("vendorName"));
// //         }
// //     });
// // });

// sap.ui.define([
//   "sap/ui/core/mvc/Controller",
//   "sap/ui/core/UIComponent"
// ], function (Controller, UIComponent) {
//   "use strict";

//   return Controller.extend("com.sap.dashboard.controller.VendorMaster", {

//     onVendorSelect: function (oEvent) {
//   const oItem = oEvent.getParameter("listItem");
//   const oCtx = oItem.getBindingContext("");
//   const sVendorId = oCtx.getProperty("ID");

//   this.getOwnerComponent()
//     .getRouter()
//     .navTo("VendorPOs", {
//       vendorId: sVendorId
//     });
// }
// ,

//     onNavBack: function () {
//       history.go(-1);
//     }
//   });
// });


sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, Fragment, JSONModel, MessageToast, MessageBox) {
  "use strict";

  return Controller.extend("com.sap.dashboard.controller.VendorMaster", {

    onInit: function () {
      this._oDialog = null;
      this._sMode = "create";
    },

    onCreate: function () {
      this._sMode = "create";
      this._openDialog({
        title: "Create Vendor"
      });
    },

    onEdit: function () {
      const oTable = this.byId("vendorTable");
      const oItem = oTable.getSelectedItem();

      if (!oItem) {
        MessageToast.show("Select a vendor first");
        return;
      }

      this._sMode = "edit";
      const oData = oItem.getBindingContext().getObject();

      this._openDialog({
        title: "Edit Vendor",
        ...oData
      });
    },

    onDelete: function () {
      const oTable = this.byId("vendorTable");
      const oItem = oTable.getSelectedItem();

      if (!oItem) {
        MessageToast.show("Select a vendor first");
        return;
      }

      const oCtx = oItem.getBindingContext();
      const oModel = this.getView().getModel();

      MessageBox.confirm("Delete this vendor?", {
        onClose: (sAction) => {
          if (sAction === "OK") {
            oModel.delete(oCtx.getPath()).then(() => {
              MessageToast.show("Vendor deleted");
            });
          }
        }
      });
    },

    onSave: function () {
      const oModel = this.getView().getModel();
      const oData = this.getView().getModel("dialog").getData();

      if (this._sMode === "create") {
        oModel.create("/VendorMaster", oData).then(() => {
          MessageToast.show("Vendor created");
          this._oDialog.close();
        });
      } else {
        oModel.update(`/VendorMaster(${oData.ID})`, oData).then(() => {
          MessageToast.show("Vendor updated");
          this._oDialog.close();
        });
      }
    },

    onCancel: function () {
      this._oDialog.close();
    },

    _openDialog: function (oData) {
      const oView = this.getView();

      if (!this._oDialog) {
        Fragment.load({
          name: "com.sap.dashboard.view.VendorDialog",
          controller: this
        }).then(oDialog => {
          this._oDialog = oDialog;
          oView.addDependent(oDialog);
          this._bindDialog(oData);
        });
      } else {
        this._bindDialog(oData);
      }
    },

    _bindDialog: function (oData) {
      const oModel = new JSONModel(oData);
      this.getView().setModel(oModel, "dialog");
      this._oDialog.open();
    },

    onNavBack: function () {
      history.go(-1);
    }

  });
});
