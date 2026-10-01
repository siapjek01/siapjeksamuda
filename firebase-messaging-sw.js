importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Inisialisasi Firebase dengan konfigurasi projek SiapJek
firebase.initializeApp({
  apiKey: "AIzaSyB_Ndbf9idBUkMb5aNU-Bc8qZIEVI90Ddk",
  authDomain: "siapjek-8d69c.firebaseapp.com",
  databaseURL: "https://siapjek-8d69c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "siapjek-8d69c"
});

const messaging = firebase.messaging();

// Menangani notifikasi yang masuk saat aplikasi ditutup / di latar belakang
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Notifikasi diterima di background: ', payload);

  const notificationTitle = payload.notification?.title || 'SiapJek Notifikasi';
  const notificationOptions = {
    body: payload.notification?.body || 'Ada pembaruan pesanan baru!',
    icon: 'https://cdn-icons-png.flaticon.com/512/3097/3097180.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3097/3097180.png',
    vibrate: [200, 100, 200]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});