const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const Z301609_ODATA_SRV = await cds.connect.to("Z301609_ODATA_SRV"); 
      srv.on('READ', 'ODATA_VBRKSet', req => Z301609_ODATA_SRV.run(req.query)); 
}