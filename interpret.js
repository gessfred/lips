const {wrapper} = require('./interpreter')

var literal = function(value) {
    return {
        eval: (env) => wrapper(value, env)
    };
}

var symbol = function(name) {
    return {
        eval: (env) => wrapper(env.lookup(name), env),
        name: name
    }
}

//Might need extendRec
//value is not human readable
var def = function(symbol, body) {
    return {
        eval: function(env) {
            return wrapper('def ' + symbol, env.extend(symbol, body.eval(env).value)); 
        }
    }
}

var ifthen = function(cond, then, ow) {
    return {
        eval: function(env) {
            return cond.eval(env).value != 0 ? then.eval(env) : ow.eval(env);
        }
    }
}

var lambda = function(params, body) {
    //var wrapperEnv = params.
    return {
        eval: function(env) {
            //either here lambda or up there something else
            return wrapper((args) => body.eval(env.extendMulti(params.map(p => p.name), args)), env)
        }
    }
}
//lambda definition vs defined


//f is necesserily a lambda
var operator = function(f, operands) {
    return {
        eval: function(env) {
            const op = f.eval(env).value;
            return wrapper(op([3]), env);
        }
    }
}

module.exports = {
    'literal': literal,
    'symbol': symbol,
    'define': def,
    'lambda': lambda,
    'ifthen': ifthen,
    'operator': operator
}