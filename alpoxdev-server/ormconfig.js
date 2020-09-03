var type = "mysql";
var host = "database.ciiivo8gm65a.ap-northeast-2.rds.amazonaws.com";
var port = 3306;
var username = "alpoxdev";
var password = "siriuskp_08";
var database = "ALPOXDEV";
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
        __dirname + "/dist/entities/*.js"
    ]
};

var exportConfig = (process.env.TYPEORM_ENV === 'source') ? sourceConfig : distConfig;
module.exports = exportConfig;
