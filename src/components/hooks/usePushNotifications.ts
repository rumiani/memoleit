"use client"
import { useEffect } from 'react';

const PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY;

function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const usePushNotifications = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(swReg => {
                    return swReg.pushManager.getSubscription()
                        .then(subscription => {
                            if (subscription === null) {
                                return swReg.pushManager.subscribe({
                                    userVisibleOnly: true,
                                    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY!)
                                });
                            } else {
                                return subscription;
                            }
                        });
                })
                .then(subscription => {
                    console.log('usepush');
                    
                    fetch('/api/sendNotification', {
                        method: 'POST',
                        body: JSON.stringify(subscription),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                })
                .catch(error => console.error('Service Worker Error', error));
        }
    }, []);
};

export default usePushNotifications;
