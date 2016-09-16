var GetGroups = function (database, socket) {

    database.Group.findAll().then(success, failure);

    function success(groups) {
        console.log(groups);
        getGroupsResult(true, "Found All Groups", groups);
    }

    function failure(error) {
        console.log(error);
        getGroupsResult(false, "Server Error");
    }

    function getGroupsResult(success, message, groups) {
        console.log("Success: " + success);
        console.log("Message: " + message);
        console.log("Groups: " + groups);
        socket.emit('get_groups_result', {
            success:success,
            message:message,
            groups:groups
        });
    }
};

module.exports = GetGroups;