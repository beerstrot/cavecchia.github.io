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
import {  mkCall } from './utils';
$('#loading').show();

$(document).ready(() => {
  const pn = window.location.pathname;
  const en = s => pn.endsWith(s);
  setRegister();
  setLogin();
  $('#user-pg-btn').on('click', () => {
    if (window.localStorage.currentClient) {
      window.location.href = '/account.html'
    } else {
      $('#signup-login').foundation('open');
    }
  });
  if (en('riserva-un-tavolo.html')) {
    import('./prenota');
  } else if (en('asporto.html')) {
    import('./asporto');
  } else if (en('checkout.html')) {
    import('./checkout');
  } else if (en('account.html')) {
    import('./account');
  } else if (en('orari.html')) {
    import('./orari');
  } else if (en('checkout-landing.html')) {
    import('./checkout-landing');
  } else if (en('menu.html')) {
  } else if (en('chi-siamo.html')) {
  } else if (en('informazioni-legali.html')) {
  } else { // index.html:
    splideInit();
  }
  //import JustValidate from 'just-validate';
  import('./input-number');
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

function setRegister () {
  $('#register-btn').on('click', () => {
    const data = {};
    const get = id => {
      data[id] = $(`#${id}`).val();
    }
    ['name', 'surname', 'telephone', 'email', 'password'].forEach(i => get(i));
    data.newsletter = $('#newsletter').is(":checked");
    mkCall(
      'POST',
      { action: 'registerClient', data },
      res => {
        console.log({ res });
        window.localStorage.currentClient = JSON.stringify(data);
        window.location.href = '/account.html'
      },
      res => {
        // TODO: add this show message modal
        showMessage(messageError);
      }
    );
  });
}

function setLogin () {
  $('#login-btn').on('click', () => {
    const data = {};
    const get = id => {
      data[id] = $(`#${id}-login`).val();
    }
    ['email', 'password'].forEach(i => get(i));
    mkCall(
      'POST',
      { action: 'login', data },
      res => {
        if (!res.result) return alert(res.details);
        window.localStorage.currentClient = JSON.stringify(res.details);
        window.location.href = '/account.html'
      },
      res => {
        // TODO: add this show message modal
        showMessage(messageError);
      }
    );
  });
}
