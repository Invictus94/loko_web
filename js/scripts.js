/*!
* Start Bootstrap - New Age v6.0.6 (https://startbootstrap.com/theme/new-age)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-new-age/blob/master/LICENSE)
*/
//
// Scripts
// 
import { Location } from './classes/location.js';
import { tryWrite } from './firebase/init.js';

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');

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

    
    $.getJSON(`https://geolocation-db.com/json/`, function (data) {

        // console.log("Grad u blizini: ", `${data["city"]}`)
        // console.log("Regija: ", `${data["state"]}`)
        // console.log("Drzava: ", `${data["country_name"]}`)
        tryWrite(new Location(data["country_name"], data["state"], data["city"]));

        var desc = document.getElementById("masthead-desc");
        desc.innerHTML = `Grad u blizini: ${data["city"]} - Regija: ${data["state"]} - Drzava: ${data["country_name"]}`;
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
        result.then( resultValue => {
            if (resultValue == "OK") {
                element.innerHTML = "Poslano!"
                element.style.backgroundColor = 'green';
                element.onclick = function () {
                    feedbackModal()
                };
            }
            else {
                // element.innerHTML = resultValue;
                alert("Greska prilikom slanja poruke, kontaktirajte nas putem mail 123@info.loko!");
                element.innerHTML = "Submit"
                element.style.backgroundColor = 'var(--main-pink)';
            }
        });
    }
    else {
        //   alert(translate("check_fields"));
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

    var body = document.getElementById("page-top");
    var feedbackModal = document.getElementById("feedbackModal");
    var modalShade = document.getElementById("modalShade");

    if(body.style.overflow == 'hidden')
    {
        body.style.overflow = 'initial'
        feedbackModal.classList.add("d-none");
        modalShade.classList.add("d-none");

        const navbarToggler = document.body.querySelector('.navbar-toggler');
        navbarToggler.click();
    }
    else
    {
        body.style.overflow = 'hidden'
        feedbackModal.classList.remove("d-none");
        modalShade.classList.remove("d-none");
    }
}
