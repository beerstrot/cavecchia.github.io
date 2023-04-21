const mesi = 'gennaio, febbraio, marzo, aprile, maggio, giugno, luglio, agosto, settembre, ottobre, novembre, dicembre'.split(', ');
const weekdays = 'Domenica - Lunedì - Martedì - Mercoledì - Giovedì - Venerdì - Sabato'.split(' - ');

$(document).ready(() => {
  console.log('heay how');
  const { lastOrder, timeSlot, currentClient } = window.localStorage;
  $('#time1').html(timeSlot);

  const client = JSON.parse(currentClient);
  const name = client.name + ' ' + client.surname;
  $('#name').html(name);
  $('#email').html(client.email);
  $('#telephone').html(client.telephone);

  const order = JSON.parse(lastOrder);
  window.order = order;
  const d = new Date(order.deliver_at);

  const wd = weekdays[d.getDay()];
  const day = d.getDate();
  const month = mesi[d.getMonth()];
  const year = d.getFullYear();
  $('#day').html(`${wd}, ${day} ${month} ${year}`);


  const lastOrderTitle = `Ordine del ${d.getDate()} ${mesi[d.getMonth()]} ${d.getFullYear()}`;
  $('#order-title').html(lastOrderTitle);

});
