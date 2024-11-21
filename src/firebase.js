

// firebase.js
import { initializeApp } from '@firebase/app';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyB4UM4oC2TMJVl3bIsG7YnJOlkoDc0M_Eo",
    authDomain: "summer-309f4.firebaseapp.com",
    projectId: "summer-309f4",
    storageBucket: "summer-309f4.firebasestorage.app",
    messagingSenderId: "550218572494",
    appId: "1:550218572494:web:7e7036f1466269739a669f",
    measurementId: "G-YPDE8ZDLHH"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const setupNotifications = async () => {
    try {
        console.log('messaging', messaging);

        // Request permission for notifications
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // Get the FCM token
            const token = await getToken(messaging);
            console.log('FCM Token:', token);
            fetch("http://localhost:6868/api/save-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: token }),
            }).then(response => {
                // This runs if the fetch is successful
                if (!response.ok) {  // Check if response status is OK (2xx)
                    throw new Error('Network response was not ok');
                }
                return response.json();  // Parse the JSON from the response
            })
                .then(data => {
                    // This runs after the first .then() if JSON parsing was successful
                    console.log('1:', data);
                })
                .catch(error => {
                    // This runs if there is any error during the fetch or in the .then() chain
                    console.error('There was a problem with the fetch operation:', error);
                });
        } else {
            console.log('Notification permission denied.');
        }
        // Handle foreground notifications
        onMessage(messaging, (payload) => {
            console.log('Foreground Message 123:', payload);
            // Handle the notification or update your UI
        });
    } catch (error) {
        console.error('Error setting up notifications:', error);
    }
};
export { messaging, setupNotifications };