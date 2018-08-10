const Environment = function(space, recspace){
    //const bindings = space
    //const functionnal = f
    return {
    lookup: function(name) {
        const g = typeof recspace.find((x) => x === name) == 'undefined' ? space.get(name) : space.get(name)(this)
        if(typeof g == 'undefined') throw new Error(name + ' not found')
        else return g
    },
    dump: function() {
        return Array.from(space.keys())
    },
    extend: function(name, value) {
        const clone = new Map(space)
        clone.set(name, value)
        return Environment(clone, recspace)
    },
    extendMulti: function(params, values) {
        const [p, ...ps] = params, [v, ...vs] = values
        return (p && v) ? this.extend(p, v).extendMulti(ps, vs) : this
    },
    extendRec: function(name, expr) {
        const clone = new Map(space)
        clone.set(name, expr)
        const cpy = new Array(recspace)
        cpy.push(name)
        return Environment(clone, cpy)
    }
}}

const environment = Environment(new Map(), new Array())

module.exports = environment;