(self["webpackChunkfoundation_zurb_template"] = self["webpackChunkfoundation_zurb_template"] || []).push([["src_assets_js_prenota_js"],{

/***/ "./src/assets/js/prenota.js":
/*!**********************************!*\
  !*** ./src/assets/js/prenota.js ***!
  \**********************************/
/***/ (function() {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

$(document).ready(function () {
  var url = new URL(window.location.href);
  var pid = url.searchParams.get('id');

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

function makeInterface_(pid) {
  mkCall('POST', {
    action: 'days',
    data: '--'
  }, function (res) {
    if (pid) {
      var pid_ = pid.split('_modifica')[0];
      var fp = makeInterface(pid_, res.dates);
      modifyReservation(pid_, fp);
    } else {
      makeInterface(undefined, res.dates);
    }
  }, function (res) {
    showMessage(messageError);
  });
}

var loadExtra = function loadExtra(booking) {
  var e = JSON.parse(booking.extra);
  return e;
};

function modifyReservation(pid, fp) {
  mkCall('POST', {
    action: 'getReservation',
    data: pid
  }, function (res) {
    $('#ttitle').text('Modica la Prenotazione');
    $('<p/>').text('La prenotazione viene modificata solo quando clicchi il pulsante "Modifica Prenotazione"').insertAfter('#ttitle');
    $('#prenota').text('Modifica Prenotazione');
    var b = res.booking;
    var bc = b.booking_customer;
    var extra = loadExtra(b);
    var date = new Date(b.booked_for);
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
  }, function (res) {
    showMessage("".concat(messageError, "\n        La ID della prenotazione \xE8: ").concat(pid, "."));
  });
} // beerstrot-prod:


var url = 'https://6nw3zi6sbkph6dledhd4op3mvq0aaduw.lambda-url.eu-central-1.on.aws/'; // const url = 'http://localhost:5001/entry';

var pCount = 0;

function mkCall(type, data, success, error) {
  if (!['POST', 'GET'].includes(type)) return console.log("this ajax method is not good: ".concat(type));
  var set = {
    crossDomain: true,
    url: url,
    type: type,
    data: data,
    success: success,
    error: error,
    beforeSend: function beforeSend() {
      pCount++;
      $('#loading').show();
    },
    complete: function complete() {
      if (--pCount === 0) $('#loading').hide();
    }
  };

  if (type === 'POST') {
    set.data = JSON.stringify(set.data);

    if (url.split('/').reverse()[0] === 'entry') {
      set.contentType = 'application/json; charset=utf-8';
    }
  }

  $.ajax(set);
}

function testeLambdaPOST() {
  mkCall('POST', {
    action: 'test',
    data: {
      hey: 'man',
      nums: [5, 6, 7],
      jac: {
        33: 44,
        l: ['asd', 'ewq', 66]
      }
    }
  }, function (res) {
    return console.log('POST success:', res);
  }, function (res) {
    return console.log('POST error:', res);
  });
}

function testeLambdaGET() {
  mkCall('GET', {
    action: 'test',
    data: 'a get arg'
  }, function (res) {
    return console.log('GET success:', res);
  }, function (res) {
    return console.log('GET error:', res);
  });
}

function testeLambda() {
  testeLambdaGET();
  testeLambdaPOST();
}

function showDays(datetime) {
  $('#form').hide();
  $('#notesTable').hide();
  $('#notesDiv').show().css('margin-bottom', '10%');
  $('#innerNotesDiv').css('margin-top', '0%');
  $('#ttitle').text('Giorni di Chiusura');
  $('#yes').text('Aggiungi/rimuovi');
  $('#no').text('Non aggiungere/rimuovere');
  mkCall('POST', {
    action: 'days',
    data: datetime || '--'
  }, function (res) {
    var r = res;
    $('#innerNotesDiv').html('<b>Giorni di chiusura:</b><br>' + r.dates.join('<br>')); //jQuery('#from2').flatpickr({

    var fp = $('#from2').flatpickr({
      minDate: 'today',
      locale: 'it',
      dateFormat: 'd/M/Y',
      disableMobile: true,
      onChange: function onChange(dp, input) {
        dp[0].setHours(12);
        toggleDate(dp[0]);
      }
    });
  }, function (res) {
    showMessage(messageError);
  });
}

function toggleDate(dp) {
  var date_ = new Date(dp).toLocaleString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  showConsultaMessage("<p>Sei sicuro di voler aggiungere o rimuovere <b>".concat(date_, "</b> come giorno di chiusura?</p>\n    <p style=\"margin-bottom:0px;\">Se lo aggiungi</b> ai giorni di chiusura:</p><ul><li>Tutte le prenotazione per  <b>").concat(date_, "</b> saranno cancellate</li><li>I clienti prenotati <b>").concat(date_, "</b> riceveranno l'email di chiusura e cancellazione della prenotazione</li>\n    </ul><p style=\"margin-bottom:0px;\">Se lo rimuovi dai giorni di chiusura:</p><ul><li>I clienti potranno prenotare per il giorno <b>").concat(date_, "</b></li></ul>"), '', function () {
    var date = dp.toISOString();
    showDays(date);
    $('#close-modal').click();
  }, function () {
    return $('#close-modal').click();
  }, true);
}

function showNotes(datetime) {
  $('#ttitle').text('Dashboard');
  $('#loading').show();
  $('#form').hide();
  $('#notesDiv').show();
  $('#innerNotesDiv').show();
  $('.clearme').remove();
  datetime = datetime || new Date().toISOString();
  mkCall('GET', {
    action: 'notes',
    data: datetime
  }, function (res) {
    var r = JSON.parse(res);
    var date = new Date(r.date).toLocaleString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    var tables = {};
    r.rooms.forEach(function (r) {
      r.tables.forEach(function (t) {
        tables[t.id] = t.name;
      });
    });
    var shifts = r.shifts.reduce(function (a, i) {
      a[i.id] = i;
      a[i.id].bookings = [];
      a[i.id].obookings = [];
      return a;
    }, {});
    shifts.anon = {
      name: 'anon',
      bookings: []
    }; //jQuery('#from2').flatpickr({

    var fp = $('#from2').flatpickr({
      locale: 'it',
      dateFormat: 'd/M/Y',
      disableMobile: true,
      onChange: function onChange(dp, input) {
        dp[0].setHours(12);
        showNotes(dp[0].toISOString());
      }
    });
    var b = r.bookings;
    var nbookings = b.length;
    if (!nbookings) return showNotesMessage("<b>".concat(date, "</b> non ci sono prenotazioni."));
    var nseggiolini = 0;
    var ncani = 0;
    var notes = [];
    var data = [];
    b.forEach(function (i, ii) {
      try {
        var n = loadExtra(i);
        if (!('seggiolini' in n)) return;
        notes.push(n);
        i.notes_ = n;
        shifts[i.shift_id].obookings.push(i);
        var s = Number(n.seggiolini);
        var c = Boolean(n.cani);
        nseggiolini += s;
        ncani += c;
        var bc = i.booking_customer;
        data.push({
          name: bc.first_name + ' ' + bc.last_name,
          people: i.people,
          table: i.tables.reduce(function (a, i) {
            a.push(tables[i.table_id]);
            return a;
          }, []).join(', '),
          telephone: n.telephone || '',
          email: n.email || '',
          time: new Date(i.booked_for).toLocaleString('it-it', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          cani: c ? 'SI' : '',
          seg: s == 0 ? '' : s,
          note: n.note
        });
      } catch (e) {
        if (i.shift_id === null) return shifts.anon.bookings.push(i);
        shifts[i.shift_id].bookings.push(i);
      }
    });
    data.sort(function (a, b) {
      return a.time < b.time ? -1 : 1;
    }).forEach(function (n) {
      var tr = $('<tr/>', {
        class: 'clearme'
      }).appendTo('#notesTableBody');
      $('<td/>', {
        css: {
          'text-align': 'left'
        }
      }).html(n.name).appendTo(tr);
      $('<td/>', {
        css: {
          'text-align': 'right'
        }
      }).html(n.people).appendTo(tr);
      $('<td/>').html(n.table).appendTo(tr);
      $('<td/>', {
        css: {
          'text-align': 'left'
        }
      }).html(n.telephone).appendTo(tr);
      $('<td/>', {
        css: {
          'text-align': 'left'
        }
      }).html(n.email).appendTo(tr);
      $('<td/>', {
        css: {
          'text-align': 'left'
        }
      }).html(n.time).appendTo(tr);
      $('<td/>').html(n.cani).appendTo(tr);
      $('<td/>', {
        css: {
          'text-align': 'right'
        }
      }).html(n.seg).appendTo(tr);
      $('<td/>', {
        css: {
          'text-align': 'left'
        }
      }).html(n.note).appendTo(tr);
    });
    var sentences = [];
    var total_ = 0;

    for (k in shifts) {
      var s = shifts[k];
      if (k === 'anon') continue;
      s.people_online = s.obookings.reduce(function (a, ss) {
        return a + ss.people;
      }, 0);
      s.people_hand = s.bookings.reduce(function (a, ss) {
        return a + ss.people;
      }, 0);
      var total = s.people_online + s.people_hand;
      total_ += total;
      if (total === 0) continue;
      var tr = $('<tr/>', {
        class: 'clearme'
      }).appendTo('#shiftsTableBody');
      $('<td/>', {
        css: {
          'text-align': 'left'
        }
      }).html(s.name).appendTo(tr);
      $('<td/>', {
        css: {
          'text-align': 'right'
        }
      }).html(total).appendTo(tr);
      $('<td/>', {
        css: {
          'text-align': 'right'
        }
      }).html(s.people_online).appendTo(tr);
      $('<td/>', {
        css: {
          'text-align': 'right'
        }
      }).html(s.people_hand).appendTo(tr);
    }

    shifts.anon.bookings.forEach(function (b) {
      var _getBookingTimes = getBookingTimes(b, true),
          t = _getBookingTimes.t,
          t2 = _getBookingTimes.t2;

      var tr = $('<tr/>', {
        class: 'clearme'
      }).appendTo('#anonTableBody');
      $('<td/>', {
        css: {
          'text-align': 'left'
        }
      }).html(t).appendTo(tr);
      $('<td/>', {
        css: {
          'text-align': 'left'
        }
      }).html(t2).appendTo(tr);
      $('<td/>', {
        css: {
          'text-align': 'right'
        }
      }).html(b.people).appendTo(tr);
      $('<td/>', {
        css: {
          'text-align': 'left'
        }
      }).html(b.tables.reduce(function (a, i) {
        a.push(tables[i.table_id]);
        return a;
      }, []).join(', ')).appendTo(tr);
      total_ += b.people;
    });
    var summary = "<ul class=\"no-bullet\"><b>".concat(date, "</b> ci sono:<li><b>").concat(nbookings, "</b> prenotazioni (<b>").concat(notes.length, "</b> online)</li><li><b>").concat(total_, "</b> persone prenotate</li><li><b>").concat(ncani, "</b> prenotazioni con cani</li><li><b>").concat(nseggiolini, "</b> seggioloni richiesti</li></ul>");
    $('<p/>', {
      class: 'clearme',
      css: {
        padding: ''
      }
    }).html(summary).prependTo('#innerNotesDiv1');

    if (notes.length > 0) {
      $('<button/>', {
        class: 'clearme button small',
        css: {
          marginBottom: '3rem',
          marginTop: '0rem'
        }
      }).prependTo('#innerNotesDiv2').text('Invia email di promemoria a clienti').off('click').on('click', function () {
        showConsultaMessage('<p>Vuoi inviare email di promemoria della prenotazione ai clienti?</p>', 'giorno: ' + date, function () {
          return mkCall('POST', {
            action: 'promemoria',
            data: datetime
          }, function (res) {
            showMessage('Email inviate');
          }, function (res) {
            showMessage(messageError);
          });
        }, function () {
          return $('#close-modal').click();
        }, true);
      });
    }
  }, function (res) {
    showMessage(messageError);
  });
}

function makeInterface(pid, dates) {
  $('#infoDiv').hide();
  $('#prenota').off('click').on('click', function () {
    var d = fp.selectedDates[0];
    d.setHours(12);
    var data = {
      date: d.toISOString(),
      shiftId: $($('.aShift').filter(function (i, ii) {
        return $(ii).attr('bselected') == 'true';
      })[0]).attr('bindex'),
      href: window.location.href,
      cani: $('#cani').is(':checked'),
      seggiolini: $('#seggiolini').val()
    };
    ['name', 'surname', 'telephone', 'email', 'quantity', 'obs'].forEach(function (id) {
      data[id] = $("#".concat(id)).val();
    });
    validateData(data, validation).then(function (r) {
      if (!r) return;

      if (pid) {
        // user is modifying, cancel previous reservation:
        data.oldID = pid.split('_')[0];
      }

      mkCall('POST', {
        action: 'mkReservation',
        data: data
      }, function (res) {
        if (res.reservationID2 === 'noPlacesLeft') {
          return showMessage("In questo turno siamo al completo.");
        }

        var u = window.location.href;
        u = u[u.length - 1] == '/' ? u : u.split('/').reverse().slice(1).reverse().join('/') + '/';
        var url = u + 'consulta.html?id=' + res.reservationID2;
        window.location.href = url + (pid ? '_modificata' : '');
      }, function (res) {
        showMessage(messageError);
      });
    });
  }); // https://flatpickr.js.org/

  var fp = $('#from').flatpickr({
    locale: 'it',
    minDate: 'today',
    dateFormat: 'Y-m-d',
    disable: dates || [],
    disableMobile: true,
    onChange: function onChange(dp, input) {
      $('#loading').show();
      fp.close();
      dp[0].setHours(12);
      updateShifts(dp[0]);
    }
  });
  fp.set('dateFormat', 'd/M/Y');
  $('#privacy2').on('click', function () {
    showMessage('I dati vengono utilizzati solo per gestire la prenotazione e contattarti tramite email (assicurati non finisca nella spam) o telefono in caso di problemi o chiusura inaspettata del locale (ad esempio causa maltempo).');
  }); //form validation

  var validation = new JustValidate('#form').addField('#name', [{
    rule: 'required',
    errorMessage: 'inserisci un nome'
  }]).addField('#surname', [{
    rule: 'required',
    errorMessage: 'inserisci un cognome'
  }]).addField('#telephone', [{
    rule: 'required',
    errorMessage: 'inserisci un telefono'
  }]).addField('#from', [{
    rule: 'required',
    errorMessage: 'scegli una data'
  }]).addField('#quantity', [{
    rule: 'required',
    errorMessage: 'scegli il numero di persone'
  }]).addField('#privacy', [{
    rule: 'required',
    errorMessage: 'è necessario accettare la privacy'
  }]).addField('#shiftGridL', [{
    rule: 'required',
    errorMessage: 'seleziona il turno.',
    validator: function validator() {
      var shiftId = $($('.aShift').filter(function (i, ii) {
        return $(ii).attr('bselected') == 'true';
      })[0]).attr('bindex');
      var res = shiftId !== undefined;
      return res;
    }
  }]).addField('#email', [{
    rule: 'required',
    errorMessage: 'inserisci un\'e-mail'
  }, {
    rule: 'email',
    errorMessage: 'L\'e-mail non è valida!'
  }]);
  return fp;
}

var weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function updateShifts(dp, selected, people) {
  $('.bShift').remove();
  var data = {
    day: dp.getDate(),
    month: dp.getMonth(),
    year: dp.getYear() + 1900
  };
  mkCall('POST', {
    action: 'getShifts',
    data: data
  }, function (res) {
    var pad0 = function pad0(i) {
      return String(i).padStart(2, '0');
    };

    var d = "".concat(data.year, "-").concat(pad0(data.month + 1), "-").concat(pad0(data.day));
    var wd = weekdays[dp.getDay()];
    var shifts_ = res.shifts.filter(function (s) {
      return s.end_period >= d && s.start_period <= d && s.weekdays_period.includes(wd);
    });
    if (shifts_.length === 0) return showMessage("Nei mesi da Settembre a Maggio siamo aperti dal Gioved\xEC alla Domenica.<br><br>Per richieste potete contattarci tramite ".concat(messengerString));
    var shifts = mkShiftButtons(shifts_, selected);
    mkQuantityOptions(shifts, people);
  }, function (res) {
    return showMessage(messageError);
  });
}

function mkShiftButtons(shifts, selected) {
  var sButtons = [];
  var removeShifts = [];
  shifts.forEach(function (s, i) {
    var max_available = s.online_seats_limit - s.booked_seats_in_shift;

    if (max_available <= 0) {
      return removeShifts.push(i);
    }

    for (table in s.tables) {
      if (s.tables[table] > max_available) {
        delete s.tables[table];
      }
    }

    s.table_sizes = Object.values(s.tables);

    if (s.table_sizes.length === 0) {
      return removeShifts.push(i);
    }

    var id = 'aShift' + i;
    s.bid = '#' + id;
    var b = $('<a/>', {
      id: id,
      class: 'button aShift'
    }).text(s.name).appendTo($('<div/>', {
      class: 'cell  bShift'
    }).appendTo('#shiftGrid'));
    b.bcolor = b.css('background-color');
    b.attr('bindex', s.id);
    sButtons.push(b);
  });
  removeShifts.reverse().forEach(function (i) {
    return shifts.splice(i, 1);
  });
  if (shifts.length === 0) showMessage('In questa data siamo al completo.');
  sButtons.forEach(function (b) {
    b.click(function () {
      sButtons.forEach(function (bb) {
        bb.attr('bselected', false);
        if (bb.css('pointer-events') !== 'none') bb.css('background', bb.bcolor);
      });
      b.css('background', '#0088a4');
      b.attr('bselected', true);
    });
  });

  if (selected) {
    $($('.aShift').filter(function (i, ii) {
      return $(ii).attr('bindex') == selected;
    })[0]).click();
  }

  return shifts;
}

function showReservation(pid) {
  $('#new').hide();
  $('.form').hide();
  $('#prenotaDiv').show();
  var modified = false;

  if (pid.endsWith('_modificata')) {
    $('#ttitle').text('Prenotazione Modificata. Grazie');
    $('#tlegend').text('Dettaglio prenotazione modificata');
    pid = pid.split('_modifica')[0];
  }

  mkCall('POST', {
    action: 'getReservation',
    data: pid
  }, function (res) {
    if (res.booking === null) {
      $('#yes').hide();
      $('#no').hide();
      return showConsultaMessage('Prenotazione non trovata.', "Se non hai cancellato la prenotazione in precedenza, puoi scriverci tramite ".concat(messengerString, " o chiamarci al numero ").concat(telString, " per chiarimenti."));
    }

    presentReservation(res.booking);
  }, //se ti serve tienilo, ma nascondilo a tutti gli altri. non è user friendly e se un cliente ci chiama e ci da il pid noi non sappiamo cosa rispondere...
  function (res) {
    showMessage("".concat(messageError, "\n        La ID della prenotazione \xE8: ").concat(pid, "."));
  });
}

function presentReservation(r) {
  if (!r || 'error' in r) return bookingNotFound(); // $('#ttitle').text('La tua Prenotazione :-)');

  var bc = r.booking_customer;
  var extra = loadExtra(r); // const date = new Date(r.booked_for);
  // const date2 = new Date(date.getTime() + r.duration * 60000);

  var _getBookingTimes2 = getBookingTimes(r),
      date = _getBookingTimes2.date,
      date2 = _getBookingTimes2.date2;

  var h = function h(id, info) {
    return $('#' + id).text(info);
  };

  h('name', bc.first_name + ' ' + bc.last_name);
  h('telephone', extra.telephone);
  h('email', extra.email);
  h('day', date.toLocaleString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));
  h('time1', time(date));
  h('time2', time(date2));
  h('people', r.people);
  h('note', extra.note);
  var s = extra.seggiolini;
  h('segg', s == 0 ? 'No' : s);
  h('dog', extra.cani ? 'Sì' : 'No');
  $('#modify').click(function () {
    var pid = new URL(window.location.href).searchParams.get('id').split('_modificata')[0] + '_modifica';
    window.location.href = window.location.href.split('/').reverse().slice(1).reverse().join('/') + '/riserva-un-tavolo.html?id=' + pid;
  });
  var pid = r.id;
  $('#cancel').click(function () {
    showConsultaMessage('Vuoi cancellare la prenotazione?', '', function () {
      $('#close-modal').click();
      mkCall('POST', {
        action: 'cancelReservation',
        data: pid
      }, function (res) {
        $('#ttitle').text('Prenotazione Cancellata. Grazie');
        $('#tlegend').text('Dettaglio prenotazione cancellata ');
        $('#modify').hide();
        $('#cancel').hide();
        $('#new').show();
      }, function (res) {
        showMessage("".concat(messageError, "\n              La ID della prenotazione \xE8: ").concat(pid, "."));
      });
    }, function () {
      $('#close-modal').click();
    });
  });
}

function validateEmail(email) {
  return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

;

function validateData(data, validation) {
  return validation.revalidate().then(function () {
    // $('.error').attr('style', 'border: solid 1px #ccc');
    // $('.error1').hide()
    // $('#notification').hide();
    var messages = [];
    var ids = [];

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
    } // if (!$('#privacy').prop('checked')) {
    //   ids.push('#privacy3');
    // }


    if (ids.length > 0) {
      ids.forEach(function (i) {
        return showError(i);
      }); // asdoiajds = aosidjasid
      // showMessage(messages.join('<br>'));

      return false;
    }

    return true;
  });
}

function showMessage(message) {
  $('#modalLead').html(message);
  var popup = new Foundation.Reveal($('#myModal'));
  popup.open();
}

var telString = '<a href="tel:+390718853384"><span itemprop="telephone"> 071&nbsp;8853384</span></a>';
var messengerString = '<a target="_blank" href="https://m.me/cavecchiabeerstrot"> Facebook Messenger</a>';
var message10 = "Per <b>13 o pi\xF9 persone</b>, vi preghiamo di contattarci tramite ".concat(messengerString, " o telefonarci al numero ").concat(telString);
/*const messageError = `Si prega di riprovare perché abbiamo riscontrato un errore.<br>
Se il problema persiste, ti consigliamo di 
entrare nel ${messengerString} o di chiamare ${telString}.<br>`;*/

var messageError = "<h2>Il Server non \xE8 raggiungibile</h2><p>Riprova fra qualche istante e assicurati di avere campo nel cellulare o internet funzionante da computer. Grazie.</p><li class=\"no-bullet\">Se il problema persiste:<ul class=\"disc\"><li>Scrivici su ".concat(messengerString, "</li><li>Chiamaci al numero ").concat(telString, "</li></ul></li>");

function bookingNotFound() {
  var div = $('#innerInfoDiv');
  var fs = $('<fieldset/>').appendTo(div);
  $('<legend/>').text('Prenotazione non trovata').appendTo(fs);
  $('<div/>').html("<p>Ti chiediamo gentilmente di contattarci.</p>").appendTo(fs);
  $('<div/>').html(telString).appendTo(fs);
  $('<div/>').html(messengerString).appendTo(fs);
  $('#buttonInfoDiv').hide();
}

function showNotesMessage(msg) {
  $('<p/>', {
    class: 'clearme',
    css: {
      background: '',
      padding: ''
    }
  }).html(msg).appendTo('#notesDiv3');
  $('#innerNotesDiv').hide();
}

function showConsultaMessage(message, message2, callYes, callNo, index) {
  $('#yes').off('click').on('click', callYes);
  $('#no').off('click').on('click', callNo);
  $('#modalLead2').html(message);
  $('#modalText').html(message2);
  var $modal = new Foundation.Reveal($('#myModal' + (index ? '2' : '')));
  $modal.open();
}

function mkQuantityOptions(shifts, people) {
  // find biggest table
  var biggestTable = shifts.reduce(function (m, s) {
    return Math.max.apply(Math, [m].concat(_toConsumableArray(s.table_sizes)));
  }, 0); // make options reaching it

  $('.aquantity').remove();

  _toConsumableArray(Array(biggestTable).keys()).forEach(function (i) {
    $('<option/>', {
      value: i + 1,
      class: 'aquantity'
    }).text(i + 1).appendTo('#quantity');
  });

  $('#quantity').prop('disabled', false); // enable select

  var cssOn = {
    'pointer-events': '',
    cursor: 'pointer',
    background: '#00687E'
  };
  var cssOff = {
    'pointer-events': 'none',
    cursor: 'default',
    background: 'rgba(0,104,126, 0.2)'
  };
  $('#quantity').off('input').on('input', function () {
    var v = Number($(this).val());
    shifts.forEach(function (s, i) {
      var tablesOk = s.table_sizes.filter(function (t) {
        return t >= v;
      });
      var css = tablesOk.length === 0 ? cssOff : cssOn;
      $(s.bid).css(css).attr('bselected', false);
    }); // should not happen because if a quantity is available
    // there is a shift with a table for it:

    var totalDisabled = shifts.reduce(function (c, ss) {
      var isDisabled = $(ss.bid).css('pointer-events') === 'none';
      return c + isDisabled;
    }, 0);
    if (totalDisabled === shifts.length) return showMessage(message10);
    $('#notification').hide();
  });

  if (people) {
    $('#quantity').val(people);
  }
}

function showError(id) {
  $(id.replace('1', '')).attr('style', 'border: 2px solid red !important');
}

var time = function time(d) {
  return d.toLocaleString('it-IT', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

function getBookingTimes(b, timed) {
  var date = new Date(b.booked_for);
  var date2 = new Date(date.getTime() + b.duration * 60000);

  if (timed) {
    return {
      t: time(date),
      t2: time(date2)
    };
  }

  return {
    date: date,
    date2: date2
  };
}

/***/ })

}]);
//# sourceMappingURL=src_assets_js_prenota_js.js.map