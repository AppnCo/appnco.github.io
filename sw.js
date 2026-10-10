// Service worker App&Co : garde le site consultable hors ligne. Changer le numero a chaque mise en ligne.
const CACHE='appnco-v2';
const FICHIERS=['./','index.html','manifest.json','fonts/Outfit.ttf','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FICHIERS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copie=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copie));return r}).catch(()=>caches.match(e.request)))});
