module.exports = function(sequelize, DataTypes) {

    //Set the properties of the Subgroup model
    var Subgroup = sequelize.define('subgroup', {
    }, {
        freezeTableName: true,
        classMethods: {
            //Add function to set the type of associations to make
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