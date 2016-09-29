var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Holds all data types
var database = require("./models/Database");

//All functions that can be called
var register = require("./functions/Register");
var login = require("./functions/Login");
var refresh = require("./functions/Refresh");
var deleteGroup = require("./functions/DeleteGroup");
var createGroup = require("./functions/CreateGroup");
var joinSubgroup = require("./functions/JoinSubgroup");
var leaveSubgroup = require("./functions/LeaveSubgroup");
var getGroups = require("./functions/GetGroups");

//Holds the authenticated users socketIds and userIds
global.authenticated = {};

//Associates the socketId with the userId to hold the session.
function setId(database, username, socketId) {

    database.User.findOne({
        where: {
            username: username
        }
    }).then(success, failure);

    function success(user) {
        user = user.get({
            plain: true
        });
        console.log(user);
        console.log(user.id);
        console.log(global.authenticated);
        global.authenticated[socketId] = user.id;
    }

    function failure(error) {
        console.log(error);
    }
}

//Deletes the session
function removeId(socketId) {
    delete global.authenticated[socketId];
}

//Gets the userId associated with the socketId
function getId(socketId) {
    return global.authenticated[socketId];
}

//Connection handler.  Logs the socketId and calls the appropriate function that was requested
io.on('connection', function (socket) {
    console.log("Connection: " + socket.id);
    socket.on('disconnect', function () {
        removeId(socket.id);
    });
    socket.on('register', function (data) {
        console.log(data);
        register(database, socket, data['username'], data['password']);
    });
    socket.on('login', function (data) {
        console.log(data);
        login(database, socket, setId, data['username'], data['password']);
    });
    socket.on('refresh', function (data) {
        console.log(data);
        refresh(database, socket, setId, data['username'], data['token']);
    });
    socket.on('create_group', function (data) {
        console.log(data);
        createGroup(database, socket, getId(socket.id), data['name']);
    });
    socket.on('join_subgroup', function (data) {
        console.log(data);
        joinSubgroup(database, socket, getId(socket.id), data['subgroup_id']);
    });
    socket.on('leave_subgroup', function (data) {
        console.log(data);
        leaveSubgroup(database, socket, getId(socket.id));
    });
    socket.on('delete_group', function (data) {
        console.log(data);
        deleteGroup(database, socket, getId(socket.id), data['group_id']);
    });
    socket.on('get_groups', function (data) {
        console.log(data);
        getGroups(database, socket);
    });
    socket.on('get_players', function (data) {
        console.log(data);
    })
});

//Synchronizes and starts the server.
database.sequelize.sync().then(function () {
    console.log("Starting Server...");
    server.listen(3000);
    console.log("Server Started");
});