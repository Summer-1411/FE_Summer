importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Cấu hình Firebase, dùng cùng cấu hình như bạn đã sử dụng trong src/firebase.js
const firebaseConfig = {
    apiKey: "AIzaSyB4UM4oC2TMJVl3bIsG7YnJOlkoDc0M_Eo",
    authDomain: "summer-309f4.firebaseapp.com",
    projectId: "summer-309f4",
    storageBucket: "summer-309f4.firebasestorage.app",
    messagingSenderId: "550218572494",
    appId: "1:550218572494:web:7e7036f1466269739a669f",
    measurementId: "G-YPDE8ZDLHH"
};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// Customize background notification handling here
messaging.onBackgroundMessage((payload) => {
    console.log('Background Message:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});