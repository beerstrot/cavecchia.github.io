"use strict";(self.webpackChunkfoundation_zurb_template=self.webpackChunkfoundation_zurb_template||[]).push([[519],{519:function(t,n,e){e.r(n);var o=e(425),i=e(453);function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function a(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,o)}return e}function c(t,n,e){return(n=function(t){var n=function(t,n){if("object"!==r(t)||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var o=e.call(t,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===r(n)?n:String(n)}(n))in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}$(document).ready((function(){(0,o.X9)("POST",{action:"getItems",data:"--"},(function(t){var n,e;e=t,$("#login-btn").off("click").on("click",(function(){var t={};["email","password"].forEach((function(n){var e;t[e=n]=$("#".concat(e,"-login")).val()})),(0,o.X9)("POST",{action:"login",data:t},(function(t){if(!t.result)return alert(t.details);window.localStorage.currentClient=JSON.stringify(t.details),window.location.href=o.jQ+"/checkout.html"}),(function(t){window.alert("error"),showMessage(messageError)}))})),f(),n=JSON.parse(e).items.results.filter((function(t){return t.option1_value})).filter((function(t){return t.channels.map((function(t){return t.channel_id})).includes("sitoWebAsporto")})).filter((function(t){return t.on_sale})),window.allProducts=n,$("h2").parent().children(".grid-x").html(""),n.forEach((function(t){t.quantity=0;var n=$('h2:contains("'.concat(t.option1_value,'")')).parent().children(".grid-x");n.length?(function(t,n){var e=u("cell cellmann",n);(function(t,n){var e=p(t),o=u("product-page",u("hide-for-medium",n)),i=e+"_quadrato.jpg";s("img","",u("item-image",o),{src:"".concat(l).concat(i),onerror:"this.style.display='none'",alt:t.name});var r=u("item-text",o);s("span","price",s("h3","",r).html(t.name)).html(t.price1),s("p","",r).html(t.description),s("button","button small",u("item-button",o),{type:"button","data-open":e,css:{"margin-bottom":0}}).html("Aggiungi al Carrello")})(t,e),function(t,n){var e=p(t),o=u("card-section",u("card",u("show-for-medium",n))),i=e+"_rettangolare.jpg";s("img","show-for-medium",o,{src:"".concat(l).concat(i),onerror:"this.style.display='none'",alt:t.name}),s("span","price",s("h3","",o).html(t.name)).html(t.price1),s("small","",s("p","",o).html(t.description)).html("Allergeni: "+t.allergens.map((function(t){return t.name})).join(", ")),s("button","button small",o,{type:"button","data-open":e}).html("Aggiungi al Carrello")}(t,e)}(t,n),function(t,n){var e=p(t),o=e+"_rettangolare.jpg",r=s("div","reveal reveal-ecommerce",n,{id:e}),a=s("button","close-button close-button-sticky",r,{type:"button","aria-label":"Close reveal"}).append(s("span","",null,{"aria-hidden":!0}).html("&times;")).on("click",(function(){r.foundation("close")}));s("img","",r,{src:"".concat(l).concat(o),style:"margin-top:-3rem",onerror:"this.style.display='none'",alt:t.name}),s("h1","h1-modal",s("header","main-header",r)).html(t.name);var c=u("main-content",r);s("p","allergeni",s("small","",c).html(t.description)).html("Allergeni: "+t.allergens.map((function(t){return t.name})).join(", "),{maxlength:"200",placeholder:"...",css:{"min-height":"0.5rem"}});var f=s("textarea","",s("label","",c,{id:e+"_note"}),{maxlength:"200",placeholder:"...",css:{"min-height":"0.5rem"}});(function(t){return t.variations.map((function(t){return t.name})).includes("note")})(t)||$("#"+e+"_note").hide();var h=s("select","",s("label","",c,{id:e+"_cottura"}).html("<strong>Cottura</strong>"),{id:e+"cottura_","data-variation_id":d(t)}),v=function(t){var n=t.variations.filter((function(t){return"Cottura"===t.name}))[0];return n?n.variation_values:[]}(t);v.forEach((function(t){s("option","",h,{value:t.id}).html(t.value)})),0===v.length&&$("#"+e+"_cottura").hide();var g=s("footer","main-footer-carrello-small",r),b=u("input-group input-number-group",g),w=1,y=w*t.price1;s("i","las la-minus-square la-2x",s("span","input-number-decrement",u("input-group-button group-margin",b)).click((function(){var t=$(this).parents(".input-number-group").find(".input-number"),n=parseInt(t.val(),10);(w=n-1)<0&&(w=0),t.val(w),S(w)}))),s("input","input-number group-margin",b,{css:{width:"3rem"},type:"button",value:"1",min:"0",max:"20"}),s("i","las la-plus-square la-2x",s("span","input-number-increment",u("input-group-button group-margin",b)).click((function(){var t=$(this).parents(".input-number-group").find(".input-number"),n=parseInt(t.val(),10);w=n+1,t.val(w),S(w)})));var k=s("span","price",s("button","button expanded-with-padding extra-space-button-modal",g,{type:"button"}).html("Aggiungi al carrello").on("click",(function(){if($(".carrello-row-".concat(e)).remove(),t.quantity=w,t.noteText=f.val(),w){var n=$("#"+e+"cottura_ option:selected").text(),o=$("#"+e+"cottura_ option:selected").val();t.cotturaV=n,t.cotturaI=o,t.cotturaId=$("#"+e+"cottura_").data().variation_id;var r=(0,i.v7)(t.name,t.noteText,t.cotturaV,t.quantity,y,e);$(".itens-carrello-table").append(r)}m(),$(".input-number-increment-"+e).click((function(){var n=$(this).parents(".input-number-group").find(".input-number"),o=parseInt(n.val(),10);n.val(o+1),t.quantity=o+1,$(".prezzo-item-"+e).html((o+1)*t.price1),m()})),$(".input-number-decrement-"+e).click((function(){var n=$(this).parents(".input-number-group").find(".input-number"),o=parseInt(n.val(),10)-1;o<0&&(o=0),n.val(o),t.quantity=o,$(".prezzo-item-"+e).html(o*t.price1),m()})),a.click()}))).html(" € ".concat(y));function S(n){y=t.price1*n,k.html(" € ".concat(y))}new Foundation.Reveal(r.foundation())}(t,n)):console.log("sezione non trovata per il prodotto:",t.name)})),$("#carrelloPieno").hide(),$("#carrelloPiccoloPieno").hide(),function(){var t=window.localStorage.currentOrder;if(t){var n=JSON.parse(t);n&&n.forEach((function(t){var n=window.allProducts.filter((function(n){return n.id===t.id}));if(n.length){var e=n[0];e.quantity=t.quantity,e.noteText=t.noteText,e.cotturaV=t.cotturaV||"";var o=t.quantity*t.price1,r=p(t),a=(0,i.v7)(t.name,t.noteText,t.cotturaV,t.quantity,o,r);$(".itens-carrello-table").append(a),$(".input-number-increment-"+r).click((function(){var n=$(this).parents(".input-number-group").find(".input-number"),o=parseInt(n.val(),10);n.val(o+1),e.quantity=o+1,$(".prezzo-item-"+r).html((o+1)*t.price1),m()})),$(".input-number-decrement-"+r).click((function(){var n=$(this).parents(".input-number-group").find(".input-number"),o=parseInt(n.val(),10)-1;o<0&&(o=0),n.val(o),e.quantity=o,$(".prezzo-item-"+r).html(o*t.price1),m()}))}})),m()}}(),f(),(0,o.X9)("POST",{action:"getClosedTimeslots",data:"--"},(function(t){var n,e,o,i,r,a,c,l;window.closedTimeslots=new Set(t),n=new Date,o=(e=new Date(n.getTime()+9e5)).getUTCHours(),i=e.getUTCMinutes(),r=e.getTimezoneOffset(),a=o-Math.round(r/60),c="".concat(a,":").concat(i),(l=$(".orario-btn")).each((function(){var t=$(this),n=t.text(),e=!window.closedTimeslots.has(n)&&n>c;t.attr("disabled",!e),t.on("click",(function(){l.each((function(){$(this).attr("class","button orario-btn").attr("bselected",!1)})),t.attr("class","button orario-btn success").attr("bselected",!0),window.localStorage.timeSlot=n}))})),window.localStorage.timeSlot&&$('button:contains("'.concat(window.localStorage.timeSlot,'")')).click()}),(function(t){showMessage(messageError)})),$("#vai-checkout-large").off("click").on("click",(function(){window.localStorage.currentClient?window.location.href=o.jQ+"/checkout.html":$("#signup-login").foundation("open")})),$("#vai-checkout-small").off("click").on("click",(function(){window.localStorage.currentClient?window.location.href=o.jQ+"/checkout.html":$("#signup-login").foundation("open")}))}),(function(t){showMessage(messageError)}))}));var l=o.jQ+"/assets/img/prod/";function u(t,n){return s("div",t,n)}function s(){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=$("<".concat(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div","/>"),function(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?a(Object(e),!0).forEach((function(n){c(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):a(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}({class:t||""},e||{}));return n&&o.appendTo(n),o}function p(t){return t.name.replaceAll(" ","").replaceAll("'","")}function m(){var t=window.allProducts.filter((function(t){return t.quantity}));window.localStorage.currentOrder=JSON.stringify(t);var n=t.reduce((function(t,n){return t+n.quantity*n.price1}),0);0===n?($("#carrelloPieno").hide(),$("#carrelloVuoto").show(),$("#carrelloPiccoloPieno").hide(),$("#carrelloPiccoloVuoto").show()):($("#carrelloPieno").show(),$("#carrelloVuoto").hide(),$("#carrelloPiccoloPieno").show(),$("#carrelloPiccoloVuoto").hide()),$(".carrello-table-totale").text("€ ".concat(n.toLocaleString()));var e=t.reduce((function(t,n){return t+n.quantity}),0);$(".prod-quantity").text("".concat(e))}function d(t){var n=t.variations.filter((function(t){return"Cottura"===t.name}))[0];if(n)return n.id}function f(){$("#register-btn").off("click").on("click",(function(){var t={};["name","surname","telephone","email","password"].forEach((function(n){var e;t[e=n]=$("#".concat(e)).val()})),t.newsletter=$("#newsletter").is(":checked"),(0,o.X9)("POST",{action:"registerClient",data:t},(function(n){window.alert("Il tuo registro è andato a buon fine."),window.localStorage.currentClient=JSON.stringify(t),window.location.href=o.jQ+"/checkout.html"}),(function(t){showMessage(messageError)}))}))}},453:function(t,n,e){e.d(n,{In:function(){return i},g$:function(){return r},v7:function(){return o}});var o=function(t,n,e,o,i,r){return'\n            <tr class="carrello-row-'.concat(r,'">\n                <td>\n                    <span class="titolo-item">').concat(t,'</span>\n                    <span class="note-item">').concat(n,'</span>\n                    <span class="cottura-item">').concat(e,'</span>\n                </td>\n                <td>\n                    <div class="input-group input-number-group">\n                        <div class="input-group-button">\n                            <span id="input-number-decrement-').concat(r,'" class="input-number-decrement input-number-decrement-').concat(r,'"><i class="las la-minus-square la-lg"></i></span>\n                        </div>\n                        <input class="input-number" style="width:1.5rem; font-size: 0.8rem!important;" type="button" value="').concat(o,'" min="0" max="30">\n                        <div class="input-group-button">\n                            <span id="input-number-increment-').concat(r,'" class="input-number-increment input-number-increment-').concat(r,'"><i class="las la-plus-square la-lg"></i></span>\n                        </div>\n                    </div>\n                </td>\n                <td>\n                    <span class="prezzo-item">€ <span class="prezzo-item-').concat(r,'">').concat(i,"</span></span>\n                </td>\n            </tr>\n")},i=function(t,n,e,o,i){return'\n  \t<div class="checkout-summary-item align-middle">\n\t\t<div class="item-name">\n\t  \t\t<h1 class="titolo-item">'.concat(t,'</h1>\n            <p class="note-item">').concat(n,'</p>\n            <p class="cottura-item">').concat(e,'</p>\n\t  \t\t<p class="note-item">Quantità: ').concat(o,'</p>\n\t\t</div>\n        <div class="item-price">\n            <p class="prezzo-item ">€ ').concat(i,"</p>\n        </div>\n  \t</div>\n")},r=function(t,n){var e=0,o=[];return t.forEach((function(t){e+=parseFloat(t.final_price);var n=t.variations?t.variations[0].value:"";o.push(a(t.name,t.notes,n,t.quantity,t.final_net_price))})),'\n<div class="clearfix">\n  <div id="itens-carrello-checkout">\n    '.concat(o.join("\n"),'\n  </div>\n  \t<div class="checkout-summary-details">\n\t    <div>\n\t      \t<h1 class="titolo-item">TOTALE:</h1>\n\t    </div>\n\t    <div class="item-price">\n\t      \t<h1 class="titolo-item" id="checkout-total">€ ').concat(e.toLocaleString(),'</h1>\n\t    </div>\n\t</div>\n    <button type="button" id="remove-').concat(n,'" class="clear button hollow alert float-left">Elimina</button>\n    <button type="button" id="load-').concat(n,'" class="button submit float-right" hidden>Metti nel carrello e modifica</button>\n</div>\n')},a=function(t,n,e,o,i){return'\n<div class="checkout-summary-item align-middle">\n  <div class="item-name">\n    <h1 class="titolo-item">'.concat(t,'</h1>\n    <p class="note-item">').concat(n,'</p>\n    <p class="cottura-item">').concat(e,'</p>\n    <p class="note-item">Quantità: ').concat(o,'</p>\n  </div>\n  <div class="item-price">\n    <p class="prezzo-item ">€ ').concat(i,"</p>\n  </div>\n</div>\n")}}}]);