const Environment = function(bindings, rex){
    return {
    lookup: function(name) {
        const g = typeof rex.find((x) => x === name) == 'undefined' ? bindings.get(name) : bindings.get(name)(this)
        if(typeof g == 'undefined') throw new Error(name + ' not found')
        else return g
    },
    dump: function() {
        return Array.from(bindings.keys())
    },
    extend: function(name, value) {
        const clone = new Map(bindings)
        clone.set(name, value)
        return Environment(clone, rex)
    },
    extendMulti: function(params, values) {
        const [p, ...ps] = params, [v, ...vs] = values
        return (p && v) ? this.extend(p, v).extendMulti(ps, vs) : this
    },
    extendRec: function(name, expr) {
        const clone = new Map(bindings), cpy = new Array(rex)
        clone.set(name, expr)
        cpy.push(name)
        return Environment(clone, cpy)
    },
    scope: function() {
        return [new Map(bindings), new Array(rex)]
    },
    union: function(that) {
        const [those, ...others] = that.scope()
        return Environment(new Map([...those, ...bindings]), rex.concat(others))
    }
}}

const environment = Environment(new Map(), new Array())

const arithmeticEnv = environment
    .extend('+', ([x, y]) => x + y)
    .extend('-', ([x, y]) => x - y)
    .extend('*', ([x, y]) => x * y)
    .extend('/', ([x, y]) => x / y)
    .extend('>', ([x, y]) => x > y ? 1 : 0)
    .extend('>=', ([x, y]) => x >= y ? 1 : 0)
    .extend('<', ([x, y]) => x < y ? 1 : 0)
    .extend('<=', ([x, y]) => x <= y ? 1 : 0)
    .extend('=', ([x, y]) => x === y ? 1 : 0)

const List = function(head, tail){

}

const nil = []

const collections = environment
    .extend('nil', nil)
    .extend('cons', function([head, tail]) {
        return (tail) ? [head].concat(tail) : [head]
    })
    .extend('car', function([head, ...tail]) {
        return head[0]
    })
    .extend('cdr', function([head, ...tail]){
        const [h, ...t] = head
        return t
    })

const globalEnv = arithmeticEnv

module.exports = {
    'environment': environment,
    'arithmeticEnv': arithmeticEnv,
    'collections': collections,
    'nil': nil,
    'globalEnv': globalEnv
}