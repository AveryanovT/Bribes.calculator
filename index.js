const readline = require('readline-sync');

const playersCount = parseInt( readline.question('Введите количество игроков\n'), 10 );

const players = [];
for( let i = 0; i < playersCount; i++ ){
    const playerName = readline.question('Введите имя игрока\n');
    const player = {
        name: playerName,
        bribes: 0,
        points: 0
    };
    players.push( player );
}

const roundCount = parseInt( readline.question('Введите количество раундов\n'), 10 );

for(let currentRound = 1; currentRound <= roundCount; currentRound++ ){
    console.log(`\n\nРаунд ${currentRound}\n`);
    
    /* Оправшиваем количество заказанных взяток */
    for(let player of players){
        player.bribes = parseInt( readline.question(`Сколько взяток заказал ${ player.name }?\n`), 10 );
    }
    
    /* Опрашиваем количество взятых взяток */
    for(let player of players){
        const bribes = parseInt( readline.question(`Сколько взяток взял ${ player.name }?\n`), 10 );
        if(bribes == player.bribes)
            if(player.bribes == 0)
                player.points += 5;
            else
                player.points += bribes*10;
        else if(bribes < player.bribes)
            player.points -= (player.bribes-bribes)*10;
        else 
            player.points += bribes;
    }

    /* Выводим очки */
    console.log(players.map(player => `${player.name} : ${player.points}`).join('\n'));
}

const sortedPlayers = players.sort( (a, b) => a.points < b.points?1:a.points == b.points?0:-1 );
console.log(`\n\n\nПобедил ${sortedPlayers[0].name}!`)
console.log(sortedPlayers.map(player => `${player.name} : ${player.points}`).join('\n'));