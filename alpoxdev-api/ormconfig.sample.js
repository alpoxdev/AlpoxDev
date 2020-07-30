var sourceConfig = {
    "type": "mysql",
    "host": "",
    "port": 3306,
    "username": "",
    "password": "",
    "database": "",
    "entities": [
        __dirname + "/src/entities/*.ts"
    ]
}

var distConfig = {
    "type": "mysql",
    "host": "",
    "port": 3306,
    "username": "",
    "password": "",
    "database": "",
    "entities": [
        __dirname + "/dist/src/entities/*.js"
    ]
};

var exportConfig = process.env.NODE_ENV === 'dev' ? sourceConfig : distConfig;
module.exports = exportConfig;