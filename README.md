## ChatJS: Simple Chatbot for Front-end Applications

ChatJS is a simple JavaScript module that you can generate front-end chat bot feature easy. Using specific search patterns, ChatJS is able to identify user input questions and reply with answers, confusion.

### Create a ChatBot

First of all create a chatbot using ```ChatJS``` class.

```JavaScript
const bot = new ChatJS()
```

### Add Replies

You can add each reply to chatbot. These replies will be analized and return the best that related to the question. ```addReply()``` method should contain two inputs such as reply text and filtering data object. Filtering data object should have a ```keylist``` and  ```queries```. ChatJS always gives more priority to the queries and less priority to keylist. According to those matches, points will be calculated. All of these queries and keylist items should only contain lowercase basic letters. Do not include any symbols or numbers.

```JavaScript
bot.addReply('My name is Mr. ChatBot.', {
    keylist : ['your', 'name', 'who', 'you'],
    queries : [
        'what is your name',
        'your name',
        'who are you',
        'may i know your name'
    ]
})
```

### Add Confusions

If chatbot is not able to find a suitable reply, It will select a random confusion that you provide earlier.

```JavaScript
bot.addConfusion('Sorry, I didn\'t get that.')
bot.addConfusion('Can you explain more? I didn\'t understood.')
```

### Add Repetitions

When user ask the same question more than once, chatbot will reply to the question, including a repetition reminder. Use ```{!}``` sign where you expect the common reply.

```JavaScript
bot.addRepetition('As I told you before, {!}')
bot.addRepetition('I think I told you that already.')
bot.addRepetition('{!} Didn\'t I tell you that already?')
```

### Ask Questions

You can use the ```askQuestion()``` method to get the possible reply.

```JavaScript
const output = bot.askQuestion('What is your name?')
```

You will receive output including your own question, possible reply and reply type.

```JSON
{
    "question": "What is your name?",
    "reply": "As I told you before, My name is Mr. ChatBot.",
    "type": "repetition"
}
```

### Check Validation

You can check the question before asking, whether question is valid using ```isValid()``` method.

```JavaScript
if(bot.isValid(text)) {
    const output = bot.askQuestion(text)
} else {
    // not valid
}
```