import { bana, mkCall, testeLambdaPOST } from './utils';

$(document).ready(() => {
  console.log('happen', bana);
  mkCall(
    'POST',
    { action: 'getItems', data: '--' },
    res => {
      mkInterface(res);
    },
    res => {
      showMessage(messageError);
    }
  );
  // testeLambdaPOST();
});

function mkInterface (r) {
  window.rrr = r;
  const d = JSON.parse(r);
  const prods = d.items.results.filter(i => i.option1_value);
  window.ppp = prods;
  mkMenu(prods);
}

function mkMenu (prods) {
  // const menu = $('#menupage-text').html('');
  // $('<div/>', { class: 'small-12 large-8 cell' })
  //   .appendTo(
  //     $('<div/>', { class: 'grid-x grid-margin-x' })
  //   ).appendTo(
  //     $('<div/>', { class: 'grid-container' })
  //   ).appendTo(menu);
  // const sections = ppp.map(i => i.option1_value)
  window.sss = [];
  prods.forEach(p => {
    const secDiv = $(`h2:contains("${p.option1_value}")`).parent().children('.grid-x');
    if (secDiv.length) {
      console.log('trovato!:', p.name);
      mkCell(p, secDiv);
      mkModal(p, secDiv);
    } else {
      console.log('non trovato:', p.name);
    }
    window.sss.push(secDiv);
  });
}

function getImgRoot () {
  const imgURL = 'https://www.beerstrot.it/cavecchia.github.io/assets/img/test/test-immagine1-1-1.jpg';
  const pieces = imgURL.split('/');
  const imgRoot = pieces.slice(0, pieces.length - 1).join('/');
  return imgRoot;
}
const IMG_ROOT = getImgRoot();

function mkCellSmall (p, cell) {
  const pid = p.name.replaceAll(' ', '');
  const pp = mkDiv(
    'product-page',
    mkDiv('hide-for-medium', cell)
  );
  // const imgName = p.name.replaceAll(' ', '') + '_quadrato.png';
  const imgName = 'test-immagine1-1-1.jpg';
  M('img', '', mkDiv('item-image', pp), {
    src: `${IMG_ROOT}/${imgName}`,
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
  const pid = mkPid(p.name);
  const cs = mkDiv(
    'card-section',
    mkDiv(
      'card',
      mkDiv('show-for-medium', cell)
    )
  );
  const imgName = 'test-immagine1-16-9.jpg';
  // const imgName = p.name.replaceAll(' ', '') + '_rettangolare.png';
  M('img', 'show-for-medium', cs, {
    src: `${IMG_ROOT}/${imgName}`,
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
  ).html(p.allergens.map(i => i.name).join(', '));
  M('button', 'button small', cs, {
    type: 'button',
    'data-open': pid
  }).html('Aggiungi al Carrello');
}

function mkModal (p, secDiv) {
  const pid = mkPid(p.name);
  const imgName = 'test-immagine1-16-9.jpg';
  // const imgName = pid + '_rettangolare.png';
  const modal = M('div', 'reveal reveal-ecommerce', secDiv, {
    id: pid
  });
  M('button', 'close-button close-button-sticky', modal, {
    type: 'button',
    'aria-label': 'Close reveal',
  }).append(
    M('span', '', null, { 'aria-hidden': true }).html('&times;')
  ).on('click', () => {
    modal.foundation('close');
  });
  M('img', '', modal, {
    src: `${IMG_ROOT}/${imgName}`,
    alt: p.name
  });
  M('h1', 'h1-modal', M('header', 'main-header', modal)).html(p.name);

  const modalDiv = mkDiv('main-content', modal);
  M('small', 'allergeni', M('p', '', modalDiv).html(p.description)).html(p.allergens.map(i => i.name).join(', '));
  if (hasNote(p)) {
    M('textarea', '', M('label', '', modalDiv), {
      maxlength: '200',  placeholder: '...', css: { 'min-height': '0.5rem' }
    });
  }
  p.variations.forEach(v => {
    const name = v.name;
    if (name === 'note') return;
    const sel = M('select', '', M('label', '', modalDiv).html(`<strong>${name}</strong>`))
    v.variation_values.forEach(vv => {
      M('option', '', sel, { value: vv.value })
    });
  });

  const footer = M('footer', 'main-footer-carrello-small', modal);
  const footerDiv = mkDiv('input-group input-number-group', footer);
  M('i', 'las la-minus-square la-2x',
    M('span', 'input-number-decrement',
      mkDiv('input-group-button group-margin', footerDiv)
    ).click(function() {
      var $input = $(this).parents('.input-number-group').find('.input-number');
      var val = parseInt($input.val(), 10);
      $input.val(val - 1);
    })
  );
  M('input', 'input-number group-margin', footerDiv, {
    css: { width: '3rem' },  type: 'button', value: '2', min: '0', max: '30'
  });
  M('i', 'las la-plus-square la-2x',
    M('span', 'input-number-increment',
      mkDiv('input-group-button group-margin', footerDiv)
    ).click(function() {
      var $input = $(this).parents('.input-number-group').find('.input-number');
      var val = parseInt($input.val(), 10);
      $input.val(val + 1);
    })
  );
  M('span', 'price',
    M('button', 'button expanded-with-padding extra-space-button-modal', footer, { type: 'button' }).html('Aggiungi al carrello')
  ).html(` € ${p.price}`);

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

function mkPid (name) {
  return name.replaceAll(' ', '').replaceAll("'", '');
}

function hasNote(p) {
  return p.variations.map(p => p.name).includes('note');
}
