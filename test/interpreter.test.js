const assert = require('assert');
const expect = require('chai').expect;
const {parse, lispTokenizer} = require('../parser')
const {evaluate, eval} = require('../interpreter')
const environment = require('../environment')



describe('evaluate (parse + eval) (text inputs)', () => {
    const pureeval = function(s, val) {
        const e = evaluate(s, environment)
        expect(e.value).to.equal(val)
        expect(e.env).to.equal(environment)
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
    })
})