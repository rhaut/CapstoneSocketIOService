var Sequelize = require("sequelize");
var sequelize = new Sequelize('test', '', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
var db = {
    User: require("./User")(sequelize, Sequelize),
    Group: require("./Group")(sequelize, Sequelize),
    Subgroup: require("./Subgroup")(sequelize, Sequelize),
    Member: require("./Member")(sequelize, Sequelize)
};

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;