//Start local server
//  http-server -c-1

import { tryWrite, translatePage } from './firebase/init.js';
import { Location } from './classes/location.js';
import { ReviewCard } from './classes/reviewCard.js';


const firstReviewCard = new ReviewCard(1, document.getElementById("firstReviewCard"), 1);
const secondReviewCard = new ReviewCard(2, document.getElementById("secondReviewCard"), 2);
const thirdReviewCard = new ReviewCard(3, document.getElementById("thirdReviewCard"), 3);
let screenWidth = 0;
let hasReviews = false;

//prijevod

document.documentElement.lang = navigator.language || navigator.userLanguage;

var shortBrowserLang = document.documentElement.lang.substr(0, 2);

if (shortBrowserLang != "en" && shortBrowserLang != "de" && shortBrowserLang != "hr") {
    document.documentElement.lang = "en";
    shortBrowserLang = "en"
}

screenWidth = document.body.clientWidth;

translatePage('hr').then(async (reviews) => {
    ReviewCard.reviews = reviews;

    await new Promise(r => setTimeout(r, 500));

    if(Object.keys(ReviewCard.reviews).length == 0)
        await new Promise(r => setTimeout(r, 500));

    setTimeout(() => {
        hasReviews = Object.keys(ReviewCard.reviews).length > 0;
        shuffle();
        setTimeout(() => {
            document.getElementById("page-top").classList.remove("d-none");
        }, 500);
    }, 500);

});

if (window.addEventListener) {  // all browsers except IE before version 9
    window.addEventListener("resize", () => {
        if (document.body.clientWidth < 768 && screenWidth > 768) {
            screenWidth = document.body.clientWidth;
            firstReviewCard.move()
            secondReviewCard.move()
            thirdReviewCard.move()
        }
        else if (document.body.clientWidth > 768 && screenWidth < 768) {
            screenWidth = document.body.clientWidth;
            firstReviewCard.move()
            secondReviewCard.move()
            thirdReviewCard.move()
        }
    }, true);
} else {
    if (window.attachEvent) {   // IE before version 9
        window.attachEvent("onresize", () => {
            if (document.body.clientWidth < 768 && screenWidth > 768) {
                screenWidth = document.body.clientWidth;
                firstReviewCard.move()
                secondReviewCard.move()
                thirdReviewCard.move()
            }
            else if (document.body.clientWidth > 768 && screenWidth < 768) {
                screenWidth = document.body.clientWidth;
                firstReviewCard.move()
                secondReviewCard.move()
                thirdReviewCard.move()
            }
        });
    }
}


window.addEventListener('DOMContentLoaded', event => {

    const mainDiv = document.getElementById("page-top");

    //set btns clicks
    const feedback_btn_open = document.getElementById("open-feedback-btn");
    feedback_btn_open.addEventListener('click', () => feedbackModal());

    const feedback_btn_close = document.getElementById("close-feedback-btn");
    feedback_btn_close.addEventListener('click', () => feedbackModal());

    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener('click', () => submitForm());

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = mainDiv.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(mainDiv, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = mainDiv.querySelector('.navbar-toggler');

    navbarToggler.addEventListener('click', () => {
        if (navbarToggler.classList.contains('collapsed')) {
            navbarToggler.style.backgroundColor = 'transparent';
            navbarToggler.style.color = 'var(--font-white)';
        }
        else {
            navbarToggler.style.backgroundColor = 'var(--font-white)';
            navbarToggler.style.color = 'var(--main-pink)';
        }
    });

    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    //lokacija

    $.getJSON(`https://geolocation-db.com/json/`, function (data) {

        tryWrite(new Location(data["country_name"], data["state"], data["city"]));

        var desc = document.getElementById("masthead-desc");
        desc.innerHTML = `Grad u blizini: ${data["city"]} - Regija: ${data["state"]}<br/>Drzava: ${data["country_name"]}`;
    });

    //potrebno dopustenje korisnika
    // if (navigator.geolocation) {

    //         navigator.geolocation.getCurrentPosition(position => {
    //             // console.log("latitude: ", `${position.coords.latitude}`)
    //             // console.log("longitude: ", `${position.coords.longitude}`)

    //             $.getJSON(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude.toFixed(5)}&lon=${position.coords.longitude.toFixed(5)}`, function(data) {

    //                 console.log("Grad: ", `${data["address"]["city"]}`)
    //                 console.log("Regija: ", `${data["address"]["state"]}`)
    //                 console.log("Drzava: ", `${data["address"]["country"]}`)

    //                 var desc = document.getElementById("masthead-desc");
    //                 desc.innerHTML = `Grad: ${data["address"]["city"]}<br/>Regija: ${data["address"]["state"]}<br/>Drzava: ${data["address"]["country"]}`;
    //             });

    //         });
    // }
});

function submitForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var message = document.getElementById("message").value;

    if (name != "" && email != "" && phone != "" && message != "") {

        var element = document.getElementById("submitButton");
        element.innerHTML = "sending!"
        element.style.backgroundColor = 'orange';

        var result = sendMail(name, email, phone, message);
        result.then(resultValue => {
            if (resultValue == "OK") {
                element.innerHTML = "Poslano!"
                element.style.backgroundColor = 'green';
                element.onclick = function () {
                    feedbackModal()
                };
            }
            else {
                alert("Greska prilikom slanja poruke, kontaktirajte nas putem mail 123@info.loko!");
                element.innerHTML = "Submit"
                element.style.backgroundColor = 'var(--main-pink)';
            }
        });
    }
    else {
        alert("Popunite sva polja!");
    };
}

async function sendMail(name, email, phone, message) {
    return await Email.send({
        SecureToken: "669df764-f746-4f5b-8b7e-c959be2b7cd7",
        To: "viktoreeeee@gmail.com",
        From: "viktoreeeee@gmail.com",
        Subject: `${name} salje poruku`,
        Body: `poruka: ${message} <br/> ${name}-ov Mail je: ${email} <br/> Kontakt: ${phone}`
    });
}

function feedbackModal() {

    var body = document.body;
    var feedbackModal = document.getElementById("feedbackModal");
    var modalShade = document.getElementById("modalShade");

    if (body.style.overflow == 'hidden') {
        body.style.overflow = 'initial'
        feedbackModal.classList.add("d-none");
        modalShade.classList.add("d-none");

        const navbarToggler = document.body.querySelector('.navbar-toggler');

        if (navbarToggler.getAttribute('aria-expanded') == "true")
            navbarToggler.click();
    }
    else {
        body.style.overflow = 'hidden'
        feedbackModal.classList.remove("d-none");
        modalShade.classList.remove("d-none");
    }
}

function shuffle(withTimeout = true) {

    if (hasReviews) {
        firstReviewCard.move()
        secondReviewCard.move()
        thirdReviewCard.move()
    }

    if (withTimeout)
        setTimeout(shuffle, 2000);
}

