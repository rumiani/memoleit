// import { NextRequest, NextResponse } from 'next/server';
// import { NextRequest, NextResponse } from 'next/server';
// import webPush from 'web-push';

// webPush.setVapidDetails(
//   `mailto:${process.env.WEB_PUSH_EMAIL}`,
//   process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
//   process.env.VAPID_PRIVATE_KEY!
// );

// const subscriptionHandler = async (req: NextRequest, res: NextResponse) => {
//   if (req.method === 'POST') {
//     const subscription = req.body;
//     const payload = JSON.stringify({ title: 'Hello!', body: 'This is a push notification.' });

//     try {
//       await webPush.sendNotification(subscription, payload);
//       res.status(201).json({ success: true });
//     } catch (error) {
//       console.error('Error sending notification:', error);
//       res.status(500).json({ error: 'Failed to send notification' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// export default subscriptionHandler;
