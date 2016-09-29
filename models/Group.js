module.exports = function(sequelize, DataTypes) {

    //Set the properties of the Group model
    var Group = sequelize.define('group', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        freezeTableName: true,
        classMethods: {
            //Add function to set the type of associations to make
            associate: function (models) {
                Group.belongsTo(models.User, {
                    as: 'owner',
                    onUpdate: 'cascade',
                    onDelete: 'cascade',
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Group;
};