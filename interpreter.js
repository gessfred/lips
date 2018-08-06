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
    console.log(head)
    if(tail.length == 0) {
        if(int.test(x)) return wrapper(parseInt(x), env)
        else return wrapper(env.lookup(head), env)
    }
    else {
        switch(head) {
            case 'if': {
                const [cond, then, other] = tail
                console.log(cond)
                console.log(then)
                console.log(other)
                if(eval([cond], env).value != 0) return eval([then], env)
                else return eval([other], env)
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