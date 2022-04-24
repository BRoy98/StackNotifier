# Notifiation Service

This is a notification service that is used to send multi channel bulk notifications.

---

## 💬 Content

### Workflow Diagram:
<img src="./docs/notification-service.png" width="600"/>

### Technologies, Services and Libraries used:
<ul>
  <li><b>Express</b>: Web server</li>
  <li><b>Bull</b>: Web server</li>
  <li><b>Axios</b>: HTTP client</li>
  <li><b>Redis</b>: for Bull (queue management)</li>
  <li><b>Twilio</b>: SMS service provider</li>
  <li><b>Mailjet</b>: Email service provider</li>
</ul>

---

## 🏃‍♂️ How to Start

1. Create `.env` file and copy the content from the given link.
2. Install dependencies `yarn install`
3. Run the server `yarn dev`
4. To run unit tests, run: `yarn test`

---

#### ⚠️ If `.env` from the given link is used, it contains all the API keys needed to connect to the Redis Cloud Server (free trial), Twilio SMS service (free trial) and MailJet mail service (free trail). 
#### ⚠️ Kindly change the phone and email on the user database to receive the notifications. Know More here, [User Database](https://github.com/BRoy98/StackNotifier#1-user-database).
#### ⚠️ Check the [Routinely check and send notifications](https://github.com/BRoy98/StackNotifier#2-routinely-check-and-send-notifications) to know how to triggering the notification service.
        
---
    
## 📙 Features Breaf

### 1. User Database:
- A json file is considered as the users database, which can be found at `data/users.json`
- Database structure:
```
{
    "name": "Test User",
    "sms": "+911234567890",
    "email": "testuser@gmail.com",
    "subscriptions": [
      {
        "topic": "weather",
        "method": "sms"
      }
    ]
  }
```
    
### 2. Routinely check and send notifications:

- To demonstrate this feature, a weather notification service is available, which periodically checks for notifications and sends it to all the subscribed users.
- To start the weather notifier, set `RUN_WEATHER_NOTIFIER=true` on `.env`
- It uses cron job to trigger periodically.
- Trigger frequency can be modified on the `index.ts` file at `line number 8` by passing cron expressions on to the fuunction `weatherSchedule`.
- Here are some useful cron expressions that can be used:
  - `*/30 * * * * *` : trigger every 30 second
  - `*/1 * * * *` : trigger every minute
  - `*/5 * * * *` : trigger every 5 minute
    
### 3. Flexible to accommodate new mediums:

- SMS and Email service is implemented on the current version of the application. SMS service uses Twilio and Email service uses MailJet.
- Services are dynamically managed by the `NotifierManager` which keeps track of all the registered notification mediums.
- Becuase of it's plugin like strucuture, any new notification mediums can be added very easily with few lines of code.

### 4. Send notification using a selected medium:

- Notification sending process is managed by a Queue Manager (Bull). It helps in keeping track of all the scheduled notifications and bulk sending process.

### 5. Retry send a notification if failed due to some code exception:

- Bull is setup to return each notification 3 times in case of failure. In case all 3 tries are failed, it rejects the notification.

### 6. Easy to test:

- Each part of the application is defined in a seperate module. The entire Notification Service has two main modules.
  - Notifier
  - Scheduler
- More details about the working process of the modules can be found on the **Workflow Diagram** added at the top of the page.

---

## 💻 REST APIs
for sending ad-hoc notifications

## Send a single notification

### Request
`POST /notifier/send`

    curl -X POST \
    'http://localhost:3030/notifier/send' \
    --header 'Accept: */*' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'service=sms' \
    --data-urlencode 'message=Hello World' \
    --data-urlencode 'to=${your_mobile_number}'
    
### Response
    

    HTTP/1.1 200 OK
    Date: Sun, 24 Apr 2022 20:28:58 GMT
    Status: 200 OK
    Connection: close
    Content-Type: text/html; charset=utf-8
    Content-Length: 23
    x-powered-by: Express

    Notification scheduled!
---

Thank you for reading.
