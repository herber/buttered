import { toHash } from '../to-hash';

describe('to-hash', () => {
    it('regression', () => {
        const res = toHash('goober');

        expect(res).toEqual('butter_wwzczp');
        expect(toHash('goober')).toEqual('butter_wwzczp');
    });

    it('collision', () => {
        const a = toHash('background:red;color:black;');
        const b = toHash('background:black;color:red;');

        expect(a === b).toBeFalsy();
    });
});
