var Register = function (database, socket, username, password) {

    database.User.create({
        username: username,
        password: password
    }).then(success, failure);

    function success(user) {
        console.log(user.get({
            plain: true
        }));
        registerResult(true, "User Created");
    }

    function failure(error) {
        console.log(error);
        registerResult(false, "User Already Exists");
    }

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