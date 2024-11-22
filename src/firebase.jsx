

// firebase.js
import { initializeApp } from '@firebase/app';
import { getMessaging, getToken, onMessage } from '@firebase/messaging';
import { request } from './requestMethod';
import { toastOptionRight } from './constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from 'antd';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';
import useCurrentUser from './hooks/useCurrentUser';


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
const useSetupNotifications = () => {
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser()
    useEffect(() => {
        const setupNotifications = async () => {
            try {
                // Request permission for notifications
                const permission = await Notification.requestPermission();

                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                    // Get the FCM token
                    const token = await getToken(messaging);
                    await request.post(`/v1/firebase-token/create`, {
                        type: 'NEW_PRODUCT',
                        token: token,
                    });
                } else {
                    console.log('Notification permission denied.');
                }

                // Handle foreground notifications
                onMessage(messaging, (payload) => {
                    const { notification = { body: "", title: "" } } = payload;
                    const { body, title } = notification;

                    // Invalidate query to update data
                    queryClient.invalidateQueries('list-product');

                    // Show notification toast
                    toast.info(
                        <>
                            <Typography.Title level={5} style={{ margin: 0 }}>
                                {title}
                            </Typography.Title>
                            <Typography.Text type="success">{body}</Typography.Text>
                        </>,
                        toastOptionRight
                    );
                });
            } catch (error) {
                console.error('Error setting up notifications:', error);
            }
        };

        setupNotifications(); // Gọi setup khi component mount
    }, [queryClient, currentUser]);
};

export { messaging, useSetupNotifications };