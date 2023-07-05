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
$('#loading').show();

$(document).ready(() => {
  const pn = window.location.pathname;
  const en = s => pn.includes(s);
  setRegister();
  setLogin();
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
  } else if (en('reset-password-landing.html') || en('reset-password-landing')) {
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
        window.alert('Ti sei registrato con successo. Chiudi per continuare.');
        window.localStorage.currentClient = JSON.stringify(data);
        window.location.href = ORIGIN +  '/account.html'
      },
      res => {
        // TODO: add this show message modal
        // showMessage(messageError);
        console.log({ res });
        alert('Qualcosa è andato storto. Contattaci al numero 071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
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
        window.location.href = ORIGIN + '/account.html'
      },
      res => {
        console.log({ res })
        // TODO: add this show message modal
        // showMessage(messageError);
        alert('Qualcosa è andato storto. Contattaci al numero 071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
      }
    );
  });
}
