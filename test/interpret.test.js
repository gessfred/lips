var assert = require('assert');
var expect = require('chai').expect;
var {literal, symbol, define, lambda, ifthen, operator} = require('../interpret')
var environment = require('../environment')

describe('interpreter test(deprecated)', () => {
    //Literal
  it('Literal evaluated on empty env returns literal', () => expect(literal(4).eval({}).value).to.equal(4));
  const empty = {}
  it('Literal evaluated on empty env returns env unchanged', () => expect(literal(4).eval(empty).env).to.equal(empty));
  //Symbol
  it('Symbol evaluated on empty env should throw', () => expect(symbol('x').eval).to.throw());
  const env1 = environment.extend('x', 45);
  it('Symbol evaluated on env containing it should return its value', () => expect(symbol('x').eval(env1).value).to.equal(45));
  it('Symbol evaluated on env containing it should return that env', () => expect(symbol('x').eval(env1).env).to.equal(env1));
  //Def
  it('def x 3 should return \'def x\'', () => expect(define('x', literal(3)).eval(environment).value).to.equal('def x'));
  const envDef = define('x', literal(123)).eval(environment).env
  it('define x and then look up x on resulting environment', () => expect(envDef.lookup('x')).to.equal(123));

  //Lambda
  it('(lambda (x y) (3))(4 5) should be 3', () => {
    expect(lambda([symbol('x'), symbol('y')], literal(3)).eval(environment).value([4, 5]).value).to.equal(3)
  });
  //If
  it('trivial if statements', () => {
    expect(ifthen(literal(1), literal(3), symbol('notok')).eval(environment).value).to.equal(3)
    expect(ifthen(literal(0), symbol('notok'), literal(4)).eval(environment).value).to.equal(4)
  })

  //Compositions
  /*it('identity function', () => {
    const identity = lambda([symbol('x')], operator([(x) => x], symbol('x')))
    expect(operator(identity, [literal(4)]).eval(environment).value).to.equal(4);
  })*/
  it('inner function scope should mask outer', () => {})
  /*it('max function', () => {
    const max = lambda(['x', 'y'], ifthen())
  })*/
})