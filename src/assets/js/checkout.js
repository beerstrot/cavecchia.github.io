import { mkCall, formatNum, ORIGIN } from './utils';
import { itemsCarrelloCheckout } from './htmlTemplates';

$(document).ready(() => {
  checkStoredOrder();
  getClosedTimeslots();
  setSendOrder();
});


function checkStoredOrder () {
  const storage = window.localStorage.currentOrder;
  if (!storage) {
    window.location.href = ORIGIN + '/asporto.html'
    return;
  }
  const prods = JSON.parse(storage);
  window.prods = prods;
  if (prods) {
    prods.forEach(p => {
      const price = p.quantity * p.price1;
      const template = itemsCarrelloCheckout(p.name, p.noteText, p.cotturaV, p.quantity, formatNum(price));
      console.log({ template });

      $('#itens-carrello-checkout').append(template);
    });
  }
  const total = prods.reduce((a, p) => a + p.quantity * p.price1, 0);
  $('#checkout-total').html(` €&ensp;${formatNum(total)}`);
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
  const d_ = new Date();
  const diff = 15; // minutes
  const d = new Date(d_.getTime() + diff * 60000);
  const h = d.getUTCHours();
  const m = d.getUTCMinutes();
  const o = d.getTimezoneOffset();
  const h_ = h - Math.round(o / 60);
  const t = `${h_}:${m}`;
  const cells = $('.orario-btn');
  cells.each(function () {
    const cell = $(this);
    const text = cell.text();
    const isEnabled = (!window.closedTimeslots.has(text)) && (text > t);
    cell.attr('disabled', !isEnabled);
    cell.on('click', () => {
      cells.each(function () {
        $(this).attr('class', 'button orario-btn')
          .attr('bselected', false);
      });
      cell.attr('class', 'button orario-btn success')
        .attr('bselected', true);
      window.localStorage.timeSlot = text;
      $('#chosen-time').html(text);
    });
  });
  if (window.localStorage.timeSlot) {
    $(`button:contains("${window.localStorage.timeSlot}")`).click();
  } else {
    $('#chosen-time').html('--');
  }
}

function setSendOrder () {
  const client = JSON.parse(window.localStorage.currentClient);
  window.client = client;
  const ps = window.prods.map(p => {
    console.log({ p })
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
    if (p.category) {
      data.category_id = p.category.id
      data.category_name = p.category.name
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
    }
  };
  console.log({ data });
  $('#send-order').on('click', () => {
    if (!window.localStorage.timeSlot) {
      return window.alert('selezioni un orario di ritiro');
    }
    data.takeout_time = window.localStorage.timeSlot;
    mkCall(
      'POST',
      { action: 'registerOrder', data },
      res => {
        client.orders = JSON.parse(res).Attributes.orders;
        window.localStorage.currentClient = JSON.stringify(client);
        const order = client.orders[client.orders.length - 1];
        window.localStorage.lastOrder = JSON.stringify(order);
        delete window.localStorage.currentOrder;
        window.localStorage.timeSlot_ = window.localStorage.timeSlot;
        delete window.localStorage.timeSlot;
        window.location.href = ORIGIN + '/checkout-landing.html'
      },
      res => {
        // TODO: add this show message modal
        // showMessage(messageError);
        alert('Errore. Contattare il personale Beerstrot');
      }
    );
  });
}
