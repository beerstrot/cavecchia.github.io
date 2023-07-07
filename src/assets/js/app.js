import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
window.$ = $;

//require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';

$(document).foundation();
import Splide from '@splidejs/splide';
import { Video } from '@splidejs/splide-extension-video';
import('./cookieconsent-init');
import('./navbar');
import {  mkCall, ORIGIN } from './utils';
import { setLogin, setRegister } from './userAccess';
$('#loading').show();

$(document).ready(() => {
  const pn = window.location.pathname;
  const en = s => pn.includes(s);
  const loginRedirection = ((en('asporto.html') || en('asporto'))) ? '/checkout.html' : '/account.html';
  setRegister(loginRedirection);
  setLogin(loginRedirection);
  $('.user-pg-btn').on('click', () => {
    if (window.localStorage.currentClient) {
      window.location.href = ORIGIN + '/account.html';
    } else {
      $('#signup-login').foundation('open');
    }
  });
  if (en('riserva-un-tavolo.html') || en('consulta.html') || en('riserva-un-tavolo') || en('consulta')){
    import('./prenota');
  } else if (en('asporto.html') || en('asporto')) {
    import('./asporto');
  } else if (en('checkout-landing.html') || en('checkout-landing')) {
    import('./checkout-landing');
  } else if (en('checkout.html') || en('checkout')) {
    import('./checkout');
  } else if (en('account.html') || en('account')) {
    import('./account');
  } else if (en('orari.html') || en('orari')) {
    import('./orari');
  } else if (en('menu.html') || en('menu')) {
  } else if (en('chi-siamo.html') || en('chi-siamo')) {
  } else if (en('informazioni-legali.html') || en('informazioni-legali')) {
  } else if (en('sala-comandi.html') || en('sala-comandi')) {
  } else if (en('404.html') || en('404')) {
  } else if (en('reset-password-landing.html') || en('reset-password-landing') || en('reset-password.html') || en('reset-password') || en('reset-password-success.html') || en('reset-password-success')) {
  } else { // index.html:
    splideInit();
  }
  //import JustValidate from 'just-validate';
  //import('./input-number');
  $('#loading').hide();
});



// inizialize splide
function splideInit () {
  new Splide('#fotoMenu', {
    type: 'slide',
    perPage: 1,
    arrows: true,
    pagination: true,
    drag: true,
    breakpoints: {
      '740': {
        pagination: true,
        arrows: true,
      },
    },
    video: {
      loop: false,
      autoplay     : true,
      mute         : true,
      playerOptions: {
        htmlVideo: {
          playsInline: true,
          autoplay: true,
        },
        youtube: {
        },
      },
    },
  }).mount({ Video });

  new Splide('#fotoLocale', {
    type: 'slide',
    gap: '2rem',
    arrows: true,
    pagination: true,
    drag: true,
    perPage: 2,
    breakpoints : {
      '740': {
        perPage: 1,
        arrows: true,
      },
    },
    video: {
      loop: false,
      autoplay     : true,
      mute         : true,
      playerOptions: {
        htmlVideo: {
          playsInline: true,
          autoplay: true,

        },
        youtube: {
        },
      },
    },
  }).mount({ Video });
}
