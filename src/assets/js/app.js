import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;






require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
// import './lib/foundation-explicit-pieces';


$(document).foundation();


import('./navbar');
import('./input-number');
import('./prenota');
//import('./accordion');
import Splide from '@splidejs/splide';
import { Video } from '@splidejs/splide-extension-video';




// inizialize splide
new Splide( '#fotoMenu' , {
    type: 'slide',
    perPage: 1,
    arrows: true,
    pagination: true,
    drag: true,
    breakpoints: {
        '740': {
            pagination: true,
            arrows: true,
        },
    },
    video: {
        loop: false,
        autoplay     : true,
        mute         : true,
        playerOptions: {
            htmlVideo: {
                playsInline: true,
                autoplay: true,
            },
            youtube: {
            },
        },
    },
}).mount({ Video });

new Splide( '#fotoLocale' , {
    type: 'slide',
    gap: '2rem',
    arrows: true,
    pagination: true,
    drag: true,
    perPage: 2,
    breakpoints : {
        '740': {
            perPage: 1,
            arrows: true,
        },
    },
    video: {
        loop: false,
        autoplay     : true,
        mute         : true,
        playerOptions: {
            htmlVideo: {
                playsInline: true,
                autoplay: true,

            },
            youtube: {
            },
        },
    },
}).mount({ Video });

