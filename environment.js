const environment = {
    lookup: function(name) {
        throw new Error(name + ' not found');
    },
    extend: function(name, value) {
        const enclosing = this;
        const exposing = Object.create(this);
        exposing.lookup = (symbol) => symbol === name ? value : enclosing.lookup(symbol);
        return exposing;  
    },
    extendMulti: function(params, values) {
        var [p, ...ps] = params;
        var [v, ...vs] = values;
        return (p && v) ? this.extend(p, v).extendMulti(ps, vs) : this;
    }
}

module.exports = environment;