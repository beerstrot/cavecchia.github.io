import { mkCall } from './utils';
import { itemsCarrelloCheckout } from './htmlTemplates';

$(document).ready(() => {
  checkStoredOrder();
  getClosedTimeslots();
  setSendOrder();
});


function checkStoredOrder () {
  const storage = window.localStorage.currentOrder;
  if (!storage) {
    window.location.href = '/asporto.html'
    return;
  }
  const prods = JSON.parse(storage);
  window.prods = prods;
  if (prods) {
    prods.forEach(p => {
      const price = p.quantity * p.price1;
      const template = itemsCarrelloCheckout(p.name, p.noteText, p.cotturaV, p.quantity, price);
      console.log({ template });

      $('#itens-carrello-checkout').append(template);
    });
  }
  const total = prods.reduce((a, p) => a + p.quantity * p.price1, 0);
  $('#checkout-total').text(`€ ${total.toLocaleString()}`);
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

function setOrari () {
  const cells = $('.orario-btn');
  cells.each(function () {
    const cell = $(this);
    const text = cell.text();
    let isEnabled = !window.closedTimeslots.has(text)
    cell.attr('disabled', !isEnabled);
    cell.on('click', () => {
      cells.each(function () {
        $(this).attr('class', 'button orario-btn')
          .attr('bselected', false);
      });
      cell.attr('class', 'button orario-btn success')
        .attr('bselected', true);
      window.localStorage.timeSlot = text;
    });
  });
  if (window.localStorage.timeSlot) {
    $(`button:contains("${window.localStorage.timeSlot}")`).click();
  }
}

function setSendOrder () {
  const client = JSON.parse(window.localStorage.currentClient);
  window.client = client;
  const ps = window.prods.map(p => {
    const data = {
      item_id: p.id,
      name: p.name,
      uuid: p.uuid,
      net_price: p.net_price,
      vat_perc: p.vat_perc || Math.round(100 * (p.price1 / p.net_price - 1)),
      final_price: p.price1 * p.quantity,
      final_net_price: p.net_price * p.quantity,
      notes: p.noteText,
      price: p.price1,
      quantity: p.quantity,
    };
    if (p.cotturaId) {
      data.variations = [{
        name: 'Cottura',
        value: p.cotturaV,
        variation_id: p.cotturaId,
        variation_value_id: p.cotturaI
      }]
    }
    return data;
  });
  const data = {
    email: JSON.parse(window.localStorage.currentClient).email,
    order: {
      order_items: ps,
      order_customer: {
        email: client.email,
        first_name: client.name,
        last_name: client.surname,
        mobile: client.telephone
      }
    },
    takeout_time: window.localStorage.timeSlot
  };
  console.log({ data });
  $('#send-order').on('click', () => {
    mkCall(
      'POST',
      { action: 'registerOrder', data },
      res => {
        client.orders = JSON.parse(res).Attributes.orders;
        window.localStorage.currentClient = JSON.stringify(client);
        const order = client.orders[client.orders.length - 1];
        window.localStorage.lastOrder = JSON.stringify(order);
        delete window.localStorage.currentOrder;
        window.location.href = '/checkout-landing.html'
      },
      res => {
        // TODO: add this show message modal
        showMessage(messageError);
      }
    );
  });
}
