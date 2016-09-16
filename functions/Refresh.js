var Refresh = function (database, socket, setId, username, token) {

    database.User.update(
        {
            token: "123456"
        },
        {
            where: {
                username: username,
                token: token
            }
        }
    ).then(success, failure);

    function success(count) {
        console.log(count[0]);
        if(count[0] > 0) {
            setId(database, username, socket.id);
            refreshResult(true, "User Refreshed", username, token);
        } else {
            refreshResult(false, "Invalid Credentials");
        }
    }

    function failure(error) {
        console.log(error);
        refreshResult(false, "Server Error");
    }

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