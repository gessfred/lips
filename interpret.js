var literal = function(value) {
    return {
        eval: function(env) {
            return {
                value: value,
                env: env
            }
        }
    };
}

var symbol = function(name) {
    return {
        eval: function(env) {
            return {
                value: env.lookup(name),
                env: env
            }
        }
    }
}

module.exports = {
    'literal': literal
}