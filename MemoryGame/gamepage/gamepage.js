let cs013result = [];
let cs013answer = [];
let cs013gamestat = true;
let cs013score = 0;
let cs013stage = 0;
let cs013matsize = 0;
const cs013restart = document.getElementById('restartbtn');
const cs013endmsg = document.querySelector('.cs013endtext');

function cs013sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function cs013setEventListener()
{
    let cards = document.querySelectorAll('.cs013card');
    cards.forEach(card => card.addEventListener('click', cs013handleClick));
}

function cs013disableListener()
{
    let cards = document.querySelectorAll('.cs013card');
    cards.forEach(card => card.removeEventListener('click', cs013handleClick));
}

function cs013getRandomList(cs013len, cs013min, cs013max)
{
    const cs013list = [];
    do 
    {
        // Generating random number
        const cs013randomNumber = Math
            .floor(Math.random() * ((cs013max - cs013min) + cs013min));
     
        if (!cs013list.includes(cs013randomNumber)) 
        {
            cs013list.push(cs013randomNumber);
        }
    }
    while (cs013list.length < cs013len);
    return cs013list;
}

function cs013gameEnd()
{
    cs013gamestat = false;
    cs013restart.addEventListener('click',cs013init); 
    cs013disableListener();
    cs013endmsg.innerHTML = "Game Over. Score: "+ cs013score;
    cs013endmsg.style.visibility = "visible";
    cs013restart.innerHTML = "Play Again";
    cs013restart.style.visibility = "visible";
}

function cs013init() {
    cs013score = 0;
    cs013stage = 1;
    cs013matsize = 3;
    cs013result = [];
    cs013answer = [];
    cs013gamestat = true;
    cs013restart.style.visibility = "visible";
    cs013endmsg.style.visibility = "visible";
    cs013endmsg.style.fontSize = "30px" ;
    cs013endmsg.innerHTML = "Click on the cards in the order they were highlighted";
    cs013restart.innerHTML = "Start";
    cs013makeMat(cs013matsize);
    cs013restart.addEventListener('click', cs013gameloop);
}
cs013init();
function cs013gameloop()
{
    cs013result = [];
    cs013restart.style.visibility = "hidden";
    cs013endmsg.style.visibility = "hidden";
    cs013restart.removeEventListener('click',cs013gameloop);
    document.getElementById('score').innerHTML = "Score: "+ cs013score;
    cs013setEventListener();
    if(cs013gamestat)
    {
        cs013answer = cs013getRandomList(cs013stage,0,cs013matsize*cs013matsize);
        cs013illuminate(cs013answer);
    }
}
async function cs013lightUp(cs013cardId)
{
    document.getElementById(cs013cardId).style.backgroundColor = "red";
    await cs013sleep(500);  
    document.getElementById(cs013cardId).style.backgroundColor = "#64CCC5"; 
}

async function cs013illuminate(answer)
{
    cs013disableListener();
    await cs013sleep(500);
    for(let i = 0; i < cs013stage; i++)
    {
        //code to sequentially cs013illuminate the cards in answer array
        await cs013lightUp(answer[i]);   
    }
    cs013setEventListener(); 
}
function cs013checkResult(cs013result, length)
{
    if(cs013result[length-1] != cs013answer[length-1])
    {
        cs013gameEnd();
    }
    else if(length == cs013stage)
    {
        cs013score++;
        cs013stage++;
        document.getElementById('score').innerHTML = "Score: "+ cs013score;
        if(cs013stage%5 == 0)
        {
            cs013matsize++;
            cs013makeMat(cs013matsize);
        }
        cs013gamestat = true;
        cs013result = [];
        cs013answer = [];
        cs013gameloop();
    }
}


async function cs013handleClick(event) {
    let card = event.target;
    let cardId = Number(card.id);
    await cs013lightUp(cardId);
    if(cs013answer.includes(cardId))
    {
        cs013result.push(cardId);    
        cs013checkResult(cs013result,cs013result.length);
    }
    else
    {
        cs013gameEnd();
    }

}
function cs013makeMat(val){
    document.querySelector('.cs013matrix').innerHTML='';
    let k = 0;
    for (let i = 0; i < val; i++) 
    {
        let row = document.createElement('div');
        row.className = 'cs013row';
        for (let j = 0; j < val; j++) 
        {
            let card = document.createElement('div');
            card.className = 'cs013card';
            card.id = k++;
            card.addEventListener('click', cs013handleClick);
            row.appendChild(card);
        }
        document.querySelector('.cs013matrix').appendChild(row);
        
    }
}