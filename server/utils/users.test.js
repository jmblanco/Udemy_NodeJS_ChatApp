var expect = require('expect');

var {Users} = require('./users');
describe('Users: Method addUser', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {id:'1', name: 'Mike', room: 'Node Course'},
            {id:'2', name: 'Jen', room: 'React Course'},
            {id:'3', name: 'July', room: 'Node Course'},
        ];
    });

    it('Should add a new user to the array', () => {
        var user = {
            id: '123',
            name: 'Jose',
            room: 'Test'
        };
        var result = users.addUser(user.id, user.name, user.room);

        expect(result).not.toBeNull();
        expect(users.users.length).toBe(4);
        expect(users.users).toContainEqual(user);
    });

    it('Should remove user from the array', () => {
        var userRemove = users.users[1];
        var userRemoved = users.removeUser(userRemove.id);
        
        expect(users.users.length).toBe(2);
        expect(users.users).not.toContainEqual(userRemove);
        expect(userRemoved.id).toBe(userRemove.id);
    });

    it('Should not remove user from the array', () => {
        var userRemoved = users.removeUser('12312');

        expect(userRemoved).toBeUndefined();
        expect(users.users.length).toBe(3);
    });

    it('Should return the user by id', () => {
        var userId = '1';
        var user = users.getUser(userId);

        expect(user).not.toBeUndefined();
        expect(user.id).toBe(userId);
        expect(user.name).toBe('Mike');
    });

    it('Should not return the user by id', () => {
        var userId = '12312';
        var user = users.getUser(userId);

        expect(user).toBeUndefined();
    });

    it('Should return the users that are in the room Node Course', () => {
        var room = 'Node Course';
        var usersList = users.getUsersList(room);

        expect(usersList).not.toBeNull();
        expect(usersList.length).toBe(2);
        expect(usersList).toEqual(['Mike','July']);
    });

    it('Should return the users that are in the room React Course', () => {
        var room = 'React Course';
        var usersList = users.getUsersList(room);

        expect(usersList).not.toBeNull();
        expect(usersList.length).toBe(1);
        expect(usersList).toEqual(['Jen']);
    });
});
