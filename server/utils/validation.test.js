var expect = require('expect');

var {isRealString} = require('./validations');
describe('Validation: Method isRealString', () => {
    it('Should reject non string values', () => {
        var value = 1;

        var result = isRealString(value);
        expect(result).toBeFalsy();
    });

    it('Should reject strings with only spaces', () => {
        var value = '           ';

        var result = isRealString(value);
        expect(result).toBeFalsy();
    });

    it('Should allow strings with non only spaces', () => {
        var value = 'This is a valid string';

        var result = isRealString(value);
        expect(result).toBeTruthy();
    });
});
