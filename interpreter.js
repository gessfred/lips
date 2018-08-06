const {parse, int} = require('./parser')
const environment = require('./environment')

const wrapper = function(value, env) {
    return {
        value: value, 
        env: env
    };
}

const eval = function(x, env) {
    const [head, ...tail] = x
    if(tail.length == 0) {
        if(int.test(x)) return wrapper(parseInt(x), env)
        else return wrapper(env.lookup(head), env)
    }
    else {
        switch(head) {
            case 'if': {
                const [cond, then, other] = tail
                if(eval([cond], env).value != 0) return eval([then], env)
                else return eval([other], env)
            } break;
            /*case 'lambda': {
                const [params, body] = tail
                if()
            }*/
            case 'lambda': {
                const [params, body] = tail
                return wrapper((function(args) {
                    //the extended env shouldn't be accessible
                    const aux = env.extendMulti(params, args)
                    return eval(body, aux).value
                }), env)
            }
            default: {
                return wrapper(eval([].concat(head), env).value(tail.map((operand) => eval([operand], env).value)), env)
            }
        }
    }
}

const evaluate = (s, env) => eval(parse(s), env)

module.exports = {
    'eval': eval,
    'evaluate': evaluate,
    'wrapper': wrapper
}