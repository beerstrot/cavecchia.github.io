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
import { mkCall, ORIGIN } from './utils';
import { setLogin, setRegister, setPasswordResetRequest, setPasswordReset } from './userAccess';
$('#loading').show();

$(document).ready(() => {
  const pn = window.location.pathname;
  const en = s => pn.includes(s);
  const accountRedirection = en('asporto') ? '/checkout.html' : '/account.html';
  setRegister(accountRedirection);
  setLogin(accountRedirection);
  setPasswordResetRequest();
  setPasswordReset();
  $('.user-pg-btn').on('click', () => {
    if (window.localStorage.currentClient) {
      window.location.href = ORIGIN + '/account.html';
    } else {
      $('#signup-login').foundation('open');
    }
  });
  if (en('riserva-un-tavolo') || en('consulta')){
    import('./prenota');
  } else if (en('asporto')) {
    import('./asporto');
  } else if (en('checkout-landing')) {
    import('./checkout-landing');
  } else if (en('checkout')) {
    import('./checkout');
  } else if (en('account')) {
    import('./account');
  } else if (en('orari')) {
    import('./orari');
  } else if (en('reset-password-landing')) {
    import('./password-reset-landing');
  } else if (en('reset-password')) {
    import('./password-reset');
  } else if (en('reset-password-success')) {
  } else if (en('menu')) {
  } else if (en('chi-siamo')) {
  } else if (en('informazioni-legali')) {
  } else if (en('torte-compleanno')) {
  } else if (en('sala-comandi')) {
  } else if (en('404')) {
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
