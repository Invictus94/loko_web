let lastIndex = 0
let loaded = false

export class ReviewCard {
    constructor(id, element, currentPosition) {
        this.id = id;
        this.element = element;
        this.currentPosition = currentPosition;
    }

    move() {

        if (document.body.clientWidth < 768) {
            
            if(this.id == 1 || this.id == 3)
            {
                this.element.className = 'd-none'
                return
            }
            
            this.element.className = 'col-md-12'
            fadeOut(this.element)
            setTextMobile(this.element)
            fadeIn(this.element)
        }
        else {

            this.element.className = 'col-md-4'

            if(this.id == 1 || this.id == 3)
                this.element.classList.add('opacity-50')

            var matrix = [
                [0, 100, 200],
                [-100, 0, 100],
                [-200, -100, 0]
            ];
    
            let toPlace = shuffleSetPlace(this.currentPosition)

            let from = matrix[this.id - 1][this.currentPosition - 1]
            let to = matrix[this.id - 1][toPlace - 1]

            let opacityStart = 0;
            let opacityEnd = 0;

            switch (toPlace) {
                case 1:
                    opacityStart = 1;
                    opacityEnd = 0.5;
                    break;
                case 2:
                    opacityStart = 0.5;
                    opacityEnd = 1;
                    break;
                case 3:
                    opacityStart = 0;
                    opacityEnd = 0.5;
                    break;
            }

            // 0 - 1 - 2 su kartice
            // 0 - 1 - 2 su pozicije

            let transformDefinition = [];
            let transformOption = {};

            if (this.currentPosition == 1 && toPlace == 3) {
                transformDefinition = [
                    { transform: `translateX(${from}%)`, opacity: opacityEnd },
                    { transform: `translateX(${from - 20}%)`, opacity: opacityEnd },
                    { transform: `translateX(${from - 40}%)`, opacity: opacityStart },
                    { transform: `translateX(${to + 40}%)`, opacity: opacityStart },
                    { transform: `translateX(${to}%)`, opacity: opacityEnd },
                ];

                transformOption = {
                    duration: 1200,
                    fill: 'forwards',
                }
            }
            else {
                transformDefinition = [
                    { transform: `translateX(${from}%)`, opacity: opacityStart },
                    { transform: `translateX(${to}%)`, opacity: opacityEnd },
                ];

                transformOption = {
                    duration: 1000,
                    fill: 'forwards',
                }
            }

            this.element.animate(transformDefinition, transformOption);

            this.currentPosition = toPlace;

            if (this.currentPosition == 3 || !loaded) {
                var ele = this.element;
                setTimeout(function () {
                    setText(ele)
                }, 800);
            }
        }
    }

    static reviews = {}
}

function shuffleSetPlace(place) {
    let result = place - 1;

    if (result < 1)
        result = 3;

    return result;
}

function setText(element) {

    if (lastIndex == Object.keys(ReviewCard.reviews).length)
        lastIndex = 0

    var review_text = element.getElementsByClassName("card-review-text")[0];
    var review_author = element.getElementsByClassName("card-text")[0];
    var review_image = element.getElementsByClassName("card-img-top")[0];

    review_author.textContent = Object.keys(ReviewCard.reviews)[lastIndex];
    review_text.textContent = ReviewCard.reviews[review_author.textContent]['text']
    review_image.src = ReviewCard.reviews[review_author.textContent]['image']

    lastIndex++

    if (lastIndex == 3)
        loaded = true
}

function setTextMobile(element) {

    if (lastIndex == Object.keys(ReviewCard.reviews).length)
        lastIndex = 0

    var review_text = element.getElementsByClassName("card-review-text")[0];
    var review_author = element.getElementsByClassName("card-text")[0];
    var review_image = element.getElementsByClassName("card-img-top")[0];

    review_author.textContent = Object.keys(ReviewCard.reviews)[lastIndex];
    review_text.textContent = ReviewCard.reviews[review_author.textContent]['text']
    review_image.src = ReviewCard.reviews[review_author.textContent]['image']

    lastIndex++
}

function fadeOut(element){
    element.animate([
        { transform: `translateX(${0}%)`, opacity: 1 },
        { opacity: 0 },
    ], {
        duration: 500,
        fill: 'forwards',
    });
}

function fadeIn(element){
    element.animate([
        { opacity: 0 },
        { opacity: 1 },
    ], {
        duration: 500,
        fill: 'forwards',
    });
}

function selectText() {
    let nvalue = 0

    while (selectedIndexes.length < 3) {

        nvalue = getRandomInt(0, Object.keys(ReviewCard.reviews).length - 1)


        if (!selectedIndexes.includes(nvalue)) {
            selectedIndexes.push(nvalue)
        }
    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

