var DeleteGroup = function (database, socket, userId, groupId) {

    //Tries to destroy the group given if the user owns the group.
    database.Group.destroy({
        where: {
            ownerId: userId,
            id: groupId
    }}).then(success, failure);

    //If successful then emit the result to the user.
    function success(count) {
        console.log(count);
        if(count > 0) {
            deleteGroupResult(true, "Group Deleted");
        } else {
            deleteGroupResult(false, "Group Not Found");
        }
    }

    //If unsuccessful then emit the result to the user.
    function failure(error) {
        console.log(error);
        deleteGroupResult(false, "Server Error");
    }

    //Logs and emits the result to the user.
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