var GetGroups = function (database, socket) {

    //Gets all groups and calls success and failure methods.
    database.Group.findAll().then(success, failure);

    //Returns the groups to the user
    function success(groups) {
        console.log(groups);
        getGroupsResult(true, "Found All Groups", groups);
    }

    //Returns an error to the user
    function failure(error) {
        console.log(error);
        getGroupsResult(false, "Server Error");
    }

    //Logs and emits the result to the user.
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