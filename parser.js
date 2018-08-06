const lispTokenizer = function(s) {
    let i = 0
    const isDelimiter = (ch) => ch <= ' ' || ch == '(' || ch == ')'
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
    const int = /^\d+$/
    //maybe need to wrap integers and strings
    const parseExpr = function(token) {
        if(token == '(') return parseList()
        else if(token == ')') throw new Error('unbalanced')
        else if(int.test(token)) return [parseInt(token)] 
        else return [token]
    }
    /*(token) => {
        if(token == '(') parseList()
        else if(token == ')') throw new Error('unbalanced')
        else if(int.test(token)) [parseInt(token)] 
        else [token] 
    }*/
    const parseList = function() {
        const token = iterator.next()
        if(token == ')') return []
        else return parseExpr(token) + parseList()
    }
    return parseExpr(iterator.next())
}

module.exports = {
    'lispTokenizer': lispTokenizer,
    'parse' : parse
}