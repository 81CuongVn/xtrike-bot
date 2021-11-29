# Xtrike Bot
A multi-purpose Discord bot written in [Discord.js](https://discord.js.org) that does all sorts of bot stuff.

And it's open-source!

[![Status](https://img.shields.io/uptimerobot/status/m786499889-6b41061a49e587f762227724)](https://replit.com/@xyr11/xtrike-bot) [![License](https://img.shields.io/github/license/xyr11/xtrike-bot)](#license) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Current Version](https://img.shields.io/github/package-json/v/xyr11/xtrike-bot)](https://github.com/xyr11/xtrike-bot/blob/main/package.json)

## Features
### Search for text in images!
Can't find that one image your friend sent that got buried by a day's worth of messages? Well, you can now search for them! Powered by [OCRSpace](https://ocr.space/) and [Fuse.js](https://fusejs.io/). (Enter `;image` for more info.)

### Extract the raw video from external links!
It's a real inconvenience when you need to open links just to watch epic fails or low quality memes. So now, the bot will automatically extract and send the video whenever someone sends a link! Powered by [youtube-dl](http://ytdl-org.github.io/youtube-dl/). (Supported sites: Twitter, Tiktok.)

### And more in the future!
Hang tight.

## Add the bot to your server
*The invite link will be available once the bot gets out of beta.*

## Versions

### 0.2 ***(Dev To-do List)***
Big changes! Slash commands beta, dual command handlers, added & updated many commands, more database stuff, new autoresponses

#### General
- [x] Support for dual command handlers
- [x] Added JSDoc comments for development
- [x] Removed old README.md and integrated it to the current one (5111b52) and added more shields (2d881ea)
- [x] Serve http requests for status checking at https://xtrike-bot.xyr11.repl.co/ (fb173ee)

#### Commands
- [x] Support for dual command handlers, `messageCreate` and `interactionCreate` at the same time! (8bf55c3, 8f0e007)
- [x] `requiredArgs: true`: If a user doesn't give arguments, it will instead give the help embed of that command. (8dca861)
- [x] Never acknowledge the bot's own messages (27ff8dc)

Help
- [x] Added a "Did you mean" part if there aren't any matches (d102252, 2f9e75a)
- [x] Added a `thumbnail` option for the help embed (97ca5ce)
- [x] Instead of adding the prefix per line, `$$` will now be used instead to substitute the current prefix (61da3cc)
- [x] "Options" and "Similar" now has its own embed fields (f47146b)

hmm
- [x] Won't reply to messages anymore (if not a slash command) (5111b52)

Image search
- [x] *New defaults*: It will search for images at most 7 days old and from the current channel only. (a6a6be5, a5af925)
- [x] Rewrote the schema for more efficient data storage (12bab96, b1924ef)
- [x] Changed how the results are displayed (a27912a, 240db89, b1924ef) and fixed search parameters for optimal results (a6a6be5, b1924ef)
- [x] Updated the help embed (a6a6be5)
- [x] Better link checking (6c3632f)
- [x] Automatically retry if script encounters a FetchError (548a61b)

message
- [x] Added the `message` command back (2a7c020, 0a27337, 3010261)

ping
- [x] Removed reliance on custom `pingArea` channel, instead it will just edit its own message (34bf75c)

reboot
- [x] Will log to console and change the activity text if bot is rebooting (e4561b8)
- [x] Uptime logs will be cleared if `reboot` is run. (aabb3c8)

sad
- [x] The original `sad` command is added back! (8172c7f)

Sniper
- [x] Added `pls snipe`, `editsnipe`, and `reactionsnipe` from [DankMemer/sniper](https://github.com/DankMemer/sniper) (cc4e0b4, 18e8e0d, b84a868)
- [x] Added dank mode to support `pls` as a valid prefix (cc4e0b4)
- [x] Data is now stored in the database so that it won't get lost if the bot restarts (51e0446)

stats
- [x] Added stats to get bot commands statistics (2dc84d2)

test
- [x] More `test` options (92c19f9, a27febc)

uptime
- [x] Added the `uptime` command back. Bot logs the time when it boots up if there are no prior logs. Logs will be cleared if `reboot` is run. (aabb3c8)

#### Autoresponses
- [x] Modularized autoresponses (88dcf6b)

hi Autoresponse
- [x] Added back the feature that when every time someone says "hi", the bot wil reply with "hello" (88dcf6b)

ytdlVideos Autoresponse
- [x] Support for many links in a message (5a5e09d)
- [x] Default to the lowest quality present (d6a74f6)

#### Others
Bot config
- [ ] Switch all config settings to `config.js`
- [ ] Remove unnecessary variables

Config.js
- [x] Added more intents and partials (a084ef0, 5e432df)
- [x] Removed `botId` (a084ef0)
- [x] `hasPerms()`: require the command object instead of just the name (8ab8478)

Endpoint
- [x] Added endpoints (basically unofficial bot API) to get bot statistics (fb173ee, e695778)

Error catching
- [x] Added filters if and when an error needs to be sent in the error logging channel or be ignored entirely (c3580eb, b0c88f2, d6b14f9)
- [x] Removed last channel tracking (2d321c1)
- [x] Added current time as fallback (44d469b)

Statistics
- [x] Get the bot uptime (aabb3c8)
- [x] Get the number of times the bot executes user commands (aabb3c8)

### 0.1.4
<details>
<summary> Fixed bugs in `;image`, added the `;help` command, more settings in `.env`, better error logging </summary>

`;image`
+ Fixed bugs regarding activating the command
+ Added `--here` to search for images in the current channel only

`;help`
+ Re-added the help command
+ Fixed the descriptions and usage of all commands

`.env`
+ Added presence options in `.env` so that changing them can be easier

Error logging
+ Better error logging, the full serialized error will now be sent to the error logging channel and the error.message will be the only thing shown in the current channel

Others
+ Cleaned `config.js`
+ Changed the run command on `.replit` to include installation of Node 16

</details>

### 0.1.3
<details>
<summary>Re-added `package-lock.json`, updates to the `image` command, better Replit integration, and more:</summary>

+ Added include/exclude channel in  `image` command
+ Better `image` command replies
+ Better Replit integration in README
+ Updated `info` text
+ Console logging in ping
+ Changed presence activity
+ Added more emojis in `errorCatch.js`

</details>

### 0.1.2
<details>
<summary>Introducing databases and the beta version of the `image` command which finds text in images. Also:</summary>

- added an `env` entry for the timezone
- updated the `.info` part of commands
- moved the 'ready' event to its own file
- added `.replit` file
- added a `Develop` guide in README.md
- added new modules

</details>

### 0.1.0
Rewrite for Discord.js v13 and replaced spaghetti code to an actual command handler. Also, modules, arrow functions, and more Modern Javascript™.

### 0.0.5
<details>
<summary>Changelog</summary>

+ `ping` command will just edit its embed rather than re-sending the message
+ Switched hosting platform from Heroku to Repl.it, modules that aren't needed by Repl.it will not be deleted so that local development of the bot is possible and also because Heroku will be our backup platform
+ Removed the owner ID in the main file (index.js) and placed it in the .env file

</details>

### 0.0.4
<details>
<summary>Changelog</summary>

```diff
+ Updated so that you can invite it on your own server!
+ Optimized all embed variables!
+ Revamped and optimized command finding to instead use arrays rather than your typical OR function
+ Added oxford to beta commands
+ Fixed a bug in the online command that it doesn't include Idle and Do Not Disturb members
+ Made uptime an official command
- Remove owner, no-sleep and restart commands completely
- Removed support for custom emojis from support server and replaced it with discord-wide emojis
```
</details>

### 0.0.3
<details>
<summary>Changelog</summary>

```diff
+ Fixed echo command that crashes the bot after not mentioning someone
+ Added "no-sleep", "restart", "hmm" commands
+ Added "sad", "uptime", and "restart" as beta commands
+ Added all commands with its corresponding 'help' guides (e.g. ;ping help)
+ Added a new update naming system
- Removed "hmm" command from beta commands to be an official command
- No-sleep command deprecated
```
</details>

### 0.0.2 and 0.0.1
The bare bones of the bot, with very limited features.

## To-do's for future versions
- [ ] Dedicated `video` command for extracting videos on platforms `youtube-dl` supports
- [ ] Support for command aliases
- [ ] Command that temporarily disables other commands
- [ ] Switch commands and autoresponses to Class
- [ ] Auto-generate `Options` field in the help embed from the options property for slash commands
- [ ] Unified and modularized logger
- [ ] Unified and modularized message sender for both `message` and `interaction`
- [ ] Get the total number of messages the bot has sent
- [ ] Re-add `oxford` command

## Endpoints
You can either use `GET` or `POST`.

Endpoint url: https://xtrike-bot.xyr11.repl.co

Endpoint | Description | Returns
-- | -- | --
/stats | Get all bot statistics | `Object`
/stats/keys | Get the different statistics keys | `Array`
/stats/`commandName` <br> /stats/`key` | Get the individual values of the given command name or property | `String`

### Sample code
#### Check if bot is up
```js
const isUp = await fetch('https://xtrike-bot.xyr11.repl.co').then(res => res.text()).catch(console.error)
console.log('The bot is up:', !!isUp)
```

#### Get all statistics
```js
const stats = await fetch('http://localhost:3000/stats').then(res => res.json()).catch(console.error)
console.log(stats)
```

## Develop
### Prerequisites
+ [Git](https://git-scm.com/downloads)
+ [Node.js 16.6 or later (preferably the latest version)](https://nodejs.org/en/download/)
+ [a MongoDB database](https://www.mongodb.com/)
+ [an OCRSpace API key](https://ocr.space/ocrapi)
+ [Replit account (optional)](https://replit.com)

### Configure repository
1. *If you're using Replit*, click: [![Run on Replit link](https://replit.com/badge/github/xyr11/xtrike-bot)](https://replit.com/github/xyr11/xtrike-bot).

   *If not*, then clone the repository via Git
   ```
   cd "C:/Path/of/folder/you/want/this/repo/to/go"
   git clone https://github.com/xyr11/xtrike-bot.git && cd xtrike-bot && npm i
   ```

2. Rename the `example-config.js` file to `config.js` and replace the values of all the required variables to configure your bot.

3. On the `config.json` file, add values to the `exports.botSupport`, and `exports.devs` variables. Read the comments to see what they do.

### Run repository
*If you're on Replit*, you should press the big "Run" button.

*If not*, enter the following command:
```
npm start
```
If no errors are encountered, you will be able to see this message if the bot successfully logs in to Discord:
```
Ready as <Bot username>! (<Date and time>) 🤖
```

### Customizing the bot
You can customize the bot by replacing the default values on your `config.js` file.

<details>
<summary>Documentation</summary>

Variable | Default value | Description
-- | -- | --
`botPrefix` | "`;`" | Prefix of the bot. You can do more than 1 symbol here BUT not a whole word. This will have no effect if the user used slash commands (if slash commands are already deployed).
`botSupport` | N/A | User IDs of people that has the 'Bot Support' role. Right now they don't do anything but in the future this may change
`Timezone` | "`Etc/GMT`" | Timezone for console logging of time. Needs to be a valid TZ name, you can learn more about it on https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
`errorLogging` | N/A | Channel ID for error logging. All errors caught will be send in the specified channel. Note that the error message may include personal info such as folder names.
`botStatus` | "`online`" | Presence status: `online`/`idle`/`dnd`/`invisible`
`actType` | "`PLAYING`" | Activity type: `PLAYING`/`WATCHING`/`LISTENING`/`COMPETING` (all caps)
`actName` | "`;info`" | Activity name, the text that will show up in "Playing..."
`isMobile` | `false` | If you want to set the status to "Online in mobile device". If true, this will ignore `actType`

</details>

### Updating the cloned repository (for Git)
To update the code, enter:
```
git fetch --all && git reset --hard origin/main && npm i
```
***NOTE: This will overwrite all files that you have modified, so you will lose them.*** If you want it to be saved permanently then I suggest forking the repository instead and doing `git merge` with your own version every time there is a new update.

## License
The code is licensed under [MIT License](https://github.com/xyr11/xtrike-bot/blob/main/LICENSE).

## Contact
[Join the official support and dev Discord server!](https://discord.gg/x3F22hN)

### Personal
[@xy_rus](https://twitter.com/xy_rus) on bird app <br>
[Xtrike#<i>0507</i> (id: 681766482304434187)](https://discord.com) on imagine a place

## Credits
Huge thank you to [Worn Off Keys's discord.js playlist](https://www.youtube.com/playlist?list=PLaxxQQak6D_f4Z5DtQo0b1McgjLVHmE8Q), to [the *An Idiot's Guide* guide](https://anidiots.guide/), and finally to [Discord.js Guide](https://discordjs.guide/), especially with the new and spicy v13 stuff. A huge thank also to [Replit](https://replit.com) for the bot hosting.
