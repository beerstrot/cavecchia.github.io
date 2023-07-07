import { mkCall } from './utils';
import { carrelloCheckoutUser } from './htmlTemplates';

$(document).ready(() => {
  if (window.localStorage.currentClient)
    window.user = JSON.parse(window.localStorage.currentClient);
  else window.location.href = '/index.html'
  $('#logout-btn').on('click', () => {
    delete window.localStorage.currentClient;
    window.location.href = '/index.html'
  });
  setUserData();
  setUpdate();
  setPreviousOrders();
});

function setUserData () {
  ['name', 'surname', 'email', 'telephone'].forEach(i => $(`#${i}-m`).val(window.user[i]));
  $('#newsletter-m').prop('checked', user.newsletter);
  $('#ttitle').html(`Ciao ${user.name}`);
}

function setUpdate () {
  $('#update-usr-btn').on('click', () => {
    const data = {};
    const get = id => {
      data[id] = $(`#${id}-m`).val();
    }
    console.log('click make me');
    ['name', 'surname', 'telephone', 'email'].forEach(i => get(i));
    data.newsletter = $('#newsletter').is(":checked");
    mkCall(
      'POST',
      { action: 'updateClient', data },
      res => {
        console.log({ res });
        ['name', 'surname', 'telephone', 'email'].forEach(i => { window.user[i] = $(`#${i}-m`).val() });
        window.localStorage.currentClient = JSON.stringify(window.user);
        window.location.href = '/account.html';
      },
      res => {
        // TODO: add this show message modal
        showMessage(messageError);
      }
    );
  });
}

function setPreviousOrders () {
  const mesi = 'gennaio, febbraio, marzo, aprile, maggio, giugno, luglio, agosto, settembre, ottobre, novembre, dicembre'.split(', ');
  // const temp = carrelliCheckoutUser(user.orders);
  user.orders.forEach((order, count) => {
    const d = new Date(order.deliver_at);
    const title = `Ordine del ${d.getDate()} ${mesi[d.getMonth()]} ${d.getFullYear()}`;
    const li = $('<li/>', { class: 'accordion-item ordine-salvato-item', 'data-accordion-item': true }).appendTo($('#carrelli-accordion'));
    $('<a/>', { class: 'accordion-title', href: '#order-' + count })
      .html(title).appendTo(li);
    const temp = carrelloCheckoutUser(order.order_items, count);
    $('<div/>', { class: 'accordion-content ordine-salvato-content clearfix', 'data-tab-content': true, id: 'order-' + count }).appendTo(li).html(temp);
    $('#remove-' + count).show();
    $('#load-' + count).show();
  });
  // const li = $('<li/>', { class: 'accordion-item ordine-salvato-item', 'data-accordion-item': true }).appendTo($('#carrelli-accordion'));
  // $('<a/>', { class: 'accordion-title', href: '#dummy' }).html('ordine dummy').appendTo(li);
  // $('<div/>', { class: 'accordion-content ordine-salvato-content clearfix', 'data-tab-content': true, id: 'dummy' }).appendTo(li).html('AOSIDJASOISDJ');
}
