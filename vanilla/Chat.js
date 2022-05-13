class ChatJS {

    constructor() {
        this.replies = []
        this.confusions = []
        this.repetitions = []
    }

    addReply(reply, filters) {
        if(ChatJS._Helpers_.validateReply(reply, filters)) {
            this.replies.push({ reply : reply, filters : filters, count : 0 })
        } else {
            console.error('Reply is not valid')
        }
    }
    
    addConfusion(reply) {
        if(typeof reply === 'string') {
            this.confusions.push(reply)
        } else {
            console.error('Confusion is not valid')
        }
    }

    addRepetition(reply) {
        if(typeof reply === 'string') {
            this.repetitions.push(reply)
        } else {
            console.error('Repetition is not valid')
        }
    }

    askQuestion(question) {
        const helpers = ChatJS._Helpers_
        // output object
        const output = { question : question, reply : null, type : null }
        // points array
        const points = []
        // simplify text and array
        const input = helpers.simplifyText(question)
        const array = input.split(' ')
        // query match
        this.replies.forEach(reply => {
            if(reply.filters.queries.find(query => input.indexOf(query) > -1)) {
                points.push(10)
            } else {
                points.push(0)
            }
        })
        // keylist math
        this.replies.forEach((reply, index) => {
            reply.filters.keylist.forEach(key => {
                if(array.indexOf(key) > -1) {
                    points[index] += 2
                }
            })
        })
        // get max index
        const mxindex = helpers.findMaxIndex(points)
        if(mxindex === -1) {
            // reply with confusion
            output.reply = helpers.getRandomItem(this.confusions)
            output.type = 'confusion'
        } else {
            // get reply data
            const repdata = this.replies[mxindex]
            if(repdata.count > 0 && this.repetitions.length > 0) {
                const repeat = helpers.getRandomItem(this.repetitions)
                output.reply = helpers.replaceAll(repeat, '{!}', repdata.reply)
                output.type = 'repetition'
            } else {
                // store reply in output
                output.reply = repdata.reply
                output.type = 'answer'
            }
            // increase repetition
            repdata.count += 1
        }
        // return output
        return output
    }

    isValid(question) {
        const text = ChatJS._Helpers_.simplifyText(question)
        return text !== '' && text !== ' '
    }

}

ChatJS._Helpers_ = {}

ChatJS._Helpers_.simplifyText = text => {
    // lowercase
    text = text.toLowerCase()
    // remove symbols
    const arr = Array.from(`\`1234567890-=[];'\\,./~!@#$%^&*()_+{}:"|<>?`)
    arr.forEach(symb => {
        while(text.indexOf(symb) > -1) {
            text = text.replace(symb, '')
        }
    })
    // remove multi spaces
    while(text.indexOf('  ') > -1) {
        text = text.rplace('  ', ' ')
    }
    // return text
    return text
}

ChatJS._Helpers_.findMaxIndex = array => {
    console.log(array)
    // initial values
    let index = -1
    let maxed = null
    // each item check
    array.forEach((item, current) => {
        if(current === 0 && item !== 0) {
            index = 0
            maxed = item
        } else if(item > maxed) {
            index = current
            maxed = item
        }
    })
    // return index
    return index
}

ChatJS._Helpers_.getRandomItem = array => {
    return array[Math.floor(Math.random() * array.length)]
}

ChatJS._Helpers_.replaceAll = (text, from, to) => {
    while(text.indexOf(from) > -1) {
        text = text.replace(from, to)
    }
    return text
}

ChatJS._Helpers_.validateReply = (reply, filters) => {
    if(typeof reply !== 'string') {
        return false
    } else if(filters === null) {
        return false
    } else if(typeof filters !== 'object') {
        return false
    } else if(Array.isArray(filters.keylist) === false) {
        return false
    } else if(Array.isArray(filters.queries) === false) {
        return false
    } else {
        return true
    }
}