import mocha from 'mocha';
import { should } from 'chai';
import { url } from '../config';
import { App } from "../app";

should();

describe('App test', () => {
    it('Should return user', async () => {
        const userId = '1';

        const app = new App(url);

        const user = await app.get(userId);

        user.should.be('object').includes('success').eq(true);
    })
});
