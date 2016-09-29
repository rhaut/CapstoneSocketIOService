var Login = function (database, socket, setId, username, password) {

    //TODO Need to generate real tokens
    var token = new Date().getTime();

    //Sets the token for the user that logs in.
    database.User.update({
            token: token
        },{
            where: {
                username: username,
                password: password
    }}).then(success, failure);

    //If successful then calls setId and returns the result to the user.
    function success(count) {
        console.log(count[0]);
        if(count[0] > 0) {
            setId(database, username, socket.id);
            loginResult(true, "User Logged In", username, token);
        } else {
            loginResult(false, "Invalid Credentials");
        }
    }

    //Returns the unsuccessful result to the user.
    function failure(error) {
        console.log(error);
        loginResult(false, "Server Error");
    }

    //Logs and emits the result to the user.
    function loginResult(success, message, username, token) {
        console.log("Success: " + success);
        console.log("Message: " + message);
        console.log("Username: " + username);
        console.log("Token: " + token);
        socket.emit('login_result', {
            success:success,
            message:message,
            username:username,
            token:token
        });
    }
};

module.exports = Login;