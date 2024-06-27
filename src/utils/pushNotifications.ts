export async function subscribeToPushNotifications() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
        });
  
        // Send the subscription to your server
        await sendSubscriptionToServer(subscription);
  
        return subscription;
      } catch (error) {
        console.error('Failed to subscribe to push notifications:', error);
      }
    }
  }
  
  async function sendSubscriptionToServer(subscription: PushSubscription) {
    const response = await fetch('/api/push-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });
  
    if (!response.ok) {
      throw new Error('Failed to send subscription to server');
    }
  }