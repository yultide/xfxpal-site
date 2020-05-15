const { exec } = require('child_process')
const MatrixClient = require("matrix-bot-sdk").MatrixClient;
const AutojoinRoomsMixin = require("matrix-bot-sdk").AutojoinRoomsMixin;
require('dotenv').config()

const access_token = process.env.ACCESS_TOKEN
const client = new MatrixClient("https://matrix.xfxpal.com", access_token);
AutojoinRoomsMixin.setupOnClient(client);
client.start().then(() => console.log("Client started!"));


var clientUserId = null;
var lastResult = '';
var lastError = null;
client.getUserId().then(uid => clientUserId = uid);

client.on("room.message", (roomId, event) => {
    if (event["sender"] === clientUserId) return;
    if (! event.content || ! event.content.body) return;
    if (event['content']['msgtype'] !== 'm.text') return;

    if (event.content.body.startsWith('buildbot: ')) {
        const text = event.content.body.replace('buildbot: ', '')
        console.log('got => ', event.content.body);
        if (text === 'deploy site') {
            client.sendMessage(roomId, {
                "msgtype": "m.notice",
                "body": "👍 Starting build...",
            })
            deploySite().then(function(result) {
                lastResult = result;
                lastError = null;
                client.sendMessage(roomId, {
                    "msgtype": "m.notice",
                    "body": "🍺 Build succeeded"
                })
            }).catch(function(e) {
                lastResult = ''
                lastError = e;
                console.error(e);
                client.sendMessage(roomId, {
                    "msgtype": "m.notice",
                    "body": "💣 Build failed"
                })
            })
        } else if (text === 'debug') {
            client.sendMessage(roomId, {
                "msgtype": "m.notice",
                "body": "Last result:\n" +
                    lastResult + "\n\n" +
                    "Last error:\n" +
                    lastError,
            })

        }
    }
});


function deploySite() {
    return new Promise(function(resolve, reject) {
        const cmd = 'cd /apps/xfxpal-site/xfxpal-talent && sudo yarn deploy';
        exec(cmd, function(err, stdout, stderr) {
            if (err) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}