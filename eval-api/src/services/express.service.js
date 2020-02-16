const express = require('express');
const config = require('../configs/server.config');
const bodyParser = require('body-parser');
const apiRouter = require('../routes');

const app = express();

// middleware
app.use(bodyParser.json());
app.use('/api-eval', apiRouter);

exports.start = () => {
    let port = config.port;
    let name = config.name;
    app.listen(port, (err) => {
        if (err) {
            console.log(`Error: ${err}`);
            process.exit(-1);
        }
        console.log(`${name} running on port ${port}`);
    })
}
