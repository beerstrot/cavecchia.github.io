window.addEventListener('load', function(){
	// obtain plugin
	var cookieconsent = initCookieConsent();

	// run plugin with your configuration
	cookieconsent.run({
		// autoclear_cookies: false,                   // default: false
		// page_scripts: false,                        // default: false
		current_lang: 'it',
		// mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
		// delay: 0,                               // default: 0
		// auto_language: '',                      // default: null; could also be 'browser' or 'document'
		// autorun: true,                          // default: true
		// force_consent: false,                   // default: false
		// hide_from_bots: true,                   // default: true
		// remove_cookie_tables: false             // default: false
		// cookie_name: 'cc_cookie',               // default: 'cc_cookie'
		// cookie_expiration: 182,                 // default: 182 (days)
		// cookie_necessary_only_expiration: 182   // default: disabled
		// cookie_domain: location.hostname,       // default: current domain
		// cookie_path: '/',                       // default: root
		// cookie_same_site: 'Lax',                // default: 'Lax'
		// use_rfc_cookie: false,                  // default: false
		revision: 0.15,                          // default: 0
		page_scripts: true,
		autoclear_cookies: true,

		onFirstAction: function(user_preferences, cookie){
			// callback triggered only once on the first accept/reject action
		},

		onAccept: function (cookie) {
			// callback triggered on the first accept/reject action, and after each page load
		},

		onChange: function (cookie, changed_categories) {
			// callback triggered when user changes preferences after consent has already been given
		},

		// gui_options: {
		//     consent_modal: {
		//         layout: 'box',               // box/cloud/bar
		//         position: 'middle right',     // bottom/middle/top + left/right/center
		//         transition: 'zoom',           // zoom/slide
		//         swap_buttons: false            // enable to invert buttons
		//     },
		//     settings_modal: {
		//         // layout: 'box',                 // box/bar
		//         // // position: 'left',           // left/right
		//         // transition: 'zoom'            // zoom/slide
		//     }
		// },

		languages: {
			'it': {
				consent_modal: {
					title: 'Utilizziamo cookie!',
					description: 'Questo sito web utilizza cookies strettamente necessari e altri non necessari per offrirti maggiori servizi e una migliore esperienza nell\'uso del sito. <button type="button" data-cc="c-settings" class="cc-link">Preferenze cookie</button>',
					primary_btn: {
						text: 'Accetta tutti',
						role: 'accept_all'              // 'accept_selected' or 'accept_all'
					},
					secondary_btn: {
						text: 'Rifiuta tutti',
						role: 'accept_necessary'        // 'settings' or 'accept_necessary'
					}
				},
				settings_modal: {
					title: 'Preferenze dei cookie',
					save_settings_btn: 'Salva preferenze',
					accept_all_btn: 'Accetta tutti',
					reject_all_btn: 'Rifiuta tutti',
					close_btn_label: 'Chiudi',
					cookie_table_headers: [
						{col1: 'Nome'},
						{col2: 'Dominio'},
						{col3: 'Scadenza'},
						{col4: 'Descrizione'}
					],
					blocks: [
						{
							title: 'Utilizzo dei cookie',
							description: 'Utilizziamo i cookie per assicurare le funzionalità di base del sito e per rendere più gradevole la tua esperienza. Puoi scegliere di disabilitare i cookie non strettamente necessari quando vuoi. Per maggiori dettagli sui cookie e sulla privacy, ti preghiamo di leggere le nostre informazioni legali a questo <a class="cc-link" href="{{root}}informazioni-legali.html">link</a>.'
						}, {
							title: 'Cookie strettamente necessari',
							description: 'Sono i cookie necessari per il corretto funzionamento del sito o servizio e non possono essere disattivati nei nostri sistemi.',
							toggle: {
								value: 'necessary',
								enabled: true,
								readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
							},
							cookie_table: [             // list of all expected cookies
								{
									col1: 'cc_cookie',
									col2: 'beerstrot.it',
									col3: '6 mesi',
									col4: 'Installato da Ca\' Vecchia Beerstrot: registra il consenso o rifiuto dell\'utente all\'utilizzo dei cookie.',
									is_regex: true
								}
							]
						}, {
							title: 'Cookie analitici',
							description: 'Questi cookie ci permettono di contare le visite e le sorgenti di traffico; in questo modo possiamo valutare e migliorare la performance del nostro sito e dei nostri servizi digitali.',
							toggle: {
								value: 'analytics',     // your cookie category
								enabled: true,
								readonly: false
							},
							cookie_table: [             // list of all expected cookies
								{
									col1: '^_ga',       // match all cookies starting with "_ga"
									col2: 'google.com',
									col3: '2 anni',
									col4: 'Installato da Google Analytics: calcola i dati di visitatori, sessioni e campagne e tiene anche dell\'utilizzo del sito per il report di analisi del sito. Il cookie memorizza le informazioni in modo anonimo e assegna un numero generato casualmente per riconoscere i visitatori unici.',
									is_regex: true
								},
								{
									col1: '_gid',
									col2: 'google.com',
									col3: '1 giorno',
									col4: 'Installato da Google Analytics: memorizza informazioni su come i visitatori utilizzano un sito web, creando anche un report analitico delle prestazioni del sito web. Alcuni dei dati raccolti includono il numero di visitatori, la loro fonte e le pagine che visitano in modo anonimo.',
								}
							]
						}, {
							title: 'Cookie funzionali',
							description: 'Questi cookie consentono al sito web o al servizio di offrire personalizzazione e funzionalità avanzate: ad esempio riprendere un ordine di asporto salvato e utilizzarlo per un nuovo ordine. Se non accetti questi cookie, i servizi (o una parte di essi) non funzioneranno correttamente.',
							toggle: {
								value: 'functional',     // your cookie category
								enabled: true,
								readonly: false
							},
							cookie_table: [             // list of all expected cookies
								// {
								//     col1: '^_ga',       // match all cookies starting with "_ga"
								//     col2: 'google.com',
								//     col3: '2 anni',
								//     col4: 'Installato da Google Analytics: calcola i dati di visitatori, sessioni e campagne e tiene anche dell\'utilizzo del sito per il report di analisi del sito. Il cookie memorizza le informazioni in modo anonimo e assegna un numero generato casualmente per riconoscere i visitatori unici.',
								//     is_regex: true
								// },
								// {
								//     col1: '_gid',
								//     col2: 'google.com',
								//     col3: '1 giorno',
								//     col4: 'Installato da Google Analytics: memorizza informazioni su come i visitatori utilizzano un sito web, creando anche un report analitico delle prestazioni del sito web. Alcuni dei dati raccolti includono il numero di visitatori, la loro fonte e le pagine che visitano in modo anonimo.',
								// }
							]
						}, {
							title: 'Cookie di profilazione',
							description: 'Questi cookie consentono di analizzare le preferenze manifestate dall\'utente nell\'ambito della navigazione in rete. Grazie a questa analisi è possibile inviare messaggi pubblicitari specifici in linea con le preferenze stesse degli utenti.',
							toggle: {
								value: 'targeting',
								enabled: true,
								readonly: false
							},
							cookie_table: [             // list of all expected cookies
								{
									col1: 'fbp',       // match all cookies starting with "_ga"
									col2: 'facebook.com',
									col3: '7 giorni',
									col4: 'Installato da Meta pixel: monitorale interazioni degli utenti con le campagne pubblicitarie su Facebook Ads e con il sito web. Nello specifico, si possono seguire le interazioni degli utenti con il sito web dopo che gli stessi utenti hanno visualizzato l’annuncio sul social network',
									is_regex: true
								}
							]
						}, {
							title: 'Maggiori informazioni',
							description: 'Per maggiori informazioni su come utilizziamo i cookie e sulle tue scelte, ti preghiamo di contattarci al seguente indirizzo email <a class="cc-link" href="mailto:info@beerstrot.it?subject=Cookie&nbsp;e&nbsp;scelta&nbsp;dei&nbsp;cookie">info@beerstrot.it</a>.',
						}
					]
				}
			}
		}
	});
});