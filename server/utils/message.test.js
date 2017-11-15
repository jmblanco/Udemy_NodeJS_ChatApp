var expect = require('expect');

var {generateMessage} = require('./message');
describe('Message: Method generateMessage', () => {
    it('Should generate correct message object', () => {
        var from = 'Jose';
        var text = 'This is a test text';

        var result = generateMessage(from, text);

        expect(result).not.toBeNull();
        //expect(result.text).toEqual(text);
        //expect(result.from).toEqual(from);
        expect(result).toMatchObject({from, text});
        expect(typeof result.createdAt).toBe('number');
    });
});