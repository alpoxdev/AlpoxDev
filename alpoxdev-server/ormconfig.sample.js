var type = "mysql";
var host = "";
var port = 0;
var username = "";
var password = "";
var database = "";
var logging = false;
var synchronize = true;

var sourceConfig = {
    type,
    host,
    port,
    username,
    password,
    database,
    logging,
    synchronize,
    entities : [
        __dirname + "/src/entities/*.ts"
    ]
}

var distConfig = {
    type,
    host,
    port,
    username,
    password,
    database,
    logging : false,
    synchronize : false,
    entities : [
        __dirname + "/dist/src/entities/*.js"
    ]
};

var exportConfig = (process.env.TYPEORM_ENV === 'src') ? sourceConfig : distConfig;
module.exports = exportConfig;
