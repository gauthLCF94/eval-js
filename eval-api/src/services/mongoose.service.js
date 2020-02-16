const mongoose = require('mongoose');
const config = require('../configs/db.config');

exports.connect = () => {
    let url = config.url;
    let params = config.params;
    mongoose.connect(url, params).then(
        () => {
            console.log('Database : connected');
        }
    ).catch(
        err => {
            console.log('Database : not connected', err);
            process.exit(-1);
        }
    )
}
