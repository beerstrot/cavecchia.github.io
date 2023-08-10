const itemsCarrelloTable = (name, note, cottura, quantity, price, pid) => {
  return `
            <tr class="carrello-row-${pid}">
                <td>
                    <span class="titolo-item">${name}</span>
                    <span class="note-item">${note}</span>
                    <span class="cottura-item">${cottura}</span>
                </td>
                <td>
                    <div class="input-group input-number-group">
                        <div class="input-group-button">
                            <span id="input-number-decrement-${pid}" class="input-number-decrement input-number-decrement-${pid}"><i class="las la-minus-square la-lg"></i></span>
                        </div>
                        <input class="input-number" style="width:1.5rem; font-size: 0.8rem!important;" type="button" value="${quantity}" min="0" max="30">
                        <div class="input-group-button">
                            <span id="input-number-increment-${pid}" class="input-number-increment input-number-increment-${pid}"><i class="las la-plus-square la-lg"></i></span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="prezzo-item">€&thinsp;<span class="prezzo-item-${pid}">${price}</span></span>
                </td>
            </tr>
`;
};

const itemsCarrelloCheckout = (name, note, cottura, quantity, price) => {
  return `
  	<div class="checkout-summary-item align-middle">
		<div class="item-name">
	  		<h1 class="titolo-item">${name}</h1>
            <p class="note-item">${note}</p>
            <p class="cottura-item">${cottura}</p>
	  		<p class="note-item">Quantità: ${quantity}</p>
		</div>
        <div class="item-price">
            <p class="prezzo-item">€&thinsp;${price}</p>
        </div>
  	</div>
`
};

const carrelloCheckoutUser = (carrello, count) => {
  let total = 0;
  const prods = [];
  carrello.forEach(prod => {
    total += parseFloat(prod.final_price);
    const cottura = prod.variations ? prod.variations[0].value : '';
    prods.push(
      carrelloProd(
        prod.name,
        prod.notes,
        cottura,
        prod.quantity,
        prod.final_net_price
      )
    );
  });
  return `
<div class="clearfix">
  <div id="itens-carrello-checkout">
    ${prods.join('\n')}
  </div>
  	<div class="checkout-summary-details">
	    <div>
	      	<h1 class="titolo-item">TOTALE:</h1>
	    </div>
	    <div class="item-price">
	      	<h1 class="titolo-item" id="checkout-total">€&ensp;${total.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2})}</h1>
	    </div>
	</div>
    <button type="button" id="remove-${count}" class="clear button hollow alert float-left">Elimina</button>
    <button type="button" id="load-${count}" class="button submit float-right" hidden>Metti nel carrello e modifica</button>
</div>
`
};

const carrelloProd = (name, notes, cottura, quantity, price) => {
  return `
<div class="checkout-summary-item align-middle">
  <div class="item-name">
    <h1 class="titolo-item">${name}</h1>
    <p class="note-item">${notes}</p>
    <p class="cottura-item">${cottura}</p>
    <p class="note-item">Quantità: ${quantity}</p>
  </div>
  <div class="item-price">
    <p class="prezzo-item ">€&thinsp;${price}</p>
  </div>
</div>
`

}

export { itemsCarrelloTable, itemsCarrelloCheckout, carrelloCheckoutUser };
