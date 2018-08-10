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
        const [those, others] = that.scope()
        return Environment(new Map([...those, ...bindings]), rex.concat(others))
    }
}}

const environment = Environment(new Map(), new Array())

module.exports = environment;