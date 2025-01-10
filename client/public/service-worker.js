// public/service-worker.js

// Evento de instalación del service worker
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    // Aquí puedes agregar lógica para precargar recursos o cachés
});

// Evento de activación del service worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
});

// Evento para manejar las solicitudes de red
self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Si hay una respuesta en caché, devuélvela
            return response || fetch(event.request);
        })
    );
});
