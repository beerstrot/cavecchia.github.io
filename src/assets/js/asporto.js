import { bana, mkCall, formatNum, ORIGIN } from './utils';
import { itemsCarrelloTable } from './htmlTemplates';
const { v4: uuidv4 } = require('uuid');

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
});

function mkInterface (r) {
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
  /* Costruttore del menù */
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
  }).html('Seleziona');
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
  }).html('Seleziona');
}

function updateCartTotals () {
  const productsOrdered = JSON.parse(window.localStorage.currentOrder || '[]');

  let totalPrice = 0;
  productsOrdered.forEach(product => {
    totalPrice += product.quantity * product.price1;
  });

  if (totalPrice === 0) {
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
  //prezzo carrello e nr prodotti carrello
  $('.carrello-table-totale').html(` &nbsp;&nbsp;€&ensp;${formatNum(totalPrice)}`);

  let totalQuantity = 0;
  productsOrdered.forEach(product => {
    totalQuantity += product.quantity;
  });
  $('.prod-quantity').html(` &nbsp;${totalQuantity}`);
}

function addProductIntoCurrentOrder(product_id, product_cotturaV, product_quantity, row_uuid) {
  let product = {};
  window.allProducts.forEach(prod => {
    if (prod.id === product_id){
        product = prod;
        return;
    }
  });

  product.cotturaV = product_cotturaV;
  product.quantity = product_quantity;
  product.rowUuid = row_uuid;

  const existingOrder = JSON.parse(window.localStorage.currentOrder || '[]');

  let newCurrentOrder = [];
  if (existingOrder.length === 0){
    newCurrentOrder.push(product)
    window.localStorage.currentOrder = JSON.stringify(newCurrentOrder);
    return;
  }

  let isNewProductPresentIntoOrder = false;
  for (const productOrdered of existingOrder) {
      if (productOrdered.rowUuid == product.rowUuid){
          isNewProductPresentIntoOrder = true;
          newCurrentOrder.push(product);
      } else {
        newCurrentOrder.push(productOrdered);
      }
  }

  if (!isNewProductPresentIntoOrder){
      newCurrentOrder.push(product);
  }

  window.localStorage.currentOrder = JSON.stringify(newCurrentOrder);
}

function UpdateProductIntoCurrentOrder(nextQuantity, rowUuid){
    const productsOrdered = JSON.parse(window.localStorage.currentOrder || '[]');

    // Ciclo inverso per evitare problemi di indicizzazione dopo la rimozione
    for (let i = productsOrdered.length - 1; i >= 0; i--) {
        const product = productsOrdered[i];
        if (product.rowUuid === rowUuid) {
            if (nextQuantity > 0) {
                product.quantity = nextQuantity;
            } else {
                productsOrdered.splice(i, 1);
            }
        }
    }
    window.localStorage.currentOrder = JSON.stringify(productsOrdered);
}

function resetModalsInput(){
    $('.modal-input-number').val(1);
    $('.modal-input-note').val('');
}

const addToCart = (p, quantity, noteText, pid, price, cotturaV, cotturaI) => {
    p.quantity = quantity;
    p.noteText = noteText.val();
    p.rowUuid  = uuidv4();

    if (quantity) {
        p.cotturaV = cotturaV;
        p.cotturaI = cotturaI;
        p.cotturaId = $('#' + pid + 'cottura_').data().variation_id;
        const template = itemsCarrelloTable(p.name, p.noteText, p.cotturaV, p.quantity, price, p.id, p.rowUuid);
        $('.itens-carrello-table').append(template);
    }
    addProductIntoCurrentOrder(p.id, p.cotturaV, p.quantity, p.rowUuid);
    updateCartTotals();
    resetModalsInput();

    $(`.input-number-increment-${p.rowUuid}`).click(function() {
      const rowUuid = $(this).data('row-uuid');
      const $input = $(`.input-number-${rowUuid}`);
      const currentQuantity = parseInt($input.val(), 10);

      $input.val(currentQuantity + 1);
      let nextQuantity = currentQuantity + 1;
      $(`.prezzo-item-${rowUuid}`).html(formatNum((nextQuantity) * p.price1));

      UpdateProductIntoCurrentOrder(nextQuantity, rowUuid);
      updateCartTotals();
    });

    $(`.input-number-decrement-${p.rowUuid}`).click(function() {
      const rowUuid = $(this).data('row-uuid');
      const $input = $(`.input-number-${rowUuid}`);
      const currentQuantity = parseInt($input.val(), 10);

      let nextQuantity = currentQuantity - 1;
      if (nextQuantity < 0) {
        nextQuantity = 0;
      }
      $input.val(nextQuantity);

      $(`.prezzo-item-${rowUuid}`).html(formatNum(nextQuantity * p.price1));

      if (nextQuantity === 0) {
          $(`.carrello-row-${rowUuid}`).remove();
      }

      UpdateProductIntoCurrentOrder(nextQuantity, rowUuid);
      updateCartTotals();
    })
};


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
    style:'margin-top:-3rem',
    onerror: "this.style.display='none'",
    alt: p.name
  });
  M('h1', 'h1-modal', M('header', 'main-header', modal)).html(p.name);

  const modalDiv = mkDiv('main-content', modal);
  M('p', 'allergeni' , M('small', '', modalDiv).html(p.description)).html('Allergeni: ' + p.allergens.map(i => i.name).join(', '), {
    maxlength: '200', css: { 'min-height': '0.5rem' }
  });
  const noteText = M('textarea', 'modal-input-note', M('label', '', modalDiv, { id: pid + '_note' }).html(`<strong>Note</strong>`), {
      maxlength: '200',  placeholder: '...', css: { 'min-height': '0.5rem'}
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
  const footer = M('footer', 'main-footer-carrello-small border-shadow', modal);
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
  M('input', 'input-number group-margin modal-input-number', footerDiv, {
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
          const selectedQuantity = parseInt($(`#${pid} .modal-input-number`).val(), 10);
          const cotturaV = $('#' + pid + 'cottura_ option:selected').text();
          const cotturaI = $('#' + pid + 'cottura_ option:selected').val();
          const cottura_id = $('#' + pid + 'cottura_').data().variation_id

          addToCart(p, selectedQuantity, noteText, pid, price, cotturaV, cotturaI);
          closeBtn.click();
      })
      //modal price
  ).html(` &nbsp;&nbsp;&nbsp;€&thinsp;${price}`);

  function placePrice (quantity) {
    price = formatNum(p.price1 * quantity);
    btnPrice.html(` €&thinsp;${price}`)
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
        p_.rowUuid = p.rowUuid;
        p_.cotturaV = p.cotturaV || '';
        const price = p.quantity * p.price1;
        const pid = mkPid(p);
        const template = itemsCarrelloTable(p.name, p.noteText, p.cotturaV, p.quantity, formatNum(price), p.id, p_.rowUuid);
        $('.itens-carrello-table').append(template);
//        $('#carrello-small-items').append(template);

        $(`.input-number-increment-${p_.rowUuid}`).click(function() {
          const rowUuid = $(this).data('row-uuid');
          const $input = $(`.input-number-${rowUuid}`);
          const currentQuantity = parseInt($input.val(), 10);

          $input.val(currentQuantity + 1);
          let nextQuantity = currentQuantity + 1;
          p_.quantity = nextQuantity;
          $(`.prezzo-item-${rowUuid}`).html(formatNum((nextQuantity) * p.price1));

          UpdateProductIntoCurrentOrder(nextQuantity, rowUuid);
          updateCartTotals();
        });

        $(`.input-number-decrement-${p_.rowUuid}`).click(function() {
          const rowUuid = $(this).data('row-uuid');
          const $input = $(`.input-number-${rowUuid}`);
          const currentQuantity = parseInt($input.val(), 10);

          let nextQuantity = currentQuantity - 1;
          if (nextQuantity < 0) {
            nextQuantity = 0;
          }
          $input.val(nextQuantity);
          $(`.prezzo-item-${rowUuid}`).html(formatNum(nextQuantity * p.price1));

          if (nextQuantity === 0) {
              $(`.carrello-row-${rowUuid}`).remove();
          }

          UpdateProductIntoCurrentOrder(nextQuantity, rowUuid);
          updateCartTotals();
        })
      }
    });
  }
  updateCartTotals();
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
  /*
  const d_ = new Date();
  const diff = 15; // minutes
  const d = new Date(d_.getTime() + diff * 60000);
  const h = d.getUTCHours();
  const m = d.getUTCMinutes();
  const o = d.getTimezoneOffset();
  const h_ = h - Math.round(o / 60);
  const t = `${h_}:${m}`;
  */
  const cells = $('.orario-btn');
  cells.each(function () {
    const cell = $(this);
    const text = cell.text();
    const isEnabled = (!window.closedTimeslots.has(text));// && (text > t);
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
