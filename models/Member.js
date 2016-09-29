module.exports = function(sequelize, DataTypes) {

    //Set the properties of the Member model
    var Member = sequelize.define('member', {
        points: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        freezeTableName: true,
        classMethods: {
            //Add function to set the type of associations to make
            associate: function (models) {
                Member.belongsTo(models.User, {
                    as: 'user',
                    onUpdate: 'cascade',
                    onDelete: 'cascade',
                    foreignKey: {
                        allowNull: false,
                        unique: true
                    }
                });
                Member.belongsTo(models.Subgroup, {
                    as: 'subgroup',
                    onUpdate: 'cascade',
                    onDelete: 'cascade',
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Member;
};