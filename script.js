document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const resetButton = document.getElementById('resetButton');
    let cardElements = [];
    let flippedCards = [];
    let matchedPairs = 0;

    const cards = [
        'img1', 'img1', 'img2', 'img2',
        'img3', 'img3', 'img4', 'img4',
        'img5', 'img5', 'img6', 'img6'
    ];

    function createCard(image) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.image = image;

        const img = document.createElement('img');
        img.src = `images/${image}.png`;
        card.appendChild(img);

        card.addEventListener('click', () => flipCard(card));

        return card;
    }

    function flipCard(card) {
        if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.dataset.image === secondCard.dataset.image) {
            matchedPairs++;
            if (matchedPairs === cards.length / 2) {
                setTimeout(() => alert('Parabéns! Você ganhou!'), 500);
            }
            flippedCards = [];
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    function resetGame() {
        board.innerHTML = '';
        matchedPairs = 0;
        flippedCards = [];
        shuffle(cards).forEach(image => {
            board.appendChild(createCard(image));
        });
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    resetButton.addEventListener('click', resetGame);
    resetGame();
});
