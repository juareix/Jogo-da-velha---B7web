// dados iniciais
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player = '';//variavel pra marcar qual jogador ta na vez
let warning = '';//msg de vencedor
let playing = false;//variavel de estado pra identificar se o jogo tá rodando
//eventos
document.querySelector('.reset').addEventListener('click', reset);
/*
como preciso adicionar um evento a cada um dos 9 espaços de possibilidades,
vou fazer selectorAll selecionando-os apartir da class em comum,
através do foreach vou percorrer cada um adiconando um evento click e chamando a function responsavel 
por identificar qual deles foi e adicionalos ao visual do jogo:
*/
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

//funções
function itemClick(event){//recebendo os dados do evento acionado
    //console.log(event.target);
    let item = event.target.getAttribute('data-item');
    //let cor = event.target;
    //com o  event.target posso saber detalhes do lugar acioando e saber o data-item
    //com o getAttribute eu vou pegar o atrbuto data-item visuaalizado por meio do target do evento
    //console.log("clicou em", item);
    if(playing && square[item] === ''){ //verifica se ta preenchido e se o jogo ta rolando
        square[item] = player;
        trocaCor(event, player)
        renderSquare();
        togglePlayer();//alterna o jogador
    }
}

function trocaCor(event, player){
    let cor = event.target;
    if (player =='x'){
        cor.classList.remove('red')
        cor.classList.add('blue')
    }
    else if(player =='o'){
        cor.classList.remove('blue')
        cor.classList.add('red')
    }
}

function reset(){
    warning = '';
    let random = Math.floor(Math.random() * 2);//escolhendo aleatoriamente se 'x' ou 'o' começa o jogo 
    player = (random === 0) ? 'x' : 'o';

    for (let i in square){
        square[i] = '';
    }
    playing = true;

    renderSquare();//preenche ou apaga as info dos quadro, nesse caso reseta
    renderInfo();//preenche ou apaga as info do painel de informações, nesse caso reseta
}

//function q preenche ou apaga as info dos quadro.
function renderSquare(){
    for (let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame();
}

//function q preenche ou apaga as info do painel de informações.
function renderInfo(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;

}

//function q alterna as vezes do jogador
function togglePlayer(){
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}
//function q checa qual resultado vitória de x, ou vitória de o, ou empate. 
function checkGame(){
    if(checkWinnerFor('x')){
        warning = 'O "x" venceu';
        playing = false;
        exibeModal('x')
    }
    else if(checkWinnerFor('o')){
        warning = 'O "o" venceu';
        playing = false;
        exibeModal('o')
    }
    else if(isFull()){
        warning = 'Deu empate';
        playing = false;
        exibeModal('Deu empate')
    }
}

//faz a checagem da op de vitória e verifica qual venceu
function checkWinnerFor(player){
    //array com todas as possibilidades de vitória
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos){
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => square[option] === player);//o every retorna true se todos os itens do array corresponde a condição, no caso se todas são igauis ao player da ve
        if(hasWon){
            return true;
        }
    }
    return false;
}

//function q verifica o caso do empate
function isFull(){
    for(let i in square){
        if (square[i] === ''){
            return false;
        }
    }
    return true;
}

let modal = document.querySelector('.modal')
function exibeModal(winner){
    let content = document.querySelector('h2')
    if(winner === 'x'){
        content.innerHTML = "O 'x' Venceu"
        modal.classList.add('openModal')
    }
    else if(winner === 'o'){
        content.innerHTML = "O 'o' Venceu"
        modal.classList.add('openModal')
    }

    else if(winner === 'Deu empate'){
        content.innerHTML = 'Deu empate'
        modal.classList.add('openModal')
    }
}
function closeModal(){
    modal.classList.remove('openModal')
    reset()
}