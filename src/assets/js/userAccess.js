import {  mkCall, ORIGIN } from './utils';

function setLogin (redirectionLink) {
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
        window.location.href = ORIGIN + (redirectionLink || '/account.html');
      },
      res => {
        // TODO: add this show message modal
        alert('Qualcosa è andato storto. Contattaci al numero 071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
      }
    );
  });
}

function setRegister (redirectionLink) {
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
        window.alert('Ti sei registrato con successo. Chiudi per continuare.');
        window.localStorage.currentClient = JSON.stringify(data);
        window.location.href = ORIGIN + (redirectionLink || '/account.html');
      },
      res => {
        // TODO: add this show message modal
        alert('Qualcosa è andato storto. Contattaci al numero 071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
      }
    );
  });
}

export { setLogin, setRegister };
