const db = require('./dist/src/db');

// for typeorm cli to work, it must be connected to a default connection.
const dbConfig = db.createConnectionConfig('default');

module.exports = dbConfig;
