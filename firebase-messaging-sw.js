importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB_Ndbf9idBUkMb5aNU-Bc8qZIEVI90Ddk",
  authDomain: "siapjek-8d69c.firebaseapp.com",
  databaseURL: "https://siapjek-8d69c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "siapjek-8d69c"
});

const messaging = firebase.messaging();

// Menagani notifikasi di latar belakang / layar terkunci
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'SiapJek Update 🛵';
  const body = payload.notification?.body || 'Ada pembaruan pada pesanan Anda.';
  const orderId = payload.data?.orderId || 'siapjek_order';

  const notificationOptions = {
    body: body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3097/3097180.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3097/3097180.png',
    vibrate: [300, 100, 300, 100, 500],
    requireInteraction: true, // Notifikasi tetap melayang di layar sampai di-klik
    tag: orderId, // MENGGANTIKAN (REPLACE) notifikasi status lama dengan yang baru
    data: {
      url: '/'
    }
  };

  self.registration.showNotification(title, notificationOptions);
});
