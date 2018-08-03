var companion = function(value, env) {
    return {
        value: value, 
        env: env
    };
}

var literal = function(value) {
    return {
        eval: (env) => companion(value, env)
    };
}

var symbol = function(name) {
    return {
        eval: (env) => companion(env.lookup(name), env)
    }
}

//Might need extendRec
var def = function(symbol, body) {
    return {
        eval: function(env) {
            return companion('def ' + symbol, env.extend(symbol, body.eval(env).value)); 
        }
    }
}


module.exports = {
    'literal': literal,
    'symbol': symbol,
    'define': def
}