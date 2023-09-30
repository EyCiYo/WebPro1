let result = [];
score=0;
function init() {
  makeMat(4);
}
init();
function handleClick(event) {
    let card = event.target;
    console.log(card);  
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