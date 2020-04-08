# Mobile Flashcards Project

This is the final assessment project for Udacity's React Native course, the Mobile Flashcards study app, where the user can decks of cards and take quizes.

## To get started

* clone project with `https://github.com/susumoa/mobile-flashcards.git`
* install all project dependencies with `yarn install`
* start the development server with `yarn start`

## Notification

The notification is sent if the user didn't completed a quiz until 20:00.
To change the timing of the notification, modify the
```
tomorrow.setHours(20)
tomorrow.setMinutes(0)
```
in the utils/api.js file's `setLocalNotification()` method.

## Platform

The app was tested on Android device.