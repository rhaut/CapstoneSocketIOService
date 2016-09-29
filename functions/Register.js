var Register = function (database, socket, username, password) {

    //Creates a new user if possible.
    database.User.create({
        username: username,
        password: password
    }).then(success, failure);

    //Returns the successful result to the user.
    function success(user) {
        console.log(user.get({
            plain: true
        }));
        registerResult(true, "User Created");
    }

    //Returns the unsuccessful result to the user.
    function failure(error) {
        console.log(error);
        registerResult(false, "User Already Exists");
    }

    //Logs and returns the result to the user.
    function registerResult(success, message) {
        console.log("Success: " + success);
        console.log("Message: " + message);
        socket.emit('register_result', {
            success:success,
            message:message
        });
    }
};

module.exports = Register;