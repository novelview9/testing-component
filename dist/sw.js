if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return f[e]||(c=new Promise(async c=>{if("document"in self){const f=document.createElement("script");f.src=e,document.head.appendChild(f),f.onload=c}else importScripts(e),c()})),c.then(()=>{if(!f[e])throw new Error(`Module ${e} didn’t register its module`);return f[e]})},c=(c,f)=>{Promise.all(c.map(e)).then(e=>f(1===e.length?e[0]:e))},f={require:Promise.resolve(c)};self.define=(c,r,a)=>{f[c]||(f[c]=Promise.resolve().then(()=>{let f={};const i={uri:location.origin+c.slice(1)};return Promise.all(r.map(c=>{switch(c){case"exports":return f;case"module":return i;default:return e(c)}})).then(e=>{const c=a(...e);return f.default||(f.default=c),f})}))}}define("./sw.js",["./workbox-69b5a3b7"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"da39a3ee.ab6284ecc49a0f3cb695.chunk.js",revision:"af4de0e9b32f183f5db6a86af4746043"},{url:"da39a3ee.ab6284ecc49a0f3cb695.chunk.js.LICENSE.txt",revision:"275fe79abee3b697f1673c8bd9c58856"},{url:"favicon.png",revision:"955d4c12b5bf985356fe9ae012bff406"},{url:"framework.5f2bcdadc46ebc4f3041.chunk.js",revision:"b5eb1524de1c325bb2289eb58f2936ea"},{url:"framework.5f2bcdadc46ebc4f3041.chunk.js.LICENSE.txt",revision:"c7c771c7a9ea0b2f7e6b82ef94cc9f76"},{url:"icon_144x144.57f41a9ffa45577ac1b24c2ca12c117d.png",revision:"57f41a9ffa45577ac1b24c2ca12c117d"},{url:"icon_192x192.9317398e5e0fab9cc882c2efb8fdb843.png",revision:"9317398e5e0fab9cc882c2efb8fdb843"},{url:"icon_36x36.86c1b52e1791ea68e3165433e9553667.png",revision:"86c1b52e1791ea68e3165433e9553667"},{url:"icon_48x48.eb26bc385e54af12095e25ffbe95321a.png",revision:"eb26bc385e54af12095e25ffbe95321a"},{url:"icon_512x512.17445a995aafa024872cfa30cebb1699.png",revision:"17445a995aafa024872cfa30cebb1699"},{url:"icon_72x72.e038999565478e512d0edc0d5187df47.png",revision:"e038999565478e512d0edc0d5187df47"},{url:"icon_96x96.0b0e4687104bd4e9a613a88209398ef1.png",revision:"0b0e4687104bd4e9a613a88209398ef1"},{url:"index.html",revision:"d683910f8cc4a76527d26fd26def194c"},{url:"main.f9af46f7cb41c6d90ca7.js",revision:"64f949126924b78b124194f5e014ec22"},{url:"manifest.e9741fff57a995c8219fe41ff56a7009.json",revision:"e9741fff57a995c8219fe41ff56a7009"},{url:"vendors~main.ab283343f731b7de522d.chunk.js",revision:"d66bde2928929147d8884d6617cf07e8"},{url:"vendors~main.ab283343f731b7de522d.chunk.js.LICENSE.txt",revision:"d4b9583852996254d9a5b908c50798f8"}],{})}));