var assert = require('assert');
var expect = require('chai').expect;
var {literal} = require('../interpret')


it('Literal evaluated on empty env returns literal', () => expect(literal(4).eval({}).value).to.equal(4));
const empty = {nil: 'Nil'}
it('Literal evaluated on empty env returns env unchanged', () => expect(literal(4).eval(empty).env).to.equal(empty));
