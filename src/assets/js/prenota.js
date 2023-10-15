import { bana, mkCall, testeLambda } from './utils';

$(document).ready(() => {
  const url = new URL(window.location.href);
  const pid = url.searchParams.get('id');
  if (pid) {
    if (pid === 'notes') {
      return showNotes();
    } else if (pid === 'days') {
      return showDays();
    } else if (pid === 'test') {
      return testeLambda();
    } else if (pid.endsWith('_modifica')) {
      return makeInterface_(pid);
    }
    return showReservation(pid);
  }
  makeInterface_();
});

function makeInterface_ (pid) {
  mkCall(
    'POST',
    { action: 'days', data: '--' },
    res => {
      if (pid) {
        const pid_ = pid.split('_modifica')[0];
        const fp = makeInterface(pid_, res.dates);
        modifyReservation(pid_, fp);
      } else {
        makeInterface(undefined, res.dates);
      }
    },
    res => {
      showMessage(messageError);
    }
  );
}

const loadExtra = booking => {
  const e = JSON.parse(booking.extra);
  return e;
}

function modifyReservation (pid, fp) {
  mkCall(
    'POST',
    { action: 'getReservation', data: pid },
    res => {
      $('#ttitle').text('Modifica la Prenotazione');
      $('<p/>').text('La prenotazione viene modificata solo quando clicchi il pulsante "Modifica Prenotazione"')
        .insertAfter('#ttitle');
      $('#prenota').text('Modifica Prenotazione');
      const b = res.booking;
      const bc = b.booking_customer;
      const extra = loadExtra(b);
      const date = new Date(b.booked_for);
      fp.setDate(date);
      $('#quantity').prop('disabled', false).val(b.people);
      updateShifts(date, b.shift_id, b.people);
      $('#obs').val(extra.note === '--' ? '' : extra.note);
      $('#seggiolini').val(extra.seggiolini);
      $('#cani').prop('checked', extra.cani);
      $('#name').val(bc.first_name);
      $('#surname').val(bc.last_name);
      $('#email').val(extra.email);
      $('#telephone').val(extra.telephone);
    },
    res => {
      showMessage(`${messageError}
        La ID della prenotazione è: ${pid}.`);
    }
  );
}

function showDays (datetime) {
  $('#form').hide();
  $('#notesTable').hide();
  $('#notesDiv').show().css('margin-bottom', '10%');
  $('#innerNotesDiv').css('margin-top', '0%');
  $('#ttitle').text('Giorni di Chiusura');
  $('#yes').text('Aggiungi/rimuovi');
  $('#no').text('Non aggiungere/rimuovere');
  mkCall(
    'POST',
    { action: 'days', data: datetime || '--' },
    res => {
      const r = res;
      $('#innerNotesDiv').html('<b>Giorni di chiusura:</b><br>' + r.dates.join('<br>'));
      //jQuery('#from2').flatpickr({
      const fp = $('#from2').flatpickr({
        minDate: 'today',
        locale: 'it',
        dateFormat:'d/M/Y',
        disableMobile: true,
        onChange: (dp, input) => {
          dp[0].setHours(12);
          toggleDate(dp[0]);
        },
      });
    },
    res => {
      showMessage(messageError);
    }
  );
}

function toggleDate (dp) {
  const date_ = (new Date(dp)).toLocaleString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  showConsultaMessage(`<p>Sei sicuro di voler aggiungere o rimuovere <b>${date_}</b> come giorno di chiusura?</p>
    <p style="margin-bottom:0px;">Se lo aggiungi</b> ai giorni di chiusura:</p><ul><li>Tutte le prenotazione per  <b>${date_}</b> saranno cancellate</li><li>I clienti prenotati <b>${date_}</b> riceveranno l'email di chiusura e cancellazione della prenotazione</li>
    </ul><p style="margin-bottom:0px;">Se lo rimuovi dai giorni di chiusura:</p><ul><li>I clienti potranno prenotare per il giorno <b>${date_}</b></li></ul>`,'',
    () => {
      const date = dp.toISOString();
      showDays(date);
      $('#close-modal').click();
    },
    () => $('#close-modal').click(),
    true,
  );
}

function showNotes (datetime) {
  $('#ttitle').text('Dashboard');
  $('#loading').show();
  $('#form').hide();
  $('#notesDiv').show();
  $('#innerNotesDiv').show();
  $('.clearme').remove();
  datetime = datetime || new Date().toISOString();
  mkCall(
    'GET',
    { action: 'notes', data: datetime },
    res => {
      const r = JSON.parse(res);
      const date = (new Date(r.date)).toLocaleString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const tables = {};
      r.rooms.forEach(r => {
        r.tables.forEach(t => {
          tables[t.id] = t.name;
        });
      });
      const shifts = r.shifts.reduce((a, i) => {
        a[i.id] = i;
        a[i.id].bookings = [];
        a[i.id].obookings = [];
        return a;
      }, {});
      shifts.anon = { name: 'anon', bookings: [] };
      //jQuery('#from2').flatpickr({
      const fp = $('#from2').flatpickr({
        locale: 'it',
        dateFormat:'d/M/Y',
        disableMobile: true,
        onChange: (dp, input) => {
          dp[0].setHours(12);
          showNotes(dp[0].toISOString());
        },
      });

      const b = r.bookings;
      const nbookings = b.length;
      if (!nbookings) return showNotesMessage(`<b>${date}</b> non ci sono prenotazioni.`);

      let nseggiolini = 0;
      let ncani = 0;
      const notes = [];
      const data = [];
      b.forEach((i, ii) => {
        try {
          const n = loadExtra(i);
          if (!('seggiolini' in n))
            return
          notes.push(n);
          i.notes_ = n;
          shifts[i.shift_id].obookings.push(i)
          const s = Number(n.seggiolini);
          const c = Boolean(n.cani);
          nseggiolini += s;
          ncani += c;
          const bc = i.booking_customer;
          data.push({
            name: bc.first_name + ' ' + bc.last_name,
            people: i.people,
            table: i.tables.reduce((a, i) => {
              a.push(tables[i.table_id]);
              return a;
            }, []).join(', '),
            telephone: n.telephone || '',
            email: n.email || '',
            time: new Date(i.booked_for).toLocaleString('it-it', { hour: '2-digit', minute:'2-digit' }),
            cani: c ? 'SI' : '',
            seg: s == 0 ? '' : s,
            note: n.note
          });
        } catch (e) {
          if (i.shift_id === null)
            return shifts.anon.bookings.push(i);
          shifts[i.shift_id].bookings.push(i);
        }
      });
      data.sort((a, b) => a.time < b.time ? -1 : 1).forEach(n => {
        const tr = $('<tr/>', { class: 'clearme' }).appendTo('#notesTableBody');
        $('<td/>', { css: { 'text-align': 'left' } }).html(n.name).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'right' } }).html(n.people).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'left' } }).html(n.table).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'left' } }).html(n.time).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'center' } }).html(n.cani).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'right' } }).html(n.seg).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'left', 'white-space': 'normal', 'min-width':'200px', } }).html(n.note).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'left' } }).html(n.telephone).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'left' } }).html(n.email).appendTo(tr);

      });
      const sentences = [];
      let total_ = 0;
      for (const k in shifts) {
        const s = shifts[k];
        if (k === 'anon') continue;
        s.people_online = s.obookings.reduce((a, ss) => a + ss.people, 0);
        s.people_hand = s.bookings.reduce((a, ss) => a + ss.people, 0);
        const total = s.people_online + s.people_hand;
        total_ += total;
        if (total === 0) continue
        const tr = $('<tr/>', { class: 'clearme' }).appendTo('#shiftsTableBody');
        $('<td/>', { css: { 'text-align': 'left'  } }).html(s.name).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'right' } }).html(total).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'right' } }).html(s.people_online).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'right' } }).html(s.people_hand).appendTo(tr);
      }
      shifts.anon.bookings.forEach(b => {
        const { t, t2 } = getBookingTimes(b, true);
        const tr = $('<tr/>', { class: 'clearme' }).appendTo('#anonTableBody');
        $('<td/>', { css: { 'text-align': 'left'  } }).html(t).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'left'  } }).html(t2).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'right' } }).html(b.people).appendTo(tr);
        $('<td/>', { css: { 'text-align': 'left'  } }).html(
          b.tables.reduce((a, i) => {
            a.push(tables[i.table_id]);
            return a;
          }, []).join(', ')
        ).appendTo(tr)
        total_ += b.people;
      });
      const summary = `<ul class="no-bullet"><b>${date}</b> ci sono:<li><b>${nbookings}</b> prenotazioni (<b>${notes.length}</b> online)</li><li><b>${total_}</b> persone prenotate</li><li><b>${ncani}</b> prenotazioni con cani</li><li><b>${nseggiolini}</b> seggioloni richiesti</li></ul>`;
      $('<p/>', { class: 'clearme', css: { padding: '' } }).html(summary).prependTo('#innerNotesDiv1');
      if (notes.length > 0) {
        $('<button/>', { class: 'clearme button small', css: { marginBottom: '3rem', marginTop: '0rem' } })
          .prependTo('#innerNotesDiv2')
          .text('Invia email di promemoria a clienti')
          .off('click')
          .on('click', () => {
            showConsultaMessage(
              '<p>Vuoi inviare email di promemoria della prenotazione ai clienti?</p>',
              'giorno: ' + date,
              () => mkCall(
                'POST',
                { action: 'promemoria', data: datetime },
                res => {
                  showMessage('Email di promemoria inviate ai clienti');
                },
                res => {
                  showMessage(messageError);
                }
              ),
              () => $('#close-modal').click(),
              true,
            );
          });

      }
    },
    res => {
      showMessage(messageError);
    }
  );
}

function makeInterface (pid, dates) {
  $('#infoDiv').hide();
  $('#prenota').off('click').on('click', () => {
    const d = fp.selectedDates[0];
    d.setHours(12);
    const data = {
      date: d.toISOString(),
      shiftId: $($('.aShift').filter((i, ii) => $(ii).attr('bselected') == 'true')[0]).attr('bindex'),
      href: window.location.href,
      cani: $('#cani').is(':checked'),
      seggiolini: $('#seggiolini').val()
    };
    [
      'name',
      'surname',
      'telephone',
      'email',
      'quantity',
      'obs',
    ].forEach(id => { data[id] = $(`#${id}`).val() });
    validateData(data, validation).then(r => {
      if (!r) return;
      if (pid) { // user is modifying, cancel previous reservation:
        data.oldID = pid.split('_')[0];
      }
      mkCall(
        'POST',
        { action: 'mkReservation', data },
        res => {
          if (res.reservationID2 === 'noPlacesLeft') {
            return showMessage(`In questo turno siamo al completo.`);
          }
          let  u = window.location.href;
          u = u[u.length - 1] == '/' ? u : (u.split('/').reverse().slice(1).reverse().join('/') + '/');
          const url = u + 'consulta.html?id=' + res.reservationID2;
          window.location.href = url + (pid ? '_modificata' : '');
        },
        res => {
          showMessage(messageError);
        }
      );
    });
  });

  // https://flatpickr.js.org/
  const fp = $('#from').flatpickr({
    locale: 'it',
    minDate: 'today',
    dateFormat:'Y-m-d',
    disable: dates || [],
    disableMobile: true,
    onChange: (dp, input) => {
      $('#loading').show();
      fp.close();
      dp[0].setHours(12);
      updateShifts(dp[0]);
    },
  });
  fp.set('dateFormat', 'd/M/Y');
  // $('#privacy2').on('click', () => {
  //   showMessage();
  // });

  //form validation
  const validation = new JustValidate('#form')
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'inserisci un nome'
      }
    ])
    .addField('#surname', [
      {
        rule: 'required',
        errorMessage: 'inserisci un cognome'
      }
    ])
    .addField('#telephone', [
      {
        rule: 'required',
        errorMessage: 'inserisci un numero di telefono'
      }
    ])
    .addField('#from', [
      {
        rule: 'required',
        errorMessage: 'scegli una data'
      }
    ])
    .addField('#quantity', [
      {
        rule: 'required',
        errorMessage: 'scegli il numero di persone'
      }
    ])
    .addField('#privacy', [
      {
        rule: 'required',
        errorMessage: 'è necessario accettare l\'Informativa sulla privacy'
      }
    ])
    .addField('#shiftGridL', [
      {
        rule: 'required',
        errorMessage: 'seleziona un turno',
        validator: () => {
          const shiftId = $($('.aShift').filter((i, ii) => $(ii).attr('bselected') == 'true')[0]).attr('bindex');
          const res = shiftId !== undefined;
          return res;
        }
      }
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'inserisci un\'email',
      },
      {
        rule: 'email',
        errorMessage: 'L\'email non è valida!',
      },
    ]);
  return fp;
}

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
function updateShifts (dp, selected, people) {
  $('.bShift').remove();
  const data = {
    day: dp.getDate(),
    month: dp.getMonth(),
    year: dp.getYear() + 1900
  };
  mkCall(
    'POST',
    { action: 'getShifts', data },
    res => {
      const pad0 = i => String(i).padStart(2, '0');
      const d = `${data.year}-${pad0(data.month + 1)}-${pad0(data.day)}`;
      const wd = weekdays[dp.getDay()];
      const shifts_ = res.shifts.filter(s => (s.end_period >= d) && (s.start_period <= d) && (s.weekdays_period.includes(wd)));
      if (shifts_.length === 0)
        return showMessage(`<p>In questa data siamo chiusi.</p><p>Per richieste puoi scriverci in chat ${whatsAppString}.</p><p>Grazie</p>`);
      const shifts = mkShiftButtons(shifts_, selected);
      mkQuantityOptions(shifts, people);
    },
    res => showMessage(messageError)
  );
}

function mkShiftButtons (shifts, selected) {
  const sButtons = [];
  const removeShifts = [];
  shifts.forEach((s, i) => {
    const max_available = s.online_seats_limit - s.booked_seats_in_shift;
    if (max_available <= 0) {
      return removeShifts.push(i);
    }
    for (const table in s.tables) {
      if (s.tables[table] > max_available) {
        delete s.tables[table];
      }
    }
    s.table_sizes = Object.values(s.tables);
    if (s.table_sizes.length === 0) {
      return removeShifts.push(i);
    }
    const id = 'aShift' + i;
    s.bid = '#' + id;
    const b = $('<a/>', { id, class: 'button aShift' })
      .text(s.name)
      .appendTo(
        $('<div/>', { class: 'cell  bShift' })
          .appendTo('#shiftGrid')
      );
    b.bcolor = b.css('background-color');
    b.attr('bindex', s.id);
    sButtons.push(b);
  });
  removeShifts.reverse().forEach(i => shifts.splice(i, 1));
  if (shifts.length === 0)
      showMessage('In questa data siamo al completo.');
  sButtons.forEach(b => {
    b.click(() => {
      sButtons.forEach(bb => {
        bb.attr('bselected', false);
        if (bb.css('pointer-events') !== 'none')
          bb.css('background', bb.bcolor);
      });
      b.css('background', '#18813B');
      b.attr('bselected', true);
    });
  });
  if (selected) {
    $($('.aShift').filter((i, ii) => $(ii).attr('bindex') == selected)[0]).click();
  }
  return shifts;
}

function showReservation (pid) {
  $('#new').hide();
  $('.form').hide();
  $('#prenotaDiv').show();
  let modified = false;
  if (pid.endsWith('_modificata')) {
    $('#ttitle').text('Prenotazione Modificata. Grazie');
    $('#tlegend').text('Dettaglio prenotazione modificata');
    pid = pid.split('_modifica')[0];
  }
  mkCall(
    'POST',
    { action: 'getReservation', data: pid },
    res => {
      if (res.booking === null) {
        $('#yes').hide();
        $('#no').hide();
        return showConsultaMessage('Prenotazione non trovata.', `Se non hai cancellato la prenotazione in precedenza, puoi scriverci in chat ${whatsAppString} o chiamarci al numero ${telString} per chiarimenti.`);
      }
      presentReservation(res.booking);
    },
   //se ti serve tienilo, ma nascondilo a tutti gli altri. non è user friendly e se un cliente ci chiama e ci da il pid noi non sappiamo cosa rispondere...
    res => {
      showMessage(`${messageErrorAlreadyCancelled}
        La ID della prenotazione è: ${pid}.`);
    }
  );
}



function presentReservation (r) {
  if ((!r) || 'error' in r) return bookingNotFound();
  // $('#ttitle').text('La tua Prenotazione :-)');
  const bc = r.booking_customer;
  const extra = loadExtra(r);

  // const date = new Date(r.booked_for);
  // const date2 = new Date(date.getTime() + r.duration * 60000);
  const { date, date2 } = getBookingTimes(r);

  const h = (id, info) => $('#' + id).text(info);
  h('name', bc.first_name + ' ' + bc.last_name);
  h('telephone', extra.telephone);
  h('email', extra.email);
  h('day', date.toLocaleString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  h('time1', time(date));
  h('time2', time(date2));
  h('people', r.people);
  h('note', extra.note);
  const s = extra.seggiolini;
  h('segg', s == 0 ? 'No' : s);
  h('dog', extra.cani ? 'Sì' : 'No');
  $('#modify').click(() => {
    const pid = new URL(window.location.href).searchParams.get('id').split('_modificata')[0] + '_modifica';
    window.location.href = window.location.href.split('/').reverse().slice(1).reverse().join('/') + '/riserva-un-tavolo.html?id=' + pid;
  });
  $('#new').click(() => {
     window.location = 'https://www.beerstrot.it/riserva-un-tavolo.html';
  });
  const pid = r.id;
  $('#cancel').click(() => {
    showConsultaMessage(
      'Vuoi cancellare la prenotazione?',
      '',
      () => {
        $('#close-modal').click();
        mkCall(
          'POST',
          { action: 'cancelReservation', data: pid },
          res => {
            $('#ttitle').text('Prenotazione Cancellata. Grazie');
            $('#tlegend').text('Dettaglio prenotazione cancellata ');
            $('#modify').hide();
            $('#cancel').hide();
            $('#new').show();
          },
          res => {
            showMessage(`${messageError}
              La ID della prenotazione è: ${pid}.`);
          }
        );
      },
      () => {
        $('#close-modal').click();
      }
    );
  });
}

function validateEmail (email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function validateData (data, validation) {
  return validation.revalidate().then(() => {
    // $('.error').attr('style', 'border: solid 1px #ccc');
    // $('.error1').hide()
    // $('#notification').hide();
    const messages = [];
    const ids = [];
    if (!$('#from').val()) {
      ids.push('#from');
    }
    if (data.date === '') {
      ids.push('#from1');
    }
    if (data.quantity == 0) {
      ids.push('#quantity1');
    }
    if (data.shiftId === undefined) {
      ids.push('#shiftGrid1');
    }
    if (data.name === '') {
      ids.push('#name1');
    }
    if (data.surname === '') {
      ids.push('#surname1');
    }
    if (!validateEmail(data.email)) {
      ids.push('#email1');
    }
    if (data.telephone === '') {
      ids.push('#telephone1');
    }
    if (!$('#privacy').prop('checked')) {
      ids.push('#privacy3');
    }
    if (ids.length > 0) {
      ids.forEach(i => showError(i));
      // asdoiajds = aosidjasid
      // showMessage(messages.join('<br>'));
      return false;
    }
    return true;
  });
}

function showMessage (message) {
  $('#modalLead').html(message);
  var popup = new Foundation.Reveal($('#myModal'));
  popup.open();
}

const telString = '<a href="tel:+390718853384"><span itemprop="telephone"> 071&nbsp;8853384</span></a>';

const emailString = '<a href="mailto:info@beerstrot.it?subject=Problema&nbsp;Prenotazione">info@beerstrot.it</a>';

const whatsAppString = '<a href="https://api.whatsapp.com/send?phone=390718853384" class="highlight" target="_blank"><i class="lab la-whatsapp">&thinsp;Whatsapp</i></a>';

const message10 = `Per <b>17 o più persone</b>, ti preghiamo di contattarci tramite ${whatsAppString} o telefonarci al numero ${telString}`;

/*const messageError = `Si prega di riprovare perché abbiamo riscontrato un errore.<br>
Se il problema persiste, ti consigliamo di 
entrare nel ${emailString} o di chiamare ${telString}.<br>`;*/

const messageError = `<h2>Il Server non è raggiungibile</h2><p>Riprova fra qualche istante e assicurati di avere campo nel cellulare o internet funzionante da computer. Grazie.</p><ul class="no-bullet"><li>Se il problema persiste:</li><ul><li>Scrivici in chat ${whatsAppString}</li><li>Chiamaci al numero ${telString}</li></ul></li></ul>`;

//const messageErrorAlreadyCancelled = `<h2>Prenotazione non trovata</h2><ul class="no-bullet"><li>Se non hai cancellato la prenotazione in precedenza, per chiarimenti puoi:</li><ul><li>Scriverci una email a ${emailString}</li><li>Chiamarci al numero ${telString}</li></ul></li></ul><p>Grazie</p>`;

function bookingNotFound () {
  const div = $('#innerInfoDiv');
  const fs = $('<fieldset/>').appendTo(div);
  $('<legend/>').text('Prenotazione non trovata').appendTo(fs);
  $('<div/>').html(`<p>Ti chiediamo gentilmente di contattarci.</p>`).appendTo(fs);
  $('<div/>').html(telString).appendTo(fs);
  $('<div/>').html(whatsAppString).appendTo(fs);
  $('#buttonInfoDiv').hide();
}

function showNotesMessage (msg) {
  $('<p/>', { class: 'clearme', css: { background: '', padding: '' } }).html(msg).appendTo('#notesDiv3');
  $('#innerNotesDiv').hide();
}

function showConsultaMessage (message, message2, callYes, callNo, index) {
  $('#yes').off('click').on('click', callYes);
  $('#no').off('click').on('click', callNo);
  $('#modalLead2').html(message);
  $('#modalText').html(message2);
  var $modal = new Foundation.Reveal($('#myModal' + (index ? '2' : '')));
  $modal.open();
}

function mkQuantityOptions (shifts, people) {
  // find biggest table
  const biggestTable = shifts.reduce((m, s) => Math.max(m, ...s.table_sizes), 0);
  // make options reaching it
  $('.aquantity').remove();
  [...Array(biggestTable).keys()]
    .forEach(i => {
      $('<option/>', { value: i + 1, class: 'aquantity' })
        .text(i + 1).appendTo('#quantity');
    });
  $('#quantity').prop('disabled', false)
  // enable select
  const cssOn = { 'pointer-events': '', cursor: 'pointer', background: '#00687E' };
  const cssOff = { 'pointer-events': 'none', cursor: 'default', background: 'rgba(0,104,126, 0.2)' };
  $('#quantity').off('input').on('input', function() {
    const v = Number($(this).val());
    shifts.forEach((s, i) => {
      const tablesOk = s.table_sizes.filter(t => t >= v);
      const css = tablesOk.length === 0 ? cssOff : cssOn;
      $(s.bid).css(css).attr('bselected', false);
    });
    // should not happen because if a quantity is available
    // there is a shift with a table for it:
    const totalDisabled = shifts.reduce((c, ss) => {
      const isDisabled =  $(ss.bid).css('pointer-events') === 'none';
      return c + isDisabled;
    }, 0); 
    if (totalDisabled === shifts.length) return showMessage(message10);
    $('#notification').hide();
  });
  if (people) {
    $('#quantity').val(people);
  }
}

function showError (id) {
  $(id.replace('1', '')).attr('style', 'border: 1px solid red !important');
}

const time = d => d.toLocaleString('it-IT', { hour: '2-digit', minute:'2-digit' });
function getBookingTimes (b, timed) {
  const date = new Date(b.booked_for);
  const date2 = new Date(date.getTime() + b.duration * 60000);
  if (timed) {
    return { t: time(date), t2: time(date2) };
  }
  return { date, date2 };
}
