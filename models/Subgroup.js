module.exports = function(sequelize, DataTypes) {
    var Subgroup = sequelize.define('subgroup', {
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function (models) {
                Subgroup.belongsTo(models.Group, {
                    as: 'group',
                    onUpdate: 'cascade',
                    onDelete: 'cascade',
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Subgroup;
};