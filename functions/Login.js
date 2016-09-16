var Login = function (database, socket, setId, username, password) {

    var token = new Date().getTime();

    database.User.update({
            token: token
        },{
            where: {
                username: username,
                password: password
    }}).then(success, failure);

    function success(count) {
        console.log(count[0]);
        if(count[0] > 0) {
            setId(database, username, socket.id);
            loginResult(true, "User Logged In", username, token);
        } else {
            loginResult(false, "Invalid Credentials");
        }
    }

    function failure(error) {
        console.log(error);
        loginResult(false, "Server Error");
    }

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