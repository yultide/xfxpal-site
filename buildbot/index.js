const { exec } = require('child_process')
const { MatrixClient, AutojoinRoomsMixin, SimpleFsStorageProvider, LogLevel, LogService } = require("matrix-bot-sdk");
require('dotenv').config()

LogService.setLevel(LogLevel.INFO);
const storage = new SimpleFsStorageProvider("bot.json");
const access_token = process.env.ACCESS_TOKEN
const client = new MatrixClient("https://matrix.xfxpal.com", access_token, storage);
AutojoinRoomsMixin.setupOnClient(client);
client.start().then(() => console.log("Client started!"));


var clientUserId = null;
var lastResult = '';
var lastError = null;
var version = '1.0.dev'
var startedTS = new Date().toLocaleString();

client.getUserId().then(uid => clientUserId = uid);

exec("./scripts/git-version.sh", (error, stdout, stderr) => {
    version = stdout.replace(/\n$/, '');
});

const handlers = {
    'deploy site': {
        'handler': function(roomId, event) {
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
        },
        'help': 'Deploys xfxpal site'
    },
    'deploy bot': {
        'handler': function(roomId, event) {
            client.sendMessage(roomId, {
                "msgtype": "m.notice",
                "body": "👍 Starting build...",
            })
            deployBot().then(function(result) {
                lastResult = result;
                lastError = null;
                client.sendMessage(roomId, {
                    "msgtype": "m.notice",
                    "body": "🍺 Build succeeded"
                })
                client.sendMessage(roomId, {
                    "msgtype": "m.notice",
                    "body": "Restarting..."
                });
                setTimeout(function() {
                    process.exit();
                }, 1000)
            }).catch(function(e) {
                lastResult = ''
                lastError = e;
                console.error(e);
                client.sendMessage(roomId, {
                    "msgtype": "m.notice",
                    "body": "💣 Build failed"
                })
            })
        },
        'help': 'Deploys buildbot'
    },
    'debug': {
        'handler': function(roomId, event) {
            client.sendMessage(roomId, {
                "msgtype": "m.notice",
                "body": "Last result:\n" +
                    lastResult + "\n\n" +
                    "Last error:\n" +
                    lastError,
            })
        },
        'help': 'Display the output of the last deploy'
    },
    'version': {
        'handler': function(roomId, event) {
            client.sendMessage(roomId, {
                "msgtype": "m.notice",
                "body": `Version: ${version}\n` +
                    `Started: ${startedTS}`
            })
        },
        'help': 'Show git revision for the build bot'
    }
}

client.on("room.message", (roomId, event) => {
    if (event["sender"] === clientUserId) return;
    if (! event.content || ! event.content.body) return;
    if (event['content']['msgtype'] !== 'm.text') return;

    if (event.content.body.startsWith('buildbot: ')) {
        const text = event.content.body.replace('buildbot: ', '')
        console.log('got => ', event.content.body);

        var cmd = handlers[text];
        if (cmd !== undefined) {
            cmd.handler(roomId, event);
        }
        else if (text === 'help') {
            const keys = Object.keys(handlers);
            var cmds = keys.map(function(cmd) {
                const help = handlers[cmd].help;
                return `   ${cmd} - ${help}\n`
            }).join('')
            client.sendMessage(roomId, {
                "msgtype": "m.notice",
                "body": "Available commands:\n\n" +
                    "   help - Show this message\n" +
                    cmds
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


function deployBot() {
    return new Promise(function(resolve, reject) {
        const cmd = 'sudo git pull';
        exec(cmd, function(err, stdout, stderr) {
            if (err) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}