/*!
* Start Bootstrap - New Age v6.0.6 (https://startbootstrap.com/theme/new-age)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-new-age/blob/master/LICENSE)
*/
//
// Scripts
// 

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
    }
    else
    {
        body.style.overflow = 'hidden'
        feedbackModal.classList.remove("d-none");
        modalShade.classList.remove("d-none");
    }
}
