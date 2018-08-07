const environment = {
    lookup: function(name) {
        throw new Error(name + ' not found')
    },
    dump: function() {
        return []
    },
    extend: function(name, value) {
        const enclosing = this
        const exposing = Object.create(this)
        exposing.lookup = (symbol) => symbol === name ? value : enclosing.lookup(symbol)
        exposing.dump = () => [name].concat(enclosing.dump())
        return exposing
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
        return that
    }
}

module.exports = environment;