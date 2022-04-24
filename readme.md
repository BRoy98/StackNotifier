# Notifiation Service

This is a notification service that is used to send multi channel bulk notifications.

---

## Content

<details>
  <summary>Workflow Diagram</summary>
  
   <img src="./docs/notification-service.png"/>
</details>

<details>
  <summary>Technologies, Services and Libraries Used</summary>

  <ul>
    <li><b>Express</b>: Web server</li>
    <li><b>Bull</b>: Web server</li>
    <li><b>Axios</b>: HTTP client</li>
    <li><b>Redis</b>: for Bull (queue management)</li>
    <li><b>Twilio</b>: SMS service provider</li>
    <li><b>Mailjet</b>: Email service provider</li>
  <ul>
</details>

---

## How to Start

1. Create `.env` file and copy the content from the given link.
2. Run `yarn install`
3. Run `yarn dev`
4. To run unit tests, run: `yarn test`

---

This is a notification service that is used to send notifications to users.
