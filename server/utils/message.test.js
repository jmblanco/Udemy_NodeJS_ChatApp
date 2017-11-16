var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');
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

describe('Message: Method generateLocationMessage', () => {
    it('Should generate correct location message object', () => {
        var from = 'Jose';
        var latitude = '40';
        var longitude = '-3';
        var expectedUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        
        var result = generateLocationMessage(from, latitude, longitude);
        expect(result).not.toBeNull();
        expect(result).toMatchObject({from, url:expectedUrl});
        expect(typeof result.createdAt).toBe('number');
    });
});