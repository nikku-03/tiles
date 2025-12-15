sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"dashboard/test/integration/pages/VendorMasterList",
	"dashboard/test/integration/pages/VendorMasterObjectPage"
], function (JourneyRunner, VendorMasterList, VendorMasterObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('dashboard') + '/test/flp.html#app-preview',
        pages: {
			onTheVendorMasterList: VendorMasterList,
			onTheVendorMasterObjectPage: VendorMasterObjectPage
        },
        async: true
    });

    return runner;
});

