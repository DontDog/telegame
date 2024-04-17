var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const redis = require("redis");
let client = redis.createClient();

const TelegramBot = require('node-telegram-bot-api');
const token = '7020305556:AAGYMEnpXnXX8GnpRk1O4nOvKlMm57SuPU4';
const bot = new TelegramBot(token, {polling: true});

// ссылка на игру в сети интернет
let url = 'https://www.google.ru/'

// название игры (то, что указывали в BotFather)
const gameName = "greed"

// Matches /start
bot.onText(/\/start/, function onPhotoText(msg) {
    bot.sendGame(msg.chat.id, gameName);
});

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    bot.answerCallbackQuery(callbackQuery.id, { url });
});

// Обработка inline-запросов
bot.on('inline_query', (msg) => {
    // Обработка inline-запросов здесь
});

console.log('Бот "Жадюги" запущен');



server.listen(3000);

(async () => {
    await client.connect();
})();

app.get('/', function(request, respons) {
	respons.sendFile(__dirname + '/index.html');
});

client.on("connect", function () {
    console.log("Connection Successful!!");
});

// стол: камни, лидер
// пул игроков 
// мешочки: {чей, }
//
//


io.sockets.on('connection', function(socket) {
	console.log("connection");

    socket.name = '';
    socket.room = '';

    //<script>socket.emit('join', {room: '<%- room.roomname %>' });</script>
    socket.on('join', (msg) => {
        socket.name = msg.name;
        socket.room = msg.room;

        (async () => {
            let data = await client.get(socket.room)
            if(data) data = JSON.parse(data);
            else data = {'table': []}

            data[socket.id]= {
                'gold_count': 0, 
                'pouch': ['ruby',
                        'emerald', 
                        'grey', 'grey', 'grey', 'grey',
                        'black', 'black', 'black', 'black',
                        'white', 'white', 'white', 'white',
                        'gold', 'gold', 'gold', 'gold', 'gold']};
            
            if(data['user']){
                data['user'].push(socket.id)
            }
            else {
                data['activ'] = socket.id
                data['user'] = [socket.id]
            }

            await client.set(socket.room, JSON.stringify(data));
        })();
    });

	socket.on('takes', function() {
        (async () => {
            let data = await client.get(socket.room)
            if(data) data = JSON.parse(data);
            else data = {'table': []}

            if(data[people.id]['punch'].length > 0){
                let stone = data[people.id]['punch'][Math.floor(Math.random()*data[people.id]['punch'].length)];
                data['table'].push(stone)
                data[people.id]['punch'].splice(data[people.id]['punch'].indexOf(stone), 1)
            }

            if(data['table'].filter(item => item !== 'green').lenght > 0) {
                for(let i = 0; i < 2; ++i) {
                    let stone = data[people.id]['punch'][Math.floor(Math.random()*data[people.id]['punch'].length)];
                    data['table'].push(stone)
                    data[people.id]['punch'].splice(data[people.id]['punch'].indexOf(stone), 1)
                }
            }
            
            if(data['table'].filter(item => item !== 'black').lenght > 1) {
                socket.broadcast.emit('one_event')
                socket.on('one_sol', function(d) {
                    let stone = data[socet.id]['punch'][Math.floor(Math.random()*data[people.id]['punch'].length)];
                    if(stone == 'gold'){
                        data[socet.id]['gold_count'] += 1
                    }
                    if(stone == 'gold') data[socet.id]['gold_count'] += 1
                    else data['table'].push(stone)
                    data[socet.id]['punch'].splice(data[people.id]['punch'].indexOf(stone), 1)
                    socket.broadcast.emit('two_event')
                })

                data[socet.id]['punch'].append(data['table'])
                data['table'] = []
                data['activ'] = data['user'][(data['user'].indexOf(data['activ']) + 1) % data['user'].lenght]
            }
            else if(data['table'].filter(item => item !== 'red').lenght > 0) {
                socket.broadcast.emit('one_event')
                socket.on('one_sol', function(d) {
                    if(d){
                        let stone = data[socet.id]['punch'][Math.floor(Math.random()*data[people.id]['punch'].length)];
                        data[people.id]['punch'].push(stone)
                        data[socet.id]['punch'].splice(data[people.id]['punch'].indexOf(stone), 1)
                        socket.broadcast.emit('two_event')
                    }
                })

                data[socet.id]['punch'].append(data['table'])
                data['table'] = []
                data['activ'] = data['user'][(data['user'].indexOf(data['activ']) + 1) % data['user'].lenght]
            }
            else if(data['table'].filter(item => item !== 'gray').lenght > 1) {
                data[socet.id]['punch'].append(data['table'])
                data['table'] = []
                data['activ'] = data['user'][(data['user'].indexOf(data['activ']) + 1) % data['user'].lenght]
            }
            else if(data['table'].filter(item => item !== 'withe').lenght > 1) {
                data[socet.id]['punch'].append(data['table'])
                data['table'] = []
                data['activ'] = data['user'][(data['user'].indexOf(data['activ']) + 1) % data['user'].lenght]
            }  

            await client.set(socket.room, JSON.stringify(data));
        })();
    });

    socket.on('skips', function() {
        (async () => {
            let data = await client.get(socket.room)
            if(data) data = JSON.parse(data);
            else data = {'table': []}

            let n = data['table'].length
            data['table'] = data['table'].filter(item => item !== 'gold')
            data[socket.id][gold_count] += n - data['table'].length
            socket.in(socket.id).emit('start_people')
            socket.on('people', function(people) {
                data[people.id]['punch'].append(data['table'])
                data['table'] = []
            });

            data['activ'] = data['user'][(data['user'].indexOf(data['activ']) + 1) % data['user'].lenght]

            await client.set(socket.room, JSON.stringify(data));
        })();
	});

    socket.on('disconnect', function(data) {
		console.log("disconnect");
        (async () => {
            let data = await client.get(socket.room)
            if(data) data = JSON.parse(data);
            else data = {'table': []}
            delete data[socket.id]
            data['user'] = data['user'].filter(item => item !== socket.id)
            await client.set(socket.room, JSON.stringify(data));
            console.log(await client.get(socket.room))
        })();
	});
});
