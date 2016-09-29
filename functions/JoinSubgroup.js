var JoinSubgroup = function (database, socket, userId, subgroupId) {

    //Adds the user to the specified sugroup
    database.Member.create({
        userId: userId,
        subgroupId: subgroupId
    }).then(success, failure);

    //Returns the successful result to the user.
    function success(user) {
        console.log(user.get({
            plain: true
        }));
        joinSubgroupResult(true, "User Joined Subgroup");
    }

    //Returns the unsuccessful result to the user.
    function failure(error) {
        console.log(error);
        joinSubgroupResult(false, "User Could Not Join");
    }

    //Logs and emits the result to the user.
    function joinSubgroupResult(success, message) {
        console.log("Success: " + success);
        console.log("Message: " + message);
        socket.emit('join_subgroup_result', {
            success:success,
            message:message
        });
    }
};

module.exports = JoinSubgroup;