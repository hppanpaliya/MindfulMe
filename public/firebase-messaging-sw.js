importScripts("https://www.gstatic.com/firebasejs/9.6.8/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.8/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyBoYFYMaOR6z-E1fHZ3Ou8xKRUC84O8-J0",
    authDomain: "cs-545-71c1d.firebaseapp.com",
    databaseURL: "https://cs-545-71c1d-default-rtdb.firebaseio.com",
    projectId: "cs-545-71c1d",
    storageBucket: "cs-545-71c1d.appspot.com",
    messagingSenderId: "664659226539",
    appId: "1:664659226539:web:a73a21377a49508eeb2cee",
    measurementId: "G-B6HE8TJS10"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message: ", payload);

  const notificationData = payload.data; // Use the data property instead of notification
  const notificationTitle = notificationData.title;
  const notificationOptions = {
    body: notificationData.body,
    icon: notificationData.icon || "/logo192.png",
  };

  // Show the notification
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
