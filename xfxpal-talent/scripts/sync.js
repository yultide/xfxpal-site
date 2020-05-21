const csv = require('csvtojson');
const yargs = require('yargs');
const fs = require('fs');
const request = require('request');
const authorize = require('./authorize');

const argv = yargs
  .scriptName("synch.js")
  // .usage('$0 [args]')
  .command('people', 'sync info on talent from google forms [default]')
  .command('videos', 'sync videos from youtube channel')
  .help()
  .argv;

const cmd = argv._[0] || 'people';

if (cmd === 'people') {
  const dataUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vST1PSewhKjWy5inyw_loCQU_EyoVeYOX0ydmTUS-kHts-fCckIgj6fvo8ov_ZJjIskUOb7OWdOu_ix/pub?gid=415914948&single=true&output=csv'
  const jsonFilePath = './src/people.json';

  csv()
    .fromStream(request.get(dataUrl))
    .then((jsonObj)=>{
        let data = JSON.stringify(jsonObj, 0, 2);
        fs.writeFileSync(jsonFilePath, data);
        console.log(`Updated ${jsonFilePath}`);
    })
    .catch(console.error);
} else if (cmd === 'videos') {
  const {google} = require('googleapis');
  const jsonFilePath = './src/videos.json';
  const scope = [ 'https://www.googleapis.com/auth/youtube.readonly' ];
  authorize.googleapi(scope).then(function(auth) {
    const youtube = google.youtube({version: 'v3', auth});

    function fetchPlaylistItems(playlistId, pageToken) {
      var options = {
        part: 'snippet',
        playlistId,
        maxResults: 50,
        pageToken,
      }
      var result = [];
      return new Promise(function(resolve, reject) {
        function processResult(err, res) {
          if (err) {
            reject(err)
          } else {
            res.data.items.forEach(function(item) {
              result.push(item.snippet);
            });
            if (res.data.nextPageToken) {
              options.pageToken = res.data.nextPageToken;
              youtube.playlistItems.list(options, processResult);
            } else {
              resolve(result);
            }
          }
        }
        youtube.playlistItems.list(options, processResult);
      })
    }

    fetchPlaylistItems('UU_p5JpYXyZKyJgmxuXuPZjw').then(function(snippets) {
      let jsonObj = snippets.map(function(snippet) {
        return {
          publishedAt: snippet.publishedAt,
          title: snippet.title,
          description: snippet.description,
          videoId: snippet.resourceId.videoId,
        }
      })
      let data = JSON.stringify(jsonObj, 0, 2);
      fs.writeFileSync(jsonFilePath, data);
      console.log(`Updated ${jsonFilePath} with ${snippets.length} videos`);

    });
  });
} else {
  console.error(`Unknown command: ${cmd}`)
}


