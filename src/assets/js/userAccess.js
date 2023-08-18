import {  mkCall, validateEmail } from './utils';

function setLogin(redirectionLink) {
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
        window.location.href = window.location.origin + (redirectionLink || '/account.html');
      },
      res => {
        // TODO: add this show message modal
        alert('Qualcosa è andato storto. Contattaci al numero 071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
      }
    );
  });
}

function setRegister(redirectionLink) {
  $('#register-btn').on('click', () => {
    const data = {};
    const get = id => {
      data[id] = $(`#${id}`).val();
    }
    const dataIDs = ['name', 'surname', 'telephone', 'email', 'password'];
    dataIDs.forEach(i => get(i));
    if (!validateEmail(data['email'])) {
      alert("Indirizzo email non valido, si prega di riprovare.");
      return;
    }
    for (const dataKey in data) {
      if (data[dataKey] === "") {
        alert("Prego inserire i dati in tutti i campi.");
        return;
      }
    }
    data.newsletter = $('#newsletter').is(":checked");
    mkCall(
      'POST',
      { action: 'registerClient', data },
      res => {
        window.alert('Ti sei registrato con successo. Chiudi per continuare.');
        window.localStorage.currentClient = JSON.stringify(data);
        window.location.href = window.location.origin + (redirectionLink || '/account.html');
      },
      res => {
        // TODO: add this show message modal
        alert('Qualcosa è andato storto. Contattaci al numero 071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
      }
    );
  });
}

function setPasswordResetRequest() {
  $('#password-reset-btn').on('click', () => {
    let targetEmail = window.user ? window.user.email : $('#password-reset-email').val();
    if (validateEmail(targetEmail)) {
      let data = {
        'email': targetEmail
      };
      mkCall(
        'POST',
        { action: 'passwordResetRequest', data },
        res => {
          if (!res.result) return alert(res.details);
          window.location.href = window.location.origin + ('/reset-password-landing.html');
          window.sessionStorage.setItem("targetEmail", targetEmail);
        },
        res => {
          // TODO: add this show message modal
          alert('Qualcosa è andato storto. Contattaci al numero 071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
        }
      );
    }
    else alert("L'indirizzo email non è valido.");
  });
}

function setPasswordReset() {
  $('#new-password-btn').on('click', () => {
    let newPassword = $('#new-password').val();
    let currentPageParameters = new URL(window.location.href).searchParams;
    let data = {
      'email': currentPageParameters.get('email'),
      'key': currentPageParameters.get('key'),
      'new_password': newPassword
    };
    mkCall(
      'POST',
      { action: 'passwordReset', data },
      res => {
        if (!res.result) return alert(res.details);
        alert(res.details);
        window.location.href = window.location.origin;
      },
      res => {
        // TODO: add this show message modal
        alert('Qualcosa è andato storto. Contattaci al numero 071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
      }
    );
  });
}

export { setLogin, setRegister, setPasswordResetRequest, setPasswordReset };
