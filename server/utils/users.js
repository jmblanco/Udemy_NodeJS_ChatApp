class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        // var userRemoved;
        // for(var index = 0; index < this.users.length; index++){
        //     if(this.users[index].id === id){
        //         userRemoved = this.users[index];
        //         this.users.splice(index, 1);
        //         break;
        //     }
        // }
        // return userRemoved;
        var userRemoved = this.getUser(id);
        if(userRemoved){
            this.users = this.users.filter((user) => user.id != userRemoved.id);
        }
        return userRemoved;
    }

    getUser(id){
        // var result;
        // this.users.forEach(user => {
        //     if(user.id === id){
        //         console.log(user);
        //         result = user;
        //     }
        // });
        // return result;
        var user = this.users.filter((user) => user.id === id)[0];
        return user;
    }

    getUsersList(room) {
        // var usersRoom = [];
        // this.users.forEach(user => {
        //     if(user.room === room){
        //         usersRoom.push(user.name);
        //     }
        // });
        // return usersRoom;

        var users = this.users.filter((user) => user.room === room);
        var namesArrays = users.map((user) => user.name);
        return namesArrays;
    }
}

module.exports = {
    Users
};

