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
    console.log('closure:'+x+'   ::   '+env.dump())
    const [head, ...tail] = x
    if(tail.length == 0) {
        console.log('data')
        if(int.test(x)) return wrapper(parseInt(x), env)
        else return wrapper(env.lookup(head), env)
    }
    else {
        switch(head) {
            case 'if': {
                console.log('if')
                const [cond, ...rest] = tail
                const [then, ...other] = rest
                console.log('if:' + cond + ' then:'+then + ' else:' + other)
                console.log(env.dump())
                console.log('cond = ' + eval(flat(cond), env).value)
                if(eval(flat(cond), env).value != 0) return eval(flat(then), env)
                else return eval(flat(other), env)
            } 
            case 'lambda': {
                console.log('lambda')
                const [params, body] = tail
                return wrapper((function(args) {
                    console.log('wrapping... ' + args + ' on ' + params + ' for ' + body)
                    return eval(body, env.extendMulti(flat(params), flat(args))).value
                }), env)
            }
            case 'def': {
                console.log('def')
                const [[name, ...args], body, ...expr] = tail
                if(args.length > 0) 
                    if(expr.length == 0)return eval(['def', [name], ['lambda', args, body]], env)
                    else return eval(['def', [name], ['lambda', args, body]], env)
                else {
                    const newEnv = env.extendRec(name, function(env1) {
                        console.log(name + 'might be problem ' + body)
                        return eval(flat(body), env1).value
                    })
                    return /*(expr.length > 0) ? eval(expr, newEnv) :*/ wrapper('def ' + name, newEnv)
                }
            }
            case 'case': {

            }
            default: {
                console.log('op')
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