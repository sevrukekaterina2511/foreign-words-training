class Words {
    constructor(englishWords, russianWords, example) {
        this.englishWords = englishWords;
        this.russianWords = russianWords;
        this.example = example;
    }
}

const words1 = new Words('quokka', 'квокка', 'This touching animal is a real marsupial smiley!');
const words2 = new Words('fennec fox', 'фенек', 'The fennec fox is a tiny animal with huge ears and a sharp, cute muzzle.');
const words3 = new Words('alpaca', 'альпака', 'Fluffy bangs give a special charm to alpaca.');
const words4 = new Words('koala', 'коала', 'The koala is not a bear, although it is often called a marsupial bear.');
const words5 = new Words('suricat', 'cурикат', 'Meerkats - may seem like real alarmists.');
const words6 = new Words('camel', 'верблюд', 'The spine of camels is straight, despite the presence of humps.');
const words7 = new Words('tiger', 'тигр', 'All white tigers are blue-eyed.');
const words8 = new Words('kangaroo', 'кенгуру', 'In one jump, a kangaroo overcomes about 2 meters.');
const words9 = new Words('fox', 'лиса', 'Foxes are usually monogamous.');
const words10 = new Words('raccoon', 'енот', 'The footprint of a raccoon is very similar to the footprint that a human hand leaves.');
const words11 = new Words('lynx', 'рысь', 'The spotted skin of the lynx helps it to hide among the trees, as it resembles sun glare on the ground.');
const words12 = new Words('zebra', 'зебра', 'The only continent where zebras live in the wild is Africa.');
const words13 = new Words('hedgehog', 'ёжик', 'The needles of hedgehogs reach a length of two centimeters.');
const words14 = new Words('bear', 'медведь', 'Bears really like to destroy bee hives to feast on honey.');
const words15 = new Words('wolf', 'волк', 'The leader of the wolf pack always goes first, tail held high, thus demonstrating his position.');
const words16 = new Words('elk', 'лось', 'Moose have larger antlers than any other modern animal.');
const words17 = new Words('rabbit', 'заяц', 'Hares communicate with each other by beating drum rolls with their front paws.');
const words18 = new Words('cow', 'корова', 'In a minute, the cow makes almost a hundred chewing movements.');
const words19 = new Words('beaver', 'бобр', 'Beavers are monogamous and live in isolated families, and cubs live with their parents until they are two years old.');
const words20 = new Words('lion', 'лев', 'Lions are one of the laziest animals.');

const arr = [words1, words2, words3, words4, words5, words6, words7, words8, words9, words10, words11, words12, words13, words14, words15, words16, words17, words18, words19, words20];

function randomInteger(max) {
    let rand = Math.random() * (max + 1);
    return Math.floor(rand);
}

const currentWord = document.getElementById('current-word');
const totalWord = document.getElementById('total-word');
const wordsProgress = document.getElementById('words-progress');
const shuffleWords = document.getElementById('shuffle-words');
const examProgress = document.getElementById('exam-progress');
const slider = document.querySelector('.slider');
const flipCard = document.querySelector('.flip-card');
const cardFront = document.getElementById('card-front');
const cardFrontH1 = cardFront.querySelector('h1');
const cardBack = document.getElementById('card-back');
const cardBackH1 = cardBack.querySelector('h1');
const example = cardBack.querySelector('span');
const buttonBack = document.getElementById('back');
const buttonTesting = document.getElementById('exam');
const buttonNext = document.getElementById('next');
const studyCards = document.querySelector('.study-cards');
const examCards = document.getElementById('exam-cards');

slider.addEventListener("click", () => {
    flipCard.classList.toggle('active');
});

let currentIndex = 0;

function createCard(showText) {
    cardFrontH1.textContent = showText.englishWords;
    cardBackH1.textContent = showText.russianWords;
    example.textContent = showText.example;
    currentWord.textContent = currentIndex + 1;
    wordsProgress.value = (currentIndex + 1) / arr.length * 100;
}
createCard(arr[currentIndex]);

buttonNext.addEventListener('click', () => {
    currentIndex++;
    createCard(arr[currentIndex]);
    buttonBack.removeAttribute('disabled');
    if (currentIndex == arr.length - 1) {
        buttonNext.disabled = true;
    }
})

buttonBack.addEventListener('click', () => {
    currentIndex--;
    createCard(arr[currentIndex]);
    buttonNext.removeAttribute('disabled');
    if (currentIndex == 0) {
        buttonBack.disabled = true;
    }
})

shuffleWords.addEventListener('click', () => {
    arr.sort(() => Math.random() - 0.5);
    createCard(arr[currentIndex]);
})

totalWord.textContent = arr.length;

let selectedCard;

function creatingTestCard(object) {
    const divElement = document.createElement('div');
    divElement.classList.add('card');
    const pElement = document.createElement('p');
    pElement.textContent = object;
    divElement.append(pElement);
    divElement.addEventListener('click', () => checkTranslationsHandler(divElement))
    return divElement;
}

function cardInsert() {
    const fragment = new DocumentFragment();
    const newArray = [];
    arr.forEach((array) => {
        newArray.push(creatingTestCard(array.russianWords));
        newArray.push(creatingTestCard(array.englishWords));
    });
    fragment.append(...newArray.sort(() => Math.random() - 0.5));
    examCards.innerHTML = "";
    examCards.append(fragment);
}

buttonTesting.addEventListener('click', () => {
    studyCards.classList.add('hidden');
    cardInsert()
})

function checkTranslationsHandler(currentCard) {
    if (!selectedCard) {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.remove('correct');
            card.classList.remove('wrong');
        })
        currentCard.style.pointerEvents = "none";
        currentCard.classList.add('correct');
        selectedCard = currentCard;
    } else {
        const wordObject = arr.find(word => word.russianWords === selectedCard.textContent || word.englishWords === selectedCard.textContent);
        if (wordObject.russianWords === currentCard.textContent || wordObject.englishWords === currentCard.textContent) {
            currentCard.style.pointerEvents = "none";
            currentCard.classList.add('correct');
            currentCard.classList.add('fade-out');
            selectedCard.classList.add('fade-out');
        } else {
            currentCard.classList.add('wrong');
            currentCard.style.pointerEvents = "all";
            selectedCard.style.pointerEvents = "all";
        }
        selectedCard = null;
    }
}