const assert = require('assert');
const expect = require('chai').expect;
const {parse, lispTokenizer, sanitize} = require('../src/core/parser')

describe('lispTokenizer', () => {
    it('no input', () => {
        const it = lispTokenizer('')
        expect(it.next).to.throw()
        expect(it.hasNext()).to.be.false
    })
    it('single input (abc)', () => {
        const it = lispTokenizer('(abc)')
        expect(it.hasNext()).to.be.true
        expect(it.next()).to.equal('(')
        expect(it.next()).to.equal('abc')
        expect(it.next()).to.equal(')')
        expect(it.hasNext()).to.be.false
        expect(it.next).to.throw()
    })
    it('three inputs', () => {
        const it = lispTokenizer('(a b c)')
        it.next()
        expect(it.next()).to.equal('a')
        expect(it.next()).to.equal('b')
        expect(it.next()).to.equal('c')
        it.next()
        expect(it.next).to.throw
    })
    it('malformed inputs', () => {
        const it1 = lispTokenizer('( a)')
        const it2 = lispTokenizer('(a )')
        
    })
    it('malformed empty inputs', () => {
        const it2 = lispTokenizer('(')
        const it1 = lispTokenizer('  (  ) ')
        expect(it1.next()).to.equal('(')
        expect(it1.next()).to.equal(')')
        expect(it1.hasNext()).to.be.false
        expect(it1.next).to.throw
        expect(it2.next()).to.equal('(')
        expect(it2.next).to.throw
    })
    it('nested inputs', () => {

    })
})

describe('parser', () => {
    it('unbalance', () => {
        expect(() => parse('(')).to.throw()
        expect(() => parse(')')).to.throw()
    })
    it('single input', () => {
        const [head, ...tail] = parse('(def)')
        expect(head).to.equal('def')
        expect(tail).to.be.empty
    })
    it('(a b c)', () => {
        const [a, b, c, ...rest] = parse('(a b c)')
        expect(a).to.equal('a')
        expect(b).to.equal('b')
        expect(c).to.equal('c')
        expect(rest).to.be.empty
    })
    it('empty input', () => {
        expect(parse('()')).to.be.empty
    })
    it('malformed inputs', () => {
        const [a, ...rest] = parse('( a )')
        expect(a).to.equal('a')
        expect(rest).to.be.empty
    })
    /**
     * Numbers should still be strings at parse time
     * 
     * it('simple number', () => {
        const num = parse('(1)')
        console.log(typeof num)
        expect(num).to.equal(1)
    })
    it('names + numbers', () => {
        const [a, un, deux, ...rest] = parse('(a 1 2)')
        expect(a).to.equal('a')
        expect(un).to.equal(1)
        expect(deux).to.equal(2)
        expect(rest).to.be.empty
    })
     * 
     * 
     * 
     */
    it('nest', () => {
        /*const [a, [b, c, ...innerRest], d, ...rest] = parse('(a (b c) d)')
        expect(a).to.equal('a')
        expect(b).to.equal('b')
        expect(c).to.equal('c')
        expect(d).to.equal('d')
        expect(rest).to.be.empty
        expect(innerRest).to.be.empty*/
    })
    it('bad input', () => {

    })
    it('morphologies', () => {
        expect(parse('((x y) y)')[0]).to.be.an('array')
        expect(parse('((x y) y)')[0][0]).to.be.a('string')
        const form = parse('((lambda (x y) (+ x y)) 1 2)')
        expect(form[0]).to.be.an('array')
        expect(form[0][0]).to.be.a('string')
        expect(form[0][1]).to.be.an('array')
        expect(form[0][1][0]).to.be.a('string')
    })
})

//'a' parse
//'' parse

describe('sanitize', () => {
    it('(\'(\', 0) should be sanitized to \'\'', () => {
        //expect(sanitize('(', 0)).to.equal('')
    })
    it('(\'(\', 1) should be sanitized(completed) to \'()\'', () => {
        expect(sanitize('(', 1).string).to.equal('()')
    })
    it('(\')\', 1) should be sanitized to \'\' ', () => {
        expect(sanitize(')', 1).string).to.equal('')
    })
    describe('correct inputs shouldn\'t be sanitized', () => {
        it('() should be left untouched', () => {
            const s = '()'
            expect(sanitize(s).string).to.equal(s)
        })
        it('(def () ) should be left untouched', () => {

        })
    })
}) 
