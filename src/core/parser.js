const int = /^\d+$/
const isDelimiter = (ch) => ch <= ' ' || ch == '(' || ch == ')'

const lispTokenizer = function(s) {
    let i = 0
    
    return {
        hasNext: function(){
            while (i < s.length && s.charAt(i) <= ' ') ++i
            return i < s.length // 0 < 0
        },
        next: function(){
            if (this.hasNext()) {
                let start = i
                if (isDelimiter(s.charAt(i))) ++i
                else {
                  do ++i
                  while (i < s.length && !isDelimiter(s.charAt(i)))
                }
                return s.substring(start, i)
              } else throw new Error("premature end of input")
        }
    }
}

const parse = function(s){
    const iterator = lispTokenizer(s)
    //maybe need to wrap integers and strings
    const parseExpr = function(token) {
        if(token == '(') return [parseList()]
        else if(token == ')') throw new Error('unbalanced')
        else if(int.test(token)) return [parseInt(token)] 
        else return [(token)]
    }
    const parseList = function() {
        const token = iterator.next()
        if(token == ')') return []
        else return parseExpr(token).concat(parseList())
    }
    return parseExpr(iterator.next())[0]
}

const sanitize = function(s, caretPosition) {
    const it = lispTokenizer(s)
    //let stack = 0
    let sane = ''
    const scan = function(base, stack, head) {
        if(it.hasNext()) {
            const token = it.next()
            switch(token) {
                case ')': 
                    if(stack <= 0) return scan(base, stack)
                    else return scan(base + token, stack - 1)
                case '(': 
                    return scan(base + token, stack + 1)
                default:
                    return scan(base + ' ' +  token, stack)
            }
        }
        else {
            let result = base
            for(; stack > 0; --stack){
                result += ')'
            }
            return {
                'string': result
            }
        }
    }
    return scan('', 0)
}

module.exports = {
    'lispTokenizer': lispTokenizer,
    'parse' : parse,
    'int': int,
    'sanitize': sanitize
}