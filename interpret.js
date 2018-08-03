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

//Might need extendRec
var def = function(symbol, body) {
    return {
        eval: function(env) {
            return {
                value: 'def ' + symbol,
                env: env.extend(symbol, body.eval(env).value) 
            }
        }
    }
}
module.exports = {
    'literal': literal,
    'symbol': symbol,
    'define': def
}