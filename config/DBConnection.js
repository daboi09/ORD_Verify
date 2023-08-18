const mySQLDB = require('./DBConfig');
const Criminal = require('../models/Criminal')
const IDflag = require('../models/IDflag')

// If drop is true, all existing tables are dropped and recreated
const setUpDB = (drop) => {
    mySQLDB.authenticate()
        .then(() => {
            console.log('Wanted database connected');
        })
        .then(() => {
            /*
              Defines the relationship where a user has many videos.
              In this case the primary key from user will be a foreign key
              in video.
            */
            mySQLDB.sync({ // Creates table if none exists
                force: drop
            }).then(() => {
                console.log('Create tables if none exists')
            }).catch(err => console.log(err))
        })
        .catch(err => console.log('Error: ' + err));
};

module.exports = { setUpDB };
