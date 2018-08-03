var environment = {
    lookup: function(name) {
        throw new Error('empty environnement');
        //return (this.hasOwnProperty(name)) ? this.name : null;
    },
    extend: function(name, value) {
        const enclosing = this;
        const exposing = Object.create(this);
        exposing.lookup = (symbol) => symbol === name ? value : enclosing.lookup(symbol);
        return exposing;  
    }
}

module.exports = environment;