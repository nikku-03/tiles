using Z301609_ODATA_SRV from './external/Z301609_ODATA_SRV.cds';

service Z301609_ODATA_SRVSampleService {
    @readonly
    entity ODATA_VBRKSet as projection on Z301609_ODATA_SRV.ODATA_VBRKSet
    {        Mandt, key Vbeln, Fkart, Fktyp, Vbtyp, Waerk, Vkorg, Vtweg     }    
;
}