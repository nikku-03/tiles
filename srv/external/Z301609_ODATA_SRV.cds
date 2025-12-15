/* checksum : 605a0eff25c1e1a79a1e39a3bf54d9c9 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.supported.formats : 'atom json xlsx'
service Z301609_ODATA_SRV {
  @cds.external : true
  @cds.persistence.skip : true
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.deletable : 'false'
  @sap.pageable : 'false'
  @sap.content.version : '1'
  entity ODATA_VBRKSet {
    @sap.unicode : 'false'
    @sap.label : 'SD Document'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.sortable : 'false'
    @sap.filterable : 'false'
    key Vbeln : String(10) not null;
    @sap.unicode : 'false'
    @sap.label : 'Client'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.sortable : 'false'
    @sap.filterable : 'false'
    Mandt : String(3) not null;
    @sap.unicode : 'false'
    @sap.label : 'Billing Type'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.sortable : 'false'
    @sap.filterable : 'false'
    Fkart : String(4) not null;
    @sap.unicode : 'false'
    @sap.label : 'BillingCategory'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.sortable : 'false'
    @sap.filterable : 'false'
    Fktyp : String(1) not null;
    @sap.unicode : 'false'
    @sap.label : 'Document cat.'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.sortable : 'false'
    @sap.filterable : 'false'
    Vbtyp : String(1) not null;
    @sap.unicode : 'false'
    @sap.label : 'Doc. Currency'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.sortable : 'false'
    @sap.filterable : 'false'
    @sap.semantics : 'currency-code'
    Waerk : String(5) not null;
    @sap.unicode : 'false'
    @sap.label : 'Sales Org.'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.sortable : 'false'
    @sap.filterable : 'false'
    Vkorg : String(4) not null;
    @sap.unicode : 'false'
    @sap.label : 'Distr. Channel'
    @sap.creatable : 'false'
    @sap.updatable : 'false'
    @sap.sortable : 'false'
    @sap.filterable : 'false'
    Vtweg : String(2) not null;
  };
};

