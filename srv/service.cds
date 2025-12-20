using { com.sap.dashboard as db } from '../db/schema';

service DashboardService @(path: '/po') @(requires: 'authenticated-user') {
    @(odata.draft.enabled: true,
    restrict: [{grant: '*', to: ['AdminRole']},
                {grant: '*', to:['ManagerRole']}])
    
    entity VendorMaster as projection on db.VendorMaster  ;
    entity MasterMaterials as projection on db.MasterMaterials;
    @odata.draft.enabled
    entity PurchaseOrders as projection on db.PurchaseOrders;
    action approvePO(poId: UUID) returns String;
    entity POItems as projection on db.POItems;
    entity GoodsReceipt as projection on db.GoodsReceipt;
    entity InvoiceReport as projection on db.InvoiceReport;
    entity InvoicePrinting as projection on db.InvoicePrinting;
    entity AuditReport  as projection on db.AuditReport;
    entity ErrorLogs as projection on db.ErrorLogs;
    entity SecuritySettings as projection on db.SecuritySettings;
    function getnorthwind() returns String ;
}