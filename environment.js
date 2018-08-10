const Environment = function(space, f){
    const bindings = space
    const functionnal = f
    return {
    lookup: function(name) {
        const g = typeof functionnal.find((x) => x === name) == 'undefined' ? bindings.get(name) : bindings.get(name)(this)
        if(typeof g == 'undefined') throw new Error(name + ' not found')
        else return g
    },
    dump: function() {
        return Array.from(bindings.keys())//[]
    },
    extend: function(name, value) {
        const enclosing = this
        const exposing = Object.create(this)
        const clone = new Map(bindings)
        clone.set(name, value)
        return Environment(clone, f)
    },
    extendMulti: function(params, values) {
        var [p, ...ps] = params
        var [v, ...vs] = values
        return (p && v) ? this.extend(p, v).extendMulti(ps, vs) : this
    },
    extendRec: function(name, expr) {
        const clone = new Map(bindings)
        clone.set(name, expr)
        const cpy = new Array(f)
        cpy.push(name)
        return Environment(clone, cpy)
    }
}}

const environment = Environment(new Map(), new Array())

module.exports = environment;