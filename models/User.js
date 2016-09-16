module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });
};