// src/serviceWorkerRegistration.js

// Este código opcional se utiliza para registrar un service worker.
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' || // Dirección IPv6 localhost
  window.location.hostname.match(/^127(?:\.\d+){0,2}\.\d+$/) // Direcciones IPv4 localhost
);

export function register(config) {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return; // Evita registrar el service worker si la URL pública no coincide con la de la página
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Si está en localhost, verifica si el service worker existe
        checkValidServiceWorker(swUrl, config);
      } else {
        // No está en localhost, simplemente registra el service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Hay nuevo contenido disponible; pide al usuario que actualice
              console.log('Nuevo contenido disponible; por favor actualiza.');
            } else {
              console.log('Contenido almacenado en caché para uso offline.');
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error durante el registro del service worker:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No se encontró el service worker. Probablemente es una aplicación diferente.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload(); // Recarga la página
          });
        });
      } else {
        // Se encontró el service worker. Regístralo.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => console.log('No se encontró conexión a internet. La aplicación está funcionando en modo offline.'));
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
}
