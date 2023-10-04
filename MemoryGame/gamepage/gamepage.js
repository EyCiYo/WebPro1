let result = [];
let answer = [];
let gamestat = true;
let score = 0;
let stage = 0;
let matsize = 0;
const replay = document.getElementById('enddiag')
const restart = document.getElementById('restartbtn');
const endscore = document.getElementById('endscore');

restart.addEventListener('click', () => {init();}); 

function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setEventListener()
{
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', handleClick));
}

function disableListener()
{
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => card.removeEventListener('click', handleClick));
}

function getRandomList(len, min, max)
{
    const list = [];
    do 
    {
        // Generating random number
        const randomNumber = Math
            .floor(Math.random() * ((max - min) + min));
     
        if (!list.includes(randomNumber)) 
        {
            list.push(randomNumber);
        }
    }
    while (list.length < len);
    console.log(list);
    return list;
}

function gameEnd()
{
    gamestat = false;
    disableListener();
    replay.style.visibility = "visible";
    endscore.innerHTML = score;
}

function init() {
    score = 0;
    stage = 1;
    matsize = 3;
    result = [];
    answer = [];
    gamestat = true;
    replay.style.visibility = "hidden";
    makeMat(matsize);
    gameloop();
}
init();
function gameloop()
{
    result = [];
    document.getElementById('score').innerHTML = "Score: "+ score;
    setEventListener();
    if(gamestat)
    {
        answer = getRandomList(stage,0,matsize*matsize);
        illuminate(answer);
    }
}
async function lightUp(cardId)
{
    document.getElementById(cardId).style.backgroundColor = "red";
    await sleep(500);  
    document.getElementById(cardId).style.backgroundColor = "#64CCC5"; 
}

async function illuminate(answer)
{
    disableListener();
    await sleep(500);
    for(let i = 0; i < stage; i++)
    {
        //code to sequentially illuminate the cards in answer array
        await lightUp(answer[i]);   
    }
    setEventListener(); 
}
function checkResult(result, length)
{
    if(result[length-1] != answer[length-1])
    {
        gameEnd();
    }
    else if(length == stage)
    {
        score++;
        stage++;
        document.getElementById('score').innerHTML = "Score: "+ score;
        if(stage%5 == 0)
        {
            matsize++;
            makeMat(matsize);
        }
        gamestat = true;
        result = [];
        answer = [];
        gameloop();
    }
}


async function handleClick(event) {
    let card = event.target;
    let cardId = Number(card.id);
    await lightUp(cardId);
    if(answer.includes(cardId))
    {
        result.push(cardId);    
        checkResult(result,result.length);
    }
    else
    {
        gameEnd();
    }

}
function makeMat(val){
    document.querySelector('.matrix').innerHTML='';
    let k = 0;
    for (let i = 0; i < val; i++) 
    {
        let row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < val; j++) 
        {
            let card = document.createElement('div');
            card.className = 'card';
            card.id = k++;
            card.addEventListener('click', handleClick);
            row.appendChild(card);
        }
        document.querySelector('.matrix').appendChild(row);
        
    }
}