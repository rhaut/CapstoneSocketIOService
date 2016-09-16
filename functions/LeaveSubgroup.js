var LeaveSubgroup = function (database, socket, userId) {

    database.Member.destroy(
        {
            where: {
                userId: userId
            }
        }
    ).then(success, failure);

    function success(count) {
        console.log(count);
        if(count > 0) {
            leaveSubgroupResult(true, "Left Group");
        } else {
            leaveSubgroupResult(false, "Could Not Leave Group");
        }
    }

    function failure(error) {
        console.log(error);
        leaveSubgroupResult(false, "Server Error");
    }

    function leaveSubgroupResult(success, message) {
        console.log("Success: " + success);
        console.log("Message: " + message);
        socket.emit('leave_subgroup_result', {
            success:success,
            message:message
        });
    }
};

module.exports = LeaveSubgroup;