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
  $('<button/>', { type: 'button', class: 'button warning' })
    .html('consolidare')
    .appendTo($('#consolidate'))
    .on('click', () => {
      console.log('send to server');
      info.html('orari chiusi sent to server: ' + new Array(...window.closedTimeslots).join(', '));
      mkCall(
        'POST',
        { action: 'consolidateTimeslots', data: new Array(...window.closedTimeslots) },
        res => {
          window.alert('orari disponibili aggiornati');
          console.log({ res });
        },
        res => {
          // TODO: add this show message modal
          showMessage(messageError);
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
