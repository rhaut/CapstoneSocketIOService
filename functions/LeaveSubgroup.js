var LeaveSubgroup = function (database, socket, userId) {

    //Removes the user from the subgroup they are in.
    database.Member.destroy(
        {
            where: {
                userId: userId
            }
        }
    ).then(success, failure);

    //Returns the successful result if they left more than 0 groups.
    function success(count) {
        console.log(count);
        if(count > 0) {
            leaveSubgroupResult(true, "Left Group");
        } else {
            leaveSubgroupResult(false, "Could Not Leave Group");
        }
    }

    //Returns the unsuccessful result to the user.
    function failure(error) {
        console.log(error);
        leaveSubgroupResult(false, "Server Error");
    }

    //Logs and emits the result to the user.
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