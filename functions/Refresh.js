var Refresh = function (database, socket, setId, username, token) {

    //Sets a new token for the user.
    database.User.update(
        {
            //TODO Generate a real token
            token: "123456"
        },
        {
            where: {
                username: username,
                token: token
            }
        }
    ).then(success, failure);

    //If successful the calls setId and returns the result to the user.
    function success(count) {
        console.log(count[0]);
        if(count[0] > 0) {
            setId(database, username, socket.id);
            refreshResult(true, "User Refreshed", username, token);
        } else {
            refreshResult(false, "Invalid Credentials");
        }
    }

    //Returns the unsuccessful result to the user.
    function failure(error) {
        console.log(error);
        refreshResult(false, "Server Error");
    }

    //Logs and returns the result to the user.
    function refreshResult(success, message, username, token) {
        console.log("Success: " + success);
        console.log("Message: " + message);
        console.log("Username: " + username);
        console.log("Token: " + token);
        socket.emit('refresh_result', {
            success:success,
            message:message,
            username:username,
            token:token
        })
    }
};

module.exports = Refresh;