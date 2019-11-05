# :alarm_clock: Cuckoo Clock :alarm_clock:

## Introduction

This is a widget application for **Linux, Windows and MacOs** which has **analog clock, weather forecast and google calendar api** integrated event scheduler.

## Features
   - Google Calendar API (event adding, authorizing, event listing)
   - Alarm Setting
   - Notification (node-notifier)
   - Shortcuts (globalShortcut)
   - Storage for Json files (electron-storage)
   - Widget
   - Tray
   - Cross Platfom (mac,linux, windows)

## Project Structure

<img width="383" alt="Ekran Resmi 2019-11-05 03 26 41" src="https://user-images.githubusercontent.com/32219894/68169169-39aa4b00-ff7c-11e9-8709-b0ece0751157.png">

## How to Run ? 

### *Create Credentials File*
First create your credentials.json file from https://developers.google.com/calendar/quickstart/nodejs
Then put the credentials file into your application directory (same with main.js ).

### *Check Node and Npm*

- Open terminal and write 
    - node -v
    - npm -v
- If they do not exists visit the links below: 
    - https://nodejs.org/en/download/
    - https://www.npmjs.com/get-npm
    
### *Install Requirements*

- In package.json file you can see dependencies. Simply you can use:  
  - npm install
    
### *Start application*

- npm start
- It immediately shows a pop up screen and a default browser window for permission token :

<img width="371" alt="Ekran Resmi 2019-11-05 13 20 08" src="https://user-images.githubusercontent.com/32219894/68199460-22e11400-ffcf-11e9-94bc-68eba5373467.png">

- Complete the permission parts from browser
- Now you can use application:
<img width="422" alt="Ekran Resmi 2019-11-04 02 25 44" src="https://user-images.githubusercontent.com/32219894/68199609-65a2ec00-ffcf-11e9-8451-0cfa7fbe5961.png">




   
    






