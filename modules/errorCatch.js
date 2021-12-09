const { Client, Message, Interaction, TextChannel } = require('discord.js') // eslint-disable-line no-unused-vars
const chalk = require('chalk')
const { serializeError } = require('serialize-error')
const { time, discordTime, colors } = require('./base')
const { errorLogging } = require('../config')

/** Some cute error emotes for the damned */
const errEmotes = '🐞 🐛 😕 📢 💢 🧭 📡 🧩 🚫 ❗'.split(' ')

/**
 * Generate a random number from 0 to x
 * @param {Number} max
 */
const randNo = max => Math.floor(Math.random() * max)

/** list of errors to ignore */
const ignoreErr = err =>
  err.stderr?.search("ERROR: There's no video") === 0 || // youtube-dl no video error
  err.stderr?.search('ERROR: Unsupported URL') === 0 || // youtube-dl unsupported url error
  err.stderr?.search('ERROR: Sorry, you are not authorized to see this status') === 0 // youtube-dl private twitter account

const dontSend = err =>
  (err.code >= 500 && err.code < 600) || // 500 error codes
  err.code === 50035 // Embed size exceeds maximum size of 6000

const dontSendToChannel = err =>
  dontSend(err) ||
  err.code === 10015 || // DiscordAPIError: Unknown Webhook
  err.code === 10062 || // DiscordAPIError: Unknown interaction
  err.name === 'FetchError' // something to do with fetch() which is async

/**
 * Send an error in current channel and in error logging channel, and in the console
 * @param {Error} error
 * @param {Client} client
 * @param {Message} message
 * @param {Interaction} interaction
 */
module.exports = (error, client, message = null, interaction = null) => {
  const thing = message || interaction
  const timeSent = thing ? thing.createdTimestamp : Date.now()
  const errEmote = errEmotes[randNo(errEmotes.length)]

  // serialize the error object
  const errObj = serializeError(error)

  // ignore these errors
  if (ignoreErr(errObj)) return

  // Display it to console first
  console.error(chalk.red(`${error.name || 'Error'}`), chalk.bgRedBright.black(`(${time()})`))
  console.error(error, errObj)

  // Send the error embed to corresponding channel, if there are any
  if (thing && !dontSendToChannel(error)) {
    const err = {
      content: 'Sorry, seems like I have encountered an error.',
      embeds: [{
        color: colors.red,
        title: `${errEmote} I have encountered an error!`,
        description: `From \`${thing.content}\` at ${discordTime(timeSent)}:\n\`\`\`${error}\`\`\``,
        footer: { text: 'This error message will also be sent to the developers. Hang tight!' }
      }]
    }
    if (message) message.reply(err).catch()
    else if (interaction) interaction.followUp(err).catch()
  }

  // split error log into 4089 characters (4096-7)
  const fullErr = JSON.stringify(errObj, undefined, 2).replaceAll('\\\\', '/').match(/(.|\s){1,4089}/g)
  fullErr.splice(10, fullErr.length - 9) // cut it up to 10 entries only
  // create embeds
  const embeds = []
  for (const i in fullErr) {
    embeds.push({
      color: colors.red,
      title: i === '0' ? `${errEmote} New error ${thing ? `from \`${thing.content}\` ` : ''}at ${discordTime(timeSent)}` : '',
      description: `\`\`\`\n${fullErr[i]}\`\`\``
    })
  }

  // Send the error embed to error logging channel
  if (errorLogging && !dontSend(error)) {
    /** @type {TextChannel} */
    const errLogChannel = client.channels.cache.get(errorLogging)
    if (errLogChannel) errLogChannel.send({ embeds }).catch()
  }
}
