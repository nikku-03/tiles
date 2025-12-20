const approuter = require('@sap/approuter');

// Set destinations as environment variable
process.env.destinations = JSON.stringify([
    {
        name: "backend",
        url: "http://localhost:4004",
        forwardAuthToken: false,
        timeout: 600000
    },
    {
        name: "ui5",
        url: "https://sapui5.hana.ondemand.com"
    }
]);

const ar = approuter();
ar.start({
    port: process.env.PORT || 5000
});