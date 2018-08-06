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
        console.log('x:'+x)
        if(int.test(x)) return wrapper(parseInt(x), env)
        else return wrapper(env.lookup(head), env)
    }
    else {
        switch(head) {
            case 'if': {
                const [cond, then, other] = tail
                if(eval([cond], env).value != 0) return eval([then], env)
                else return eval([other], env)
            } 
            case 'lambda': {
                const [params, body] = tail
                return wrapper((function(args) {
                    return eval(body, env.extendMulti(params, args)).value
                }), env)
            }
            case 'def': {
                const [[name, ...args], body, ...expr] = tail
                if(args.length > 0) //
                    return eval(['def'].concat([name]).concat([['lambda'].concat([args]).concat([body])].concat([expr])), env)
                else {
                    const newEnv = env.extendRec(name, (env1) => eval([].concat(body), env1).value)
                    //console.log()
                    return (expr.length > 0) ? eval(expr, newEnv) : wrapper('def ' + name, newEnv)
                }
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