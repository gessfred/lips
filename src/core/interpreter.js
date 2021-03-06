const {parse, int} = require('./parser')
const environment = require('./environment')

const wrapper = function(value, env) {
    return {
        value: value, 
        env: env
    };
}

const flat = (x) => [].concat(x)

const evalLisp = function(x, env) {
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
                if(evalLisp(flat(cond), env).value != 0) return evalLisp(flat(then), env)
                else return evalLisp(flat(other), env)
            } 
            case 'lambda': {
                const [params, body] = tail
                return wrapper((function(args) {
                    return evalLisp(body, env.extendMulti(flat(params), flat(args))).value
                }), env)
            }
            case 'def': {
                const [[name, ...args], body, ...expr] = tail
                console.log([name, ...args])
                console.log('NAME ' + name)
                if(args.length > 0) 
                    if(expr.length == 0)return evalLisp(['def', [name], ['lambda', args, body]], env)
                    else return evalLisp(['def', [name], ['lambda', args, body]], env)
                else {
                    const newEnv = env.extendRec(name, function(env1) {
                        return evalLisp(flat(body), env1).value
                    })
                    return /*(expr.length > 0) ? evalLisp(expr, newEnv) :*/ wrapper('def ' + name, newEnv)
                }
            }
            case 'case': {
                const [exprStruct, ...statements] = tail
                const [[expri, vali], others] = statements
                if(expri == 'else') return wrapper(evalLisp(flat(vali), env).value, env)
                else {
                    const expansion = ['if', ['=', exprStruct, expri], vali, 'case', exprStruct, others]
                    return wrapper(evalLisp(expansion, env).value, env)
                }
            }
            default: {
                return wrapper(evalLisp(flat(head), env).value(tail.map((operand) => evalLisp(flat(operand), env).value)), env)
            }
        }
    }
}

const evaluate = (s, env) => evalLisp(parse(s), env)

const evalAllParsed = function(ss, startEnv) {
    const [head, ...tail] = ss
    try {
        const res = evalLisp(head, startEnv)
        console.log(typeof v === "function")
        //{}.toString.call(functionToCheck) === '[object Function]'
        return [res.value].concat(evalAllParsed(tail, res.env))
    }
    catch(error) {
        return [] // we abort the sequence
    }
} 

const evalAll = function(s, env) {
    try {
        const x = parse('(' + s + ')')
        return evalAllParsed(x, env)
    }
    catch(allErrors) {
        return ['error']
    }
} 

module.exports = {
    'evalLisp': evalLisp,
    'evaluate': evaluate,
    'wrapper': wrapper,
    'evalAll': evalAll
}