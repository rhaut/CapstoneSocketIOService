var JoinSubgroup = function (database, socket, userId, subgroupId) {

    database.Member.create({
        userId: userId,
        subgroupId: subgroupId
    }).then(success, failure);

    function success(user) {
        console.log(user.get({
            plain: true
        }));
        joinSubgroupResult(true, "User Joined Subgroup");
    }

    function failure(error) {
        console.log(error);
        joinSubgroupResult(false, "User Could Not Join");
    }

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