module.exports = function(sequelize, DataTypes) {

    //Set the properties of the User model
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
        freezeTableName: true
    });
};