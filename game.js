const bed = document.querySelector('.bed');
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const eLife = document.querySelector('.e-life');
const pLife = document.querySelector('.p-life');
//const timer = document.querySelector('.timer');

const entities = [
    '9/95/Bladestorm',
    'b/b6/Broken_Truce',
    'd/d1/Demotivation_Strike',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const deleteElement = (tpn) => {
    const deletedCards = document.querySelector(tpn);
    while(deletedCards.firstChild) {
        deletedCards.removeChild(deletedCards.firstChild);
    }
    deletedCards.innerHTML = null;
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length == entities.length) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const firstEntity = firstCard.getAttribute('data-entity');
    const secondEntity = secondCard.getAttribute('data-entity');
    if (firstEntity == secondEntity) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';
        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
        }, 500)
    }
}

const drawCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }
    if (firstCard == '') {
        tpna = target.parentNode.getAttribute('number');
        target.parentNode.classList.add('reveal-card');
        target.parentNode.classList.add('number'+tpna);
        setTimeout(() => {
            att = target.parentNode.getAttribute('data-entity');
            //target.parentNode.classList.add('draw-card');
            const card = createHand(att);
            grid.appendChild(card);
        }, 500)
        setTimeout(() => {
            target.parentNode.classList.add('delete-card');
            deleteElement('.number'+tpna);
        }, 500)
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }
    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
}

const theEffect = ({ target }) => {
    if (target.parentNode.className.includes('silenced-card')) {
        return;
    }
    if (firstCard == '') {
        target.parentNode.classList.add('effect-card');
        setTimeout(() => {
            target.parentNode.classList.remove('effect-card');
            doDmg(eLife, 1000);
        }, 500)
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
}

const createHand = (entity) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    
    front.style.backgroundImage = `url('https://static.wikia.nocookie.net/stormboundkingdomwars_gamepedia_en/images/${entity}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', theEffect);
    card.setAttribute('data-entity', entity);
    card.classList.add('reveal-card');

    return card;
}

let countN = 0;
const createCard = (entity) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${entity}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', drawCard);
    card.setAttribute('number', countN);
    card.setAttribute('data-entity', entity);
    card.classList.add('deck-card');

    return card;
}

const loadGame = () => {

    const shuffledArray = entities.sort(() => Math.random()-0.5);
    shuffledArray.forEach((entity) => {
        countN = countN+1;
        const card = createCard(entity);
        bed.appendChild(card);
    });
}

const doDmg = (hurt, dmg) => {
    const currentDmg = +hurt.innerHTML;
    hurt.innerHTML = currentDmg - dmg;
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    //startTimer();
    loadGame();
}
