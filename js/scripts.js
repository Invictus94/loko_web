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
        else
        {
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

// async function sendMail(name, email, subject, text, element)
async function sendMail()
{
    return await Email.send({
        SecureToken : "669df764-f746-4f5b-8b7e-c959be2b7cd7",
        To : "viktoreeeee@gmail.com",
        From : "viktoreeeee@gmail.com",
        Subject : `test salje poruku => tema test`,
        Body : `poruka: test <br/> test-ov Mail je : test`
    }).then(
      message => alert(message)
    );
}
