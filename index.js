const bot = new ChatJS()

bot.addReply('My name is Mr. ChatBot.', {
    keylist : ['your', 'name', 'who', 'you'],
    queries : [
        'what is your name',
        'your name',
        'who are you',
        'may i know your name'
    ]
})

bot.addReply('I am 26 years old.', {
    keylist : ['old', 'age', 'your', 'you'],
    queries : [
        'how old are you',
        'your age',
        'how old',
        'what is or age'
    ]
})

bot.addReply('I\m from Sri Lanka.', {
    keylist : ['from', 'country', 'your', 'you'],
    queries : [
        'where are you from',
        'what is our country',
        'our country',
        'you from',
        'from where'
    ]
})

bot.addReply('My favorite food is Pizza.', {
    keylist : ['favorite', 'food', 'what', 'you', 'your', 'eat', 'like'],
    queries : [
        'what is your favorite food',
        'what do you like to eat',
        'like to eat',
        'favorite food',
        'favorite meal'
    ]
})

bot.addConfusion('Sorry, I didn\'t get that.')
bot.addConfusion('Can you explain more? I didn\'t understood.')

bot.addRepetition('As I told you before, {!}')
bot.addRepetition('I think I told you that already.')
bot.addRepetition('{!} Didn\'t I tell you that already?')

const input = document.querySelector('input')
const mtray = document.querySelector('.tray')
const inner = document.querySelector('.inner')
const space = document.querySelector('.space')

const resize = () => {
    const height_t = mtray.getBoundingClientRect().height
    const height_i = inner.getBoundingClientRect().height
    space.style.height = (height_t - height_i - 80) + 'px'
    mtray.scrollTop = mtray.scrollHeight + window.innerHeight
}

input.addEventListener('keydown', event => {
    if(event.key === 'Enter') {
        if(bot.isValid(input.value)) {
            const output = bot.askQuestion(input.value)
            // question
            const q = document.createElement('div')
            q.className = 'message question'
            q.innerHTML = output.question
            inner.appendChild(q)
            resize()
            // answer
            setTimeout(() => {
                const a = document.createElement('div')
                a.className = 'message answer'
                a.innerHTML = output.reply
                inner.appendChild(a)
                resize()
            }, 600)
            input.value = ''
        } else {
            input.value = ''
        }
    }
})

window.addEventListener('resize', resize)