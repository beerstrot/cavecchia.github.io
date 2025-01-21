import { mkCall, ORIGIN } from './utils';
import { carrelloCheckoutUser } from './htmlTemplates';
const { v4: uuidv4 } = require('uuid');

$(document).ready(() => {
  if (window.localStorage.currentClient)
    window.user = JSON.parse(window.localStorage.currentClient);
  else window.location.href = '/#signup-login'
  $('#logout-btn').on('click', () => {
    delete window.localStorage.currentClient;
    window.location.href = '/'
  });
  setUserData();
  setUpdate();
  if (window.user['orders'])
    setPreviousOrders();
  $("#poppas-test").click(function (e) {
    let popup = new Foundation.Reveal($('#noProdotti'));
    popup.open();
  });
  $("#confirm-order-load").click(function (e) {
    let tempOrder = JSON.parse(window.localStorage.tempOrder);
    delete window.localStorage.tempOrder;
    confirmLoadPreviousOrder(tempOrder);
  });
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
    ['name', 'surname', 'telephone', 'email'].forEach(i => get(i));
    data.newsletter = $('#newsletter-m').is(":checked");
    mkCall(
      'POST',
      { action: 'updateClient', data },
      res => {
        ['name', 'surname', 'telephone', 'newsletter'].forEach(i => { window.user[i] = res.Attributes[i] });
        setUserData();
        window.localStorage.currentClient = JSON.stringify(window.user);
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
  $('#carrelli-accordion').empty();
  // console.log(user)
  user.orders.forEach((order, count) => {
    // Ottiene gli ordini passati, le vecchie api avevano order_items, sul db c'è la stessa struttura dalle api
    // La nuova struttura delle api ha sale_items, prende solo gli ordini che hanno sale_items.
    if (order.sale_items){
        const d = new Date(order.deliver_at);
        const title = `Ordine del ${d.getDate()} ${mesi[d.getMonth()]} ${d.getFullYear()}`;
        const li = $('<li/>', { class: 'accordion-item', 'data-accordion-item': true }).appendTo($('#carrelli-accordion'));
        $('<a/>', { class: 'accordion-title', href: '#order-' + count })
          .html(title).appendTo(li);
        const temp = carrelloCheckoutUser(order.sale_items, count); // nelle vecchie api era order_items invece di sale_items
        $('<div/>', { class: 'accordion-content ordine-salvato-content clearfix', 'data-tab-content': true, id: 'order-' + count }).appendTo(li).html(temp);
        $('#load-' + count).show();
        $('#remove-' + count).show();
        $('#load-' + count).on('click', () => loadPreviousOrder(count));
        $('#remove-' + count).on('click', () => deletePreviousOrder(count));
    }
  });
  // const li = $('<li/>', { class: 'accordion-item ordine-salvato-item', 'data-accordion-item': true }).appendTo($('#carrelli-accordion'));
  // $('<a/>', { class: 'accordion-title', href: '#dummy' }).html('ordine dummy').appendTo(li);
  // $('<div/>', { class: 'accordion-content ordine-salvato-content clearfix', 'data-tab-content': true, id: 'dummy' }).appendTo(li).html('AOSIDJASOISDJ');
}

function loadPreviousOrder(indexID) {
  let data = {
    "email": window.user.email,
    "order_index": indexID
  };
  mkCall(
    'POST',
    { action: 'loadPreviousOrder', data },
    res => {
      if (res.result) {
        if (res.details.unavailable_items.length > 0) {
          $('#unavailable-items').empty();
          for (let unavailableItem of res.details.unavailable_items)
            $('#unavailable-items').append("<li>" + unavailableItem + "</li>");
          window.localStorage.tempOrder = JSON.stringify(res.details.available_items);
          let popup = new Foundation.Reveal($('#noProdotti'));
          popup.open();
        }
        else
          confirmLoadPreviousOrder(res.details.available_items);
      }
      else
        alert(res.details);
    },
    err => {
      // TODO: add this show message modal
      alert('Qualcosa è andato storto. Contattaci al numero  071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
    }
  );
}

function confirmLoadPreviousOrder(orderToLoad) {
  const newOrderList = [];

  for (const product of orderToLoad) {
    const productWithUuid = { ...product, rowUuid: uuidv4() };
    newOrderList.push(productWithUuid);
  }

  window.localStorage.currentOrder = JSON.stringify(newOrderList);
  window.location.href = ORIGIN + '/checkout.html'
}

function deletePreviousOrder(indexID) {
  let data = {
    "email": window.user.email,
    "order_index": indexID
  };
  mkCall(
    'POST',
    { action: 'deletePreviousOrder', data },
    res => {
      let user = JSON.parse(window.localStorage.currentClient);
      delete user.orders;
      user.orders = JSON.parse(JSON.stringify(res));
      window.localStorage.currentClient = JSON.stringify(user);
      location.reload();
    },
    err => {
      // TODO: add this show message modal
      alert('Qualcosa è andato storto. Contattaci al numero  071 8853384 oppure inviaci una email a info@beerstrot.it. Grazie');
    }
  );
}
