import {  mkCall } from './utils';

$(document).ready(() => {
  getClosedTimeslots();
});

function setOrari () {
  const cells = $('.orario-btn');
  const info = $('#last-time');
  cells.each(function () {
    const cell = $(this);
    cell.attr('disabled', false);
    const text = cell.text();
    let isEnabled = !window.closedTimeslots.has(text)
    if (isEnabled) {
      cell.attr('class', 'button orario-btn primary')
    } else {
      cell.attr('class', 'button orario-btn secondary')
    }
    cell.on('click', () => {
      isEnabled = !isEnabled;
      if (isEnabled) {
        cell.attr('class', 'button orario-btn primary')
        info.html(`${text} aperto`);
        window.closedTimeslots.delete(text);
      } else {
        cell.attr('class', 'button orario-btn secondary')
        info.html(`${text} chiuso`);
        window.closedTimeslots.add(text);
      }
    });
  });
  $('<button/>', { type: 'button', class: 'button extra-space' })
    .html('Chiudi Asporti')
    .appendTo($('#consolidate'))
    .on('click', () => {
      info.html('In questi orari gli asporti non sono disponibili: ' + new Array(...window.closedTimeslots).join(', '));
      mkCall(
        'POST',
        { action: 'consolidateTimeslots', data: new Array(...window.closedTimeslots) },
        res => {
          window.alert('Orari Asporti Aggiornati');
        },
        res => {
          // TODO: add this show message modal
          alert('Qualcosa è andato storto. Contattaci al numero  071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
        }
      );
    });
}

function getClosedTimeslots () {
  mkCall(
    'POST',
    { action: 'getClosedTimeslots', data: '--' },
    res => {
      window.closedTimeslots = new Set(res);
      setOrari();
    },
    res => {
      // TODO: add this show message modal
      showMessage(messageError);
    }
  );
}
