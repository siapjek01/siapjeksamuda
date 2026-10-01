importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB_Ndbf9idBUkMb5aNU-Bc8qZIEVI90Ddk",
  authDomain: "siapjek-8d69c.firebaseapp.com",
  databaseURL: "https://siapjek-8d69c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "siapjek-8d69c",
  messagingSenderId: "179086099100"
});

const messaging = firebase.messaging();

// Tangkap event Push langsung dari sistem (Sangat ampuh saat layar mati)
self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: "🔔 Pesanan Baru Masuk!", body: event.data.text() };
    }
  }

  // Ekstrak judul & isi teks notifikasi
  const title = data.notification?.title || data.data?.title || data.title || "🔔 Pesanan Baru SiapJek!";
  const options = {
    body: data.notification?.body || data.data?.body || data.body || "Ada pesanan baru masuk, buka portal untuk memproses!",
    icon: "/icon.png",
    badge: "/badge.png",
    vibrate: [500, 200, 500, 200, 500, 200, 800], // Pola getar panjang saat hp mati
    tag: 'siapjek-order-notif',
    renotify: true,
    requireInteraction: true, // Notifikasi tetap menempel di layar HP sampai ditanggapi
    data: data.data || {}
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handler bawaan FCM background
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Background Message Received:', payload);
  const title = payload.notification?.title || payload.data?.title || "🔔 Pesanan Baru SiapJek!";
  const options = {
    body: payload.notification?.body || payload.data?.body || "Ada pesanan baru masuk!",
    icon: "/icon.png",
    vibrate: [500, 200, 500],
    requireInteraction: true,
    data: payload.data || {}
  };

  return self.registration.showNotification(title, options);
});

// Ketika notifikasi di layar HP diklik oleh mitra
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url.includes('/') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
