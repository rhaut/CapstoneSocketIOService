module.exports = function(sequelize, DataTypes) {
    var Member = sequelize.define('member', {
        points: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        freezeTableName: true,
        classMethods: {
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