var DeleteGroup = function (database, socket, userId, groupId) {

    database.Group.destroy({
        where: {
            ownerId: userId,
            id: groupId
    }}).then(success, failure);

    function success(count) {
        console.log(count);
        if(count > 0) {
            deleteGroupResult(true, "Group Deleted");
        } else {
            deleteGroupResult(false, "Group Not Found");
        }
    }

    function failure(error) {
        console.log(error);
        deleteGroupResult(false, "Server Error");
    }

    function deleteGroupResult(success, message) {
        console.log("Success: " + success);
        console.log("Message: " + message);
        socket.emit('delete_group_result', {
            success:success,
            message:message
        });
    }
};

module.exports = DeleteGroup;