const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

/* Creates a user(s) table in MySQL Database. 
   Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const Criminal = db.define('criminal', {    
    criminal_name: {
        type: Sequelize.STRING
    },
    
});

module.exports = Criminal;
