import {  mkCall } from './utils';

$(document).ready(() => {
  let currentPageParameters = new URL(window.location.href).searchParams;
  let data = {
    'email': currentPageParameters.get('email'),
    'key': currentPageParameters.get('key')
  };
  mkCall(
    'POST',
    { action: 'checkPasswordResetToken', data },
    res => {
      if (!res.result) {
        alert(res.details);
        window.location.href = window.location.origin;
      }
    },
    res => {
      // TODO: add this show message modal
      alert('Qualcosa è andato storto. Contattaci al numero 071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
    }
  );
});
