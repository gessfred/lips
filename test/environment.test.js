var assert = require('assert');
var expect = require('chai').expect;
var {environment, collections, nil, globalEnv} = require('../src/core/environment')
const {evaluate, evalLisp} = require('../src/core/interpreter')

describe('environment', () => {
    const env1 = environment.extend('x', 3);
    it('empty environnement extended by x should contain it', () => expect(env1.lookup('x')).to.equal(3));
    it('empty should throw when looked up', () => expect(environment.lookup).to.throw());
    const env2 = environment.extendMulti(['x', 'y'], [2, 3]);
    it('extendMulti trivially extended by 2 values', () => {
        expect(env2.lookup('x')).to.equal(2);
        expect(env2.lookup('y')).to.equal(3);
        expect(env2.lookup).to.throw();
    });
    const robust1 = environment.extendMulti(['x'], [2, 3]);
    const robust2 = environment.extendMulti(['x', 'y'], [1]);
    it('robustness to baddly shaped arguments', () => {
        expect(robust1.lookup('x')).to.equal(2);
        expect(robust2.lookup('x')).to.equal(1);
        //expect y to throw
    });
    it('recursion simulation', () => {
        const rec = environment.extendRec('!', (env) => {
            env.lookup('!')
        })
        expect(() => rec.lookup('x')).to.not.throw
    })
    it('simple union of 2 one entry envs', () => {
        const env1 = environment.extend('a', 1)
        const env2 = environment.extend('b', 2)
        const res = env1.union(env2)
        expect(() => res.lookup('a')).to.not.throw
        expect(() => res.lookup('b')).to.not.throw
        expect(res.lookup('a')).to.equal(1)
        expect(res.lookup('b')).to.equal(2)
    })
    it('global environment', () => {
        expect(globalEnv.lookup('+')).to.throw
    })
    //add weird flows like extend -> extendRec -> extendMulti ...
    //like union -> extendRec -> union ...
    //solve scopes issues like extend(x, 2).extend(x, 1)
})

describe('collections', () => {
    it('nil', () => {
        expect(evalLisp(['nil'], collections).value).to.be.empty
    })
    it('cons pair', () => {
        const pair = evalLisp(['cons', 1, 2], collections).value
        expect(pair[0]).to.equal(1)
        expect(pair[1]).to.equal(2)
        expect(pair.length).to.equal(2)
    })
    it('cons list', () => {
        const list = evalLisp(['cons', 1, 'nil'], collections).value
        console.log(list)
        expect(list[0]).to.equal(1)
        //expect(list.length).to.equal(1)
        
    })
    it('car should return head', () => {
        console.log(evaluate('(cons 1 nil)', collections).value)
        expect(evaluate('(car (cons 1 nil))', collections).value).to.equal(1)
        
        //expect(evaluate('(car (cons 1 2))', collections).value).to.equal(1)
    })
    it('cdr should return second element of pair (not covered for now)', () => {
        //expect(evaluate('(cdr (cons 1 2))', collections).value).to.equal(2)
    })
    it('cdr should return tail', () => {
        expect(evaluate('(cdr (cons 1 nil))', collections).value).to.be.empty//.equal(nil)//.equal([])
    })
    it('access to second element', () => {
        expect(evaluate('(car (cdr (cons 1 (cons 2 nil))))', collections).value).to.equal(2)
    })

})
