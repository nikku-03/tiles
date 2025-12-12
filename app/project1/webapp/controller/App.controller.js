sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";
  return Controller.extend("com.sap.dashboard.controller.App", {
    onInit: function() {
      // Controller init
      console.log("App.controller initialized");
    }
  });
});
