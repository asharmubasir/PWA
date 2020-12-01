var webPush = require('web-push');

const vapidKeys = {
  'publicKey': "BNzCiDFjh8pTn8bKUkXfQurnzlaYVIF7hjS4ZZsGedFaMxppVLcT_annO-eHqqxmxMWzH6bvU0ptWQqv7fldCME",
  'privateKey': "5qrvrUWuDWs8n7tWEZElqPX7j3iTYL5WyRY7KBYMTTM"
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

var pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/dFY_v4kFl5o:APA91bG6-bYgjKlh_7KxEGv8CkIS20lYUcXwH4ODk6huvdfdE6ZuzQGZmGw8mmf85xNs2czqKckg5V2vWY19WVIJmwu0U4HL1mRgKN0I3-BvboSu8aqaUPMft4g2zRJq5I2Bcd_LkK1X",
  "keys": {
    "p256dh": "BCjl4/klht6WGapkvzLxZjW7RrpKUVJ1K68opibyXf4EsaJxjC5xP2zjJtlu0CJMgQKJAxBLO9UkPuSUjn7Zv2I=",
    "auth": "FbBFe0ID31wNlRyb9AGEhg=="
  }
};

var payload = "FCM web push"

var options = {
  gcmAPIKey: "990623214574",
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);
