let result = [];
let answer = [];
let gamestat = true;
let score = 0;
let stage = 4;
let matsize = 4;

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

function gameEnd()
{
    gamestat = false;
    console.log("U failed");
    disableListener();
}

function init() {
  makeMat(matsize);
}
init();
gameloop();
function gameloop()
{
    setEventListener();
    result = [];
    while(gamestat)
    {
        answer = getRandomList(stage,0,matsize*matsize);
        illuminate(answer);
        gamestat = false;
    }
}
async function illuminate(answer)
{
    disableListener();
    await sleep(500);
    for(let i = 0; i < stage; i++)
    {
        //code to sequentially illuminate the cards in answer array
        document.getElementById(answer[i]).style.backgroundColor = "red";
        await sleep(500);  
        document.getElementById(answer[i]).style.backgroundColor = "#64CCC5";     
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
        gamestat = true;
        result = [];
        answer = [];
        gameloop();
    }
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

function handleClick(event) {
    let card = event.target;
    let cardId = card.id;
    if(cardId in answer === false || result.length > stage)
    {
        gameEnd();
    }
    else
    {
        result.push(cardId);    
        checkResult(result,result.length);
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