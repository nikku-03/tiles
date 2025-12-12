namespace com.sap.dashboard;

entity VendorMaster {
    key ID : UUID;
    vendorCode : String(10);
    vendorName : String(100);
    country : String(50);
    city : String(50);
    email : String(100);
    phone : String(20);
    status : String(20) default 'Active';
    createdAt : Timestamp;
    createdBy : String(100);
}

entity MasterMaterials {
    key ID : UUID;
    materialCode : String(20);
    materialName : String(200);
    materialType : String(50);
    baseUnit : String(10);
    materialGroup : String(50);
    price : Decimal(10,2);
    currency : String(5);
    status : String(20) default 'Active';
    createdAt : Timestamp;
}

entity PurchaseOrders {
    key ID : UUID;
    poNumber : String(20);
    vendor : Association to VendorMaster;
    orderDate : Date;
    deliveryDate : Date;
    totalAmount : Decimal(15,2);
    currency : String(5);
    status : String(50) default 'Pending';
    approvalStatus : String(50) default 'Pending Approval';
    items : Composition of many POItems on items.purchaseOrder = $self;
}

entity POItems {
    key ID : UUID;
    purchaseOrder : Association to PurchaseOrders;
    material : Association to MasterMaterials;
    quantity : Decimal(10,2);
    unitPrice : Decimal(10,2);
    totalPrice : Decimal(15,2);
    deliveryDate : Date;
}

entity GoodsReceipt {
    key ID : UUID;
    grNumber : String(20);
    purchaseOrder : Association to PurchaseOrders;
    receiptDate : Date;
    status : String(50) default 'Received';
    isOverdue : Boolean default false;
    quantity : Decimal(10,2);
    remarks : String(500);
}

entity InvoiceReport {
    key ID : UUID;
    invoiceNumber : String(20);
    purchaseOrder : Association to PurchaseOrders;
    vendor : Association to VendorMaster;
    invoiceDate : Date;
    dueDate : Date;
    totalAmount : Decimal(15,2);
    currency : String(5);
    status : String(50) default 'Pending';
    verificationStatus : String(50) default 'Needs Verification';
    paymentStatus : String(50);
}

entity InvoicePrinting {
    key ID : UUID;
    printID : String(20);
    invoice : Association to InvoiceReport;
    printDate : Timestamp;
    printedBy : String(100);
    copies : Integer default 1;
}

entity AuditReport {
    key ID : UUID;
    auditID : String(20);
    auditType : String(100);
    auditDate : Date;
    auditor : String(100);
    findings : String(1000);
    status : String(50);
    lastRun : Timestamp;
}

entity ErrorLogs {
    key ID : UUID;
    errorCode : String(20);
    errorMessage : String(500);
    severity : String(20);
    occurredAt : Timestamp;
    module : String(100);
    requiresAttention : Boolean default true;
    resolvedAt : Timestamp;
    resolvedBy : String(100);
}

entity SecuritySettings {
    key ID : UUID;
    settingName : String(100);
    settingValue : String(500);
    isActive : Boolean default true;
    lastModified : Timestamp;
    modifiedBy : String(100);
}