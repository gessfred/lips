const Environment = function(space){
    const bindings = space
    return {
    lookup: function(name) {
        const g = bindings.get(name)
        if(typeof g == 'undefined') throw new Error(name + ' not found')
        else return g
    },
    dump: function() {
        return bindings.keys()//[]
    },
    extend: function(name, value) {
        const enclosing = this
        const exposing = Object.create(this)
        const clone = new Map(bindings)
        clone.set(name, value)
        //exposing.lookup = (symbol) => symbol === name ? value : enclosing.lookup(symbol)
        //exposing.dump = () => [name].concat(enclosing.dump())
        return Environment(clone)
    },
    extendMulti: function(params, values) {
        var [p, ...ps] = params
        var [v, ...vs] = values
        return (p && v) ? this.extend(p, v).extendMulti(ps, vs) : this
    },
    extendRec: function(name, expr) {
        const enclosing  = this
        const that = Object.create(this)
        that.lookup = (symbol) => symbol === name ? expr(that) : enclosing.lookup(symbol)
        that.dump = () => [name].concat(enclosing.dump())
        /*const that = Environment(new Map(bindings))

        that.lookup = function(symbol) {
            const cpy = new Map(bindings)
            cpy.set(name, expr(that))
            console.log(name + ': ' + expr(that))
            console.log(Environment(cpy).dump())
            return Environment(cpy).lookup(symbol)
            
            if(symbol === name) {
                return expr(that)
            }
            else {
                return this.lookup(symbol)
            }
        }*/
        return that
    }
}}

const environment = Environment(new Map())

module.exports = environment;