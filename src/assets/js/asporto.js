import { bana, mkCall, testeLambdaPOST, ORIGIN } from './utils';
import { itemsCarrelloTable } from './htmlTemplates';

$(document).ready(() => {
  mkCall(
    'POST',
    { action: 'getItems', data: '--' },
    res => {
      mkInterface(res);
    },
    res => {
      // TODO: add this show message modal
      showMessage(messageError);
    }
  );
  // testeLambdaPOST();
});

function mkInterface (r) {
  setLogin();
  setRegister();
  const d = JSON.parse(r);

  const prods = d.items.results
    .filter(i => i.option1_value) // if has subcategory
    .filter(i => i.channels.map(j => j.channel_id).includes('sitoWebAsporto')) // if has channel asporto
    .filter(i => i.on_sale);  // if is on sale
  mkMenu(prods);
  $('#vai-checkout-large').off('click').on('click', () => {
    if (window.localStorage.currentClient) {
      window.location.href = ORIGIN + '/checkout.html'
    } else {
      $('#signup-login').foundation('open');
    }
  });
  $('#vai-checkout-small').off('click').on('click', () => {
    if (window.localStorage.currentClient) {
      window.location.href = ORIGIN + '/checkout.html'
    } else {
      $('#signup-login').foundation('open');
    }
  });
}

function mkMenu (prods) {
  window.allProducts = prods;
  $('h2').parent().children('.grid-x').html('');
  prods.forEach(p => {
    p.quantity = 0;
    const secDiv = $(`h2:contains("${p.option1_value}")`).parent().children('.grid-x');
    if (secDiv.length) {
      mkCell(p, secDiv);
      mkModal(p, secDiv);
    } else {
      console.log('sezione non trovata per il prodotto:', p.name);
    }
  });
  $('#carrelloPieno').hide();
  $('#carrelloPiccoloPieno').hide();
  checkStoredOrder();
  setRegister();
  getClosedTimeslots();
}

function getImgRoot () {
  // const imgURL = 'https://www.beerstrot.it/cavecchia.github.io/assets/img/test/test-immagine1-1-1.jpg';
  // const imgURL = window.location.origin + '/' + 'assets/img/prod/'
  // const pieces = imgURL.split('/');
  // const imgRoot = pieces.slice(0, pieces.length - 1).join('/');

  const imgRoot = ORIGIN + '/assets/img/prod/';
  // const imgRoot = window.location.origin + '/' + 'assets/img/prod/';
  return imgRoot;
}
const IMG_ROOT = getImgRoot();

function mkCellSmall (p, cell) {
  const pid = mkPid(p);
  const pp = mkDiv(
    'product-page',
    mkDiv('hide-for-medium', cell)
  );
  const imgName = pid + '_quadrato.jpg';
  // const imgName = 'test-immagine1-1-1.jpg';
  M('img', '', mkDiv('item-image', pp), {
    src: `${IMG_ROOT}${imgName}`,
    onerror: "this.style.display='none'",
    alt: p.name
  });

  const tDiv = mkDiv('item-text', pp)
  M(
    'span',
    'price', 
    M('h3', '', tDiv).html(p.name)
  ).html(p.price1);
  M('p', '', tDiv).html(p.description);
  M('button', 'button small', mkDiv('item-button', pp), {
    type: 'button',
    'data-open': pid,
    css: { 'margin-bottom': 0 }
  }).html('Aggiungi al Carrello');
}

function mkCellMedium (p, cell) {
  const pid = mkPid(p);
  const cs = mkDiv(
    'card-section',
    mkDiv(
      'card',
      mkDiv('show-for-medium', cell)
    )
  );
  // const imgName = 'test-immagine1-16-9.jpg';
  const imgName = pid + '_rettangolare.jpg';
  M('img', 'show-for-medium', cs, {
    src: `${IMG_ROOT}${imgName}`,
    onerror: "this.style.display='none'",
    alt: p.name
  });
  M(
    'span',
    'price', 
    M('h3', '', cs).html(p.name)
  ).html(p.price1);
  M(
    'small',
    '',
    M('p', '', cs).html(p.description)
  ).html('Allergeni: ' + p.allergens.map(i => i.name).join(', '));
  M('button', 'button small', cs, {
    type: 'button',
    'data-open': pid
  }).html('Aggiungi al Carrello');
}

function mkModal (p, secDiv) {
  const pid = mkPid(p);
  // const imgName = 'test-immagine1-16-9.jpg';
  const imgName = pid + '_rettangolare.jpg';
  const modal = M('div', 'reveal reveal-ecommerce', secDiv, {
    id: pid
  });
  const closeBtn = M('button', 'close-button close-button-sticky', modal, {
    type: 'button',
    'aria-label': 'Close reveal',
  }).append(
    M('span', '', null, { 'aria-hidden': true }).html('&times;')
  ).on('click', () => {
    modal.foundation('close');
  });
  M('img', '', modal, {
    src: `${IMG_ROOT}${imgName}`,
    onerror: "this.style.display='none'",
    alt: p.name
  });
  M('h1', 'h1-modal', M('header', 'main-header', modal)).html(p.name);

  const modalDiv = mkDiv('main-content', modal);
  M('p', 'allergeni', M('small', '', modalDiv).html(p.description)).html('Allergeni: ' + p.allergens.map(i => i.name).join(', '), {
    maxlength: '200',  placeholder: '...', css: { 'min-height': '0.5rem' }
  });
  const noteText = M('textarea', '', M('label', '', modalDiv, { id: pid + '_note' }), {
    maxlength: '200',  placeholder: '...', css: { 'min-height': '0.5rem' }
  });
  if (!hasNote(p)) {
    $('#' + pid + '_note').hide();
  }

  const cottura = M('select', '', M('label', '', modalDiv, { id: pid + '_cottura' }).html(`<strong>Cottura</strong>`), { id: pid + 'cottura_', 'data-variation_id': getCotturaId(p) })
  const v = hasCottura(p);
  v.forEach(vv => {
    M('option', '', cottura, { value: vv.id }).html(vv.value);
  });
  if (v.length === 0) {
    $('#' + pid + '_cottura').hide();
  }
  const footer = M('footer', 'main-footer-carrello-small', modal);
  const footerDiv = mkDiv('input-group input-number-group', footer);
  let quantity = 1;
  let price = quantity * p.price1;
  M('i', 'las la-minus-square la-2x',
    M('span', 'input-number-decrement',
      mkDiv('input-group-button group-margin', footerDiv)
    ).click(function() {
      var $input = $(this).parents('.input-number-group').find('.input-number');
      var val = parseInt($input.val(), 10);
      quantity = val - 1;
      if (quantity < 0) {
        quantity = 0;
      }
      $input.val(quantity);
      placePrice(quantity);
    })
  );
  M('input', 'input-number group-margin', footerDiv, {
    css: { width: '3rem' },  type: 'button', value: '1', min: '0', max: '20'
  });
  M('i', 'las la-plus-square la-2x',
    M('span', 'input-number-increment',
      mkDiv('input-group-button group-margin', footerDiv)
    ).click(function() {
      var $input = $(this).parents('.input-number-group').find('.input-number');
      var val = parseInt($input.val(), 10);
      quantity = val + 1;
      $input.val(quantity);
      placePrice(quantity);
    })
  );
  const btnPrice = M('span', 'price',
    M('button', 'button expanded-with-padding extra-space-button-modal', footer, { type: 'button' }).html('Aggiungi al carrello')
      .on('click', () => {
        $(`.carrello-row-${pid}`).remove();
        p.quantity = quantity;
        p.noteText = noteText.val();
        if (quantity) {
          const cotturaV = $('#' + pid + 'cottura_ option:selected').text();
          const cotturaI = $('#' + pid + 'cottura_ option:selected').val();
          p.cotturaV = cotturaV;
          p.cotturaI = cotturaI;
          p.cotturaId = $('#' + pid + 'cottura_').data().variation_id;
          const template = itemsCarrelloTable(p.name, p.noteText, p.cotturaV, p.quantity, price, pid);
          $('.itens-carrello-table').append(template);
        }
        updateTotal();
        $('.input-number-increment-' + pid).click(function() {
          const $input = $(this).parents('.input-number-group').find('.input-number');
          const val = parseInt($input.val(), 10);
          $input.val(val + 1);
          p.quantity = val + 1;
          $('.prezzo-item-' + pid).html((val + 1) * p.price1);
          updateTotal();
        });
        $('.input-number-decrement-' + pid).click(function() {
          const $input = $(this).parents('.input-number-group').find('.input-number');
          const val = parseInt($input.val(), 10);
          let v = val - 1;
          if (v < 0) {
            v = 0;
          }
          $input.val(v);
          p.quantity = v;
          $('.prezzo-item-' + pid).html(v * p.price1);
          updateTotal();
        })
        closeBtn.click();
      })
  ).html(` € ${price}`);

  function placePrice (quantity) {
    price = p.price1 * quantity;
    btnPrice.html(` € ${price}`)
  }

  new Foundation.Reveal(modal.foundation());
}

function mkCell (p, secDiv) {
  const cell = mkDiv('cell cellmann', secDiv);
  mkCellSmall(p, cell);
  mkCellMedium(p, cell);
}

function mkDiv (class_, parent_) {
  return M('div', class_, parent_);
}

function M (el = 'div', class_ = '', parent_ = null, attrs = {}) {
  const e = $(`<${el}/>`, { class: class_ || '', ...(attrs || {}) })
  if (parent_) {
    e.appendTo(parent_);
  }
  return e
}

function mkPid (p) {
  return p.name.replaceAll(' ', '').replaceAll("'", '');
}

function hasNote(p) {
  return p.variations.map(p => p.name).includes('note');
}

function hasCottura(p) {
  const cot = p.variations.filter(i => i.name === 'Cottura')[0];
  if (cot) {
    return cot.variation_values;
  }
  return [];
}

function updateTotal () {
  const prods = window.allProducts.filter(p => p.quantity);
  window.localStorage.currentOrder = JSON.stringify(prods);
  const total = prods.reduce((a, p) => a + p.quantity * p.price1, 0);
  if (total === 0) {
    $('#carrelloPieno').hide();
    $('#carrelloVuoto').show();
    $('#carrelloPiccoloPieno').hide();
    $('#carrelloPiccoloVuoto').show();
  } else {
    $('#carrelloPieno').show();
    $('#carrelloVuoto').hide();
    $('#carrelloPiccoloPieno').show();
    $('#carrelloPiccoloVuoto').hide();
  }
  $('.carrello-table-totale').text(`€ ${total.toLocaleString()}`);
  const quantity = prods.reduce((a, p) => a + p.quantity, 0);
  $('.prod-quantity').text(`${quantity}`);
}

function checkStoredOrder () {
  const storage = window.localStorage.currentOrder;
  if (!storage) return;
  const prods = JSON.parse(storage);
  if (prods) {
    prods.forEach(p => {
      const prod = window.allProducts.filter(pp => pp.id === p.id);
      if (prod.length) {
        const p_ = prod[0];
        p_.quantity = p.quantity;
        p_.noteText = p.noteText;
        p_.cotturaV = p.cotturaV || '';
        const price = p.quantity * p.price1;
        const pid = mkPid(p);
        const template = itemsCarrelloTable(p.name, p.noteText, p.cotturaV, p.quantity, price, pid);
        $('.itens-carrello-table').append(template);
        // $('#carrello-small-items').append(template);
        $('.input-number-increment-' + pid).click(function() {
          const $input = $(this).parents('.input-number-group').find('.input-number');
          const val = parseInt($input.val(), 10);
          $input.val(val + 1);
          p_.quantity = val + 1;
          $('.prezzo-item-' + pid).html((val  + 1) * p.price1);
          updateTotal();
        });
        $('.input-number-decrement-' + pid).click(function() {
          const $input = $(this).parents('.input-number-group').find('.input-number');
          const val = parseInt($input.val(), 10);
          let v = val - 1;
          if (v < 0) {
            v = 0;
          }
          $input.val(v);
          p_.quantity = v;
          $('.prezzo-item-' + pid).html(v * p.price1);
          updateTotal();
        })
      }
    });
  }
  updateTotal();
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
    });
  });
  if (window.localStorage.timeSlot) {
    $(`button:contains("${window.localStorage.timeSlot}")`).click();
  }
}

function getCotturaId (p) {
  const cot = p.variations.filter(i => i.name === 'Cottura')[0];
  if (cot) {
    return cot.id;
  }
  return undefined;
}

function setRegister () {
  $('#register-btn').off('click').on('click', () => {
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
        window.alert('Il tuo registro è andato a buon fine.');
        window.localStorage.currentClient = JSON.stringify(data);
        window.location.href = ORIGIN + '/checkout.html';
      },
      res => {
        // TODO: add this show message modal
        showMessage(messageError);
      }
    );
  });
}

function setLogin () {
  $('#login-btn').off('click').on('click', () => {
    window.alert('comeon man');
    const data = {};
    const get = id => {
      data[id] = $(`#${id}-login`).val();
    }
    ['email', 'password'].forEach(i => get(i));
    mkCall(
      'POST',
      { action: 'login', data },
      res => {
        // window.alert('res ok');
        // window.alert(res);
        // console.log({ res });
        if (!res.result) return alert(res.details);
        window.localStorage.currentClient = JSON.stringify(res.details);
        window.location.href = ORIGIN + '/checkout.html';
      },
      res => {
        window.alert('error');
        // TODO: add this show message modal
        showMessage(messageError);
      }
    );
  });
}
