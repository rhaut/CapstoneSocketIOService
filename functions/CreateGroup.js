var CreateGroup = function (database, socket, userId, name) {

    database.sequelize.transaction(function (t) {
        return database.Group.create({
            ownerId: userId,
            name: name
        }, {transaction: t}).then(function (group) {
            group = group.get({plain: true});
            return database.Subgroup.create({
                groupId: group.id
            }, {transaction: t}).then(function () {
                createGroupResult(true, "Group Created", group.id);
            });
        });
    }).then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log(err);
        createGroupResult(false, "Failed To Create Group");
    });

    function createGroupResult(success, message, groupId) {
        console.log("Success: " + success);
        console.log("Message: " + message);
        console.log("Group Id: " + groupId);
        socket.emit('create_group_result', {
            success:success,
            message:message,
            group_id:groupId
        });
    }
};

module.exports = CreateGroup;