const googleapi = require('googleapis');
const ApiKeyFile = require('./node_modules/Analytics-053f6bad5070.json');
const viewID = 'ga:158833383';

var google = getdefaultObj(googleapi);
var Key = getdefaultObj(ApiKeyFile);
const clientID = '1032187198835-2e4d8cde2c2gh9s5eblglu9eejc8r384.apps.googleusercontent.com';
const clientSecret = 'D23IomsAqxPGuUcbqfw_yTbQ';



function getdefaultObj(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwtClient = new google.default.auth.JWT(Key.default.client_email, null, Key.default.private_key, ['https://www.googleapis.com/auth/analytics.readonly'], null);
jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  }
  var analytics = google.default.analytics('v3');
  // var analytics = googleapi.default.analytics('v4');
  queryData(analytics);
  // queryReports();
});

function queryData(analytics) {
  analytics.data.ga.get({
    'auth': jwtClient,
    'ids': viewID,
    'metrics': 'ga:users,ga:pageviews,ga:newUsers,ga:sessionsPerUser,ga:visits',
    'start-date': '2017-08-20',
    'end-date': '2017-08-31',
    'dimensions': 'ga:country,ga:source'
  }, function (err, response) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(JSON.stringify(response, null, 4));
  });
}


function queryReports() {
    googleapi.client.request({
      path: 'https://www.googleapis.com/auth/analytics.readonly/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      body: {
        reportRequests: [
          {
            viewId: viewID,
            dateRanges: [
              {
                startDate: '7daysAgo',
                endDate: 'today'
              }
            ],
            metrics: [
              {
                expression: 'ga:sessions'
              }
            ]
          }
        ]
      }
    }).then((response) => {
      console.log(JSON.stringify(response, undefined, 2));
    }).catch((err) => {
      console.log(err);
    });
  }

