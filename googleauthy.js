const {google} = require('googleapis')
var opn = require('opn');
const notifier = require('node-notifier')
const moment = require('moment')
const remote = require('electron').remote
const fs = remote.require('fs')
const path = remote.require('path')
const storage = remote.require('electron-storage')


/* scope for calendar api and token storage*/ 
const SCOPES = ['https://www.googleapis.com/auth/calendar']
const TOKEN_PATH = 'token.json';

/* Event listeners for:
   1- setting alarm
   2- adding event
   3- showing and updating event
*/
const elAlarm = document.querySelector('.alarm-time')
elAlarm.addEventListener('change', onAlarmTextChange,false)

const eventadder = document.querySelector('.submitdata')
eventadder.addEventListener('click', addEventsUser)

const displayevents = document.getElementById('displayeventschedule')
displayevents.addEventListener('click',checkEventsUser)

const weatherforecast = document.getElementById('displayweather')
weatherforecast.addEventListener('click',checkWeather)

/* alarm time variables */
let time = moment()
let alarmTime

/* Function calls for triggering everything 
   1- starts the calendar api
   2- start the alarm
*/
checkEventsUser()
timer()

/* authorize app and call list events to show events and update changes on table*/
function checkEventsUser(event)
{ 
  console.log("Check event working")
  var d = new Date();
  document.getElementById("day").innerHTML = d.getDate();
  document.getElementById("month").innerHTML = d.getMonth();
  document.getElementById("year").innerHTML = d.getFullYear();

  fs.readFile(path.join(__dirname,'../../credentials.json'), (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API
    authorize(JSON.parse(content), listEvents);
  }); 
}


/* authorize app and call add events to add a new event triggered by click of a submit button */
function addEventsUser(event)
{
  console.log("EVENT ADDING")
  fs.readFile(path.join(__dirname,'../../credentials.json'), (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API
    authorize(JSON.parse(content), addEvents);
  }); 
}

/* authorizes the user */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  storage.get(TOKEN_PATH, (err, data) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(data);
    callback(oAuth2Client);
  });
}

/* automatically opens default browser and wait token from user to use calendar api
   otherwise app closes itself
*/
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  opn(authUrl);
  const prompt = require('electron-prompt');
    prompt({
        title: 'TOKEN',
        label: 'Please give the token that you take from browser:',
        value: '',
        inputAttrs: {
            type: 'text'
        },
        type: 'input'
    })
    .then((r) => {
        if(r === null) {
            console.log('user cancelled');
            var window = remote.getCurrentWindow();
            window.close();
        } else {
            console.log('result', r);
            oAuth2Client.getToken(r, (err, token) => {
              if (err) return console.error('Error retrieving access token', err);
              oAuth2Client.setCredentials(token);
              // Store the token to disk for later program executions
              storage.set(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) {
                  console.error(err)
                }
                else
                {
                  console.log("Token setted");
                }
              });
              callback(oAuth2Client);
            });
        }
    })
    .catch(console.error);
}

/* gets all events from calendar then calls getEvents function */
function listEvents(auth) {
  
  var data = []
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) 
    {
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        data.push([`${start}`,`${event.summary}`]);
      });
    document.getElementById("event-status").innerHTML = "Add A New Event";
    getEvents(data);
    } 
    else 
    {
      document.getElementById("event-status").innerHTML = "No upcoming events found.";
      console.log('No upcoming events found.');
    }
  });
}

/* updates the table content with calendar events */
function getEvents(data)
{
  const summary1 = document.querySelector('.event1');
  const timing1 = document.querySelector('.time1');

  const summary2 = document.querySelector('.event2');
  const timing2 = document.querySelector('.time2');

  const summary3 = document.querySelector('.event3');
  const timing3 = document.querySelector('.time3');

  const summary4 = document.querySelector('.event4');
  const timing4 = document.querySelector('.time4');

  const summary5 = document.querySelector('.event5');
  const timing5 = document.querySelector('.time5');

  const summary6 = document.querySelector('.event6');
  const timing6 = document.querySelector('.time6');

  const summary7 = document.querySelector('.event7');
  const timing7 = document.querySelector('.time7');

  const summary8 = document.querySelector('.event8');
  const timing8 = document.querySelector('.time8');

  const summary9 = document.querySelector('.event9');
  const timing9 = document.querySelector('.time9');

  const summary10 = document.querySelector('.event10');
  const timing10 = document.querySelector('.time10');


  if (data[0])
  {
    summary1.innerHTML = data[0][1];
    timing1.innerHTML = new Date(Date.parse(data[0][0])).toLocaleString();
  }
  if (data[1])
  {
    summary2.innerHTML = data[1][1];
    timing2.innerHTML = new Date(Date.parse(data[1][0])).toLocaleString();
  }
  if (data[2])
  {
    summary3.innerHTML = data[2][1];
    timing3.innerHTML = new Date(Date.parse(data[2][0])).toLocaleString();
  }
  if (data[3])
  {
    summary4.innerHTML = data[3][1];
    timing4.innerHTML = new Date(Date.parse(data[3][0])).toLocaleString();
  }
  if (data[4])
  {
    summary5.innerHTML = data[4][1];
    timing5.innerHTML = new Date(Date.parse(data[4][0])).toLocaleString();
  }
  if (data[5])
  {
    summary6.innerHTML = data[5][1];
    timing6.innerHTML = new Date(Date.parse(data[5][0])).toLocaleString();
  }
  if (data[6])
  {
    summary7.innerHTML = data[6][1];
    timing7.innerHTML = new Date(Date.parse(data[6][0])).toLocaleString();
  }
  if (data[7])
  {
    summary8.innerHTML = data[7][1];
    timing8.innerHTML = new Date(Date.parse(data[7][0])).toLocaleString();
  }
  if (data[8])
  {
    summary9.innerHTML = data[8][1];
    timing9.innerHTML = new Date(Date.parse(data[8][0])).toLocaleString();
  }
  if (data[9])
  {
    summary10.innerHTML = data[9][1];
    timing10.innerHTML = new Date(Date.parse(data[9][0])).toLocaleString();
  }
}

/* creates a new event and adds to google calendar and to event bar */
function addEvents(auth)
{
  const eventnamedata = document.getElementById('eventnamedata').value;
  const starttimedata = document.getElementById('starttimedata').value;
  const endtimedata = document.getElementById('endtimedata').value;
  const startdatedata = document.getElementById('startdatedata').value;
  const enddatedata = document.getElementById('enddatedata').value;
  const startdatetime = startdatedata+"T"+starttimedata+":00";
  const enddatetime = enddatedata+"T"+endtimedata+":00";
  var newevent = {
    'summary': eventnamedata,
    'location': '',
    'description': '',
    'start': {
      'dateTime': startdatetime,
      'timeZone': 'Europe/Istanbul',
    },
    'end': {
      'dateTime': enddatetime,
      'timeZone': 'Europe/Istanbul',
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: newevent,
  }, function(err, newevent) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      document.getElementById("event-status").innerHTML = "There was an error contacting the Calendar";
      return;
    }
    document.getElementById("event-status").innerHTML = "Event created successfully";
    console.log('Event created: %s', newevent.htmlLink);
  });
  
}

/* always check for if an alarm set  */
function timer() {
    time = moment().format('HH:mm:ss')

    nowTime = time

    check()

    setTimeout(() => {
        timer()
    }, 1000)
}

/* check the current time alarm time then call for notifier */
function check() {
    const diff = moment(nowTime, 'HH:mm:ss').diff(moment(alarmTime, 'HH:mm:ss'))
    if (diff === 0) {
        notice(`It's ${alarmTime}. Time To Wake!`)
    }
}

/* push notification function for alarm */
function notice(msg) {
    /** Show Form */
    const window = remote.getCurrentWindow()
    const noise = new Audio(path.join(__dirname, '../audio/alarm.wav'))

    window.restore()
    window.show()
    notifier.notify({
        title: 'ALARM',
        message: msg,
        displayTime: 9000,
        icon: path.join(__dirname, '../images/clock.ico'),
        sound: false,
    })
    noise.play();

    notifier.on('close', function (notifier, options) {
       noise.pause();
    });

    notifier.on('timeout', function (notifier, options) {
        noise.pause();
     });
    
}

/* change the alarm time, triggered by elAlarm */
function onAlarmTextChange(event) {
    alarmTime = event.target.value
}

function checkWeather(event)
{
  document.getElementById('weatherforecastimage').src = "https://w.bookcdn.com/weather/picture/13_18319_1_1_ffffff_158_fff5d9_333333_08488D_3_fff5d9_333333_0_6.png?scode=2&domid=w209&anc_id=41069"
}
