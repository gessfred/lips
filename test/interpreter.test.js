const assert = require('assert');
const expect = require('chai').expect;
const {parse, lispTokenizer} = require('../parser')
const {evaluate, eval} = require('../interpreter')
const environment = require('../environment')



describe('evaluate (parse + eval) (text inputs)', () => {
    const pureeval = (s, val) => pureevalon(s, val, environment)
    
    const pureevalon = function(s, val, env) {
        const e = evaluate(s, env)
        expect(e.value).to.equal(val)
        expect(e.env).to.equal(env)
    }

    it('symbol lookup in empty env should throw', () => {
        expect(() => evaluate(('(a)'), environment)).to.throw
    })
    it('number evaluation should return that number and the environmenet unchanged', () => {
        pureeval('(1)', 1)
    })
    it('simple numeric ifs', () => {
        pureeval('(if 0 0 1)', 1)
        pureeval('(if 1 0 1)', 0)
        pureeval('(if (0) (0) (1))', 1)
    })
    const arithmeticEnv = environment
    .extend('+', ([x, y]) => x + y)
    .extend('-', ([x, y]) => x - y)
    .extend('*', ([x, y]) => x * y)
    .extend('>', ([x, y]) => x > y ? 1 : 0)
    it('arithmetic operators', () => {
        pureevalon('(+ 1 2)', 3, arithmeticEnv)
    })
    it('trivial lambda', () => {
        pureevalon('((lambda (x y) (+ x y))  1 2)', 3, arithmeticEnv)
        
    })
    it('def GLOBAL', () => {
        const w = evaluate('(def x 3)', environment)
        expect(evaluate('(x)', w.env).value).to.equal(3)
    })
    it('def GLOBAL/LOCAL', () => {
        
    })
    it('def lambda expansion', () => {
        const w = evaluate('(def (double x) (+ x x))', arithmeticEnv)
        pureevalon('(double 10)', 20, w.env)
    })
    it('def max funtion', () => {
        const max = evaluate('(def (max x y) (if (> x y) x y))', arithmeticEnv)
        expect(max.env).to.not.be.equal(arithmeticEnv)
        expect(() => max.env.lookup('max')).to.not.throw
        expect(evaluate('(max 3 5)', max.env).value).to.equal(5)
        expect(evaluate('(max 5 3)', max.env).value).to.equal(5)
    })
    it('def recursive', () => {
        const fact = evaluate("(def (! n) (if (> n 0) (* n (! (- n 1))) 1))", arithmeticEnv)
        //console.log(fact.env.lookup('!'))
        //pureevalon('(! 5)', 120, fact.env)
        expect(fact.env).to.not.be.equal(arithmeticEnv)
        expect(() => fact.env.lookup('!')).to.not.throw
        console.log(fact.env.lookup('!')([3]))
        //evaluate('(! 5)', fact.env)
    })
})