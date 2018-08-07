const {parse, int} = require('./parser')
const environment = require('./environment')

const wrapper = function(value, env) {
    return {
        value: value, 
        env: env
    };
}

const flat = (x) => [].concat(x)

const eval = function(x, env) {
    const [head, ...tail] = x
    if(tail.length == 0) {
        if(int.test(x)) return wrapper(parseInt(x), env)
        else return wrapper(env.lookup(head), env)
    }
    else {
        switch(head) {
            case 'if': {
                const [cond, ...rest] = tail
                const [then, ...other] = rest
                if(eval(flat(cond), env).value != 0) return eval(flat(then), env)
                else return eval(flat(other), env)
            } 
            case 'lambda': {
                const [params, body] = tail
                return wrapper((function(args) {
                    return eval(body, env.extendMulti(params, args)).value
                }), env)
            }
            case 'def': {
                const [[name, ...args], body, ...expr] = tail
                if(args.length > 0) 
                    if(expr.length == 0)return eval(['def', [name], ['lambda', args, body]], env)
                    else return eval(['def', [name], ['lambda', args, body]], env)
                else {
                    const newEnv = env.extendRec(name, (env1) => eval(flat(body), env1).value)
                    return (expr.length > 0) ? eval(expr, newEnv) : wrapper('def ' + name, newEnv)
                }
            }
            case 'case': {

            }
            default: {
                return wrapper(eval(flat(head), env).value(tail.map((operand) => eval(flat(operand), env).value)), env)
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