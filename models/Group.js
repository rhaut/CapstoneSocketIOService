module.exports = function(sequelize, DataTypes) {
    var Group = sequelize.define('group', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        freezeTableName: true,
        classMethods: {
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