let result = [];
let answer = [];
let gamestat = true;
let score = 0;
let stage = 0;
let matsize = 0;

function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setEventListener()
{
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => card.disabled = false);
}

function disableListener()
{
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => card.disabled = true);
}

function getRandomList(length, min, max)
{
    const list = [];
    for (let i = 0; i < length; i++) {
      list.push(Math.floor(Math.random() * ((max - min) + min)));
    }
    console.log(list);
    return list;
}

function gameEnd()
{
    gamestat = false;
    console.log("U failed");
    disableListener();
    document.getElementById('enddiag').showModal();
}

function init() {
    score = 0;
    stage = 1;
    matsize = 3;
    result = [];
    answer = [];
    makeMat(matsize);
    gameloop();
}
init();
document.getElementById('restartbtn').addEventListener('click', () => {
    document.getElementById('enddiag').close();
    init();
});
function gameloop()
{
    result = [];
    console.log(result);
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
    console.log(result,length);
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
        console.log(result);
        console.log(cardId);
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
    for (let i = 0; i < val; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < val; j++) {
            let card = document.createElement('div');
            card.className = 'card';
            card.id = k++;
            card.addEventListener('click', handleClick);
            row.appendChild(card);
        }
        document.querySelector('.matrix').appendChild(row);
        
    }
}