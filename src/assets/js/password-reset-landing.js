$(document).ready(() => {
  let targetEmail = window.sessionStorage.getItem("targetEmail");
  if (targetEmail)
    $('#target-email').text(targetEmail);
  else
    window.location.href = '/';
});
