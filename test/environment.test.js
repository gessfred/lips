var assert = require('assert');
var expect = require('chai').expect;
var environment = require('../environment')

const env1 = environment.extend('x', 3);
it('empty environnement extended by x should contain it', () => expect(env1.lookup('x')).to.equal(3));
it('empty should throw when looked up', () => expect(environment.lookup).to.throw());
const env2 = environment.extendMulti(['x', 'y'], [2, 3]);
it('extendMulti trivially extended by 2 values', () => {
    expect(env2.lookup('x')).to.equal(2);
    expect(env2.lookup('y')).to.equal(3);
    expect(env2.lookup).to.throw();
});