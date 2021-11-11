const chalk = require('chalk')
const { Intents } = require('discord.js')

// Inspired by https://github.com/AnIdiotsGuide/guidebot (config.js.example)
// License: MIT License (https://github.com/AnIdiotsGuide/guidebot/blob/master/LICENSE)

/** Bot intents */
exports.intents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS
]
/** Bot partials (https://discordjs.guide/popular-topics/partials.html) */
exports.partials = ['MESSAGE', 'REACTION', 'USER']

/** Prefix of the bot */
exports.prefix = process.env.PREFIX || ';'

// User ids of various important people
/** Bot support user ids */
exports.botSupport = []
/** Bot developer user ids */
exports.devs = ['681766482304434187']

/** Bot presence based on env variables */
exports.presence = {
  status: process.env.STATUS ?? 'online',
  activityType: process.env.ACTIVITYTYPE ?? 'Playing',
  activity: process.env.PRESENCE ?? ';info'
}

/** Common color codes in hex */
exports.colors = {
  main: '#77e4ff',
  red: '#F04848',
  green: '#2ecc71'
}

/**
 * Return a date and time string formatted using `process.env.TIMEZONE`
 * @param {String} unixTime Unix time
 * @returns Date and time string
 */
exports.time = (unixTime = Date.now()) => new Date(+unixTime).toLocaleString('us', { timeZone: process.env.TIMEZONE ?? 'Etc/UTC' })

/**
 * Return a formatted Discord time string
 * @param {String} unixTime Unix time
 * @param {String} suffix
 * Custom suffix.
 * + None: Short date time  ("June 27, 2021 9:48 PM")
 * + `F`: Long date time   ("Sunday, June 27, 2021 9:48 PM")
 * + `d`: Short date       ("06/27/2021")
 * + `D`: Long date        ("June 27, 2021")
 * + `t`: Short time       ("9:48 PM")
 * + `T`: Long time        ("9:48:37 PM")
 * + `R`: Relative time    ("2 days ago")
 * @returns date and time string
 */
exports.discordTime = (unixTime = Date.now(), suffix = '') => `<t:${Math.floor(unixTime / 1000)}${suffix ? ':' + suffix : ''}>`

/** The different permission levels and their checks */
exports.permLevels = [
  {
    level: 5,
    name: 'lmao',
    check: message => {
      const user = message.author ?? message.user
      // Check the list of developer user ids
      return exports.devs.includes(user.id)
    }
  },
  {
    level: 4,
    name: 'Bot Support',
    check: message => {
      const user = message.author ?? message.user
      // Check the list of botSupport user ids
      return exports.botSupport.includes(user.id)
    }
  },
  {
    level: 3,
    name: 'Server Owner',
    // If the guild owner id matches the message author's ID, then it will return true.
    check: message => {
      const user = message.author ?? message.user
      return message.guild?.ownerId === user.id
    }
  },
  {
    level: 2,
    name: 'Moderator',
    // The following lines check the guild the message came from for the roles.
    // Then it checks if the member that authored the message has the role.
    // If they do return true, which will allow them to execute the command in question.
    // If they don't then return false, which will prevent them from executing the command.
    check: message => {
      try {
        const modRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase()) ||
          message.guild.roles.cache.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase())
        if (modRole && message.member.roles.cache.has(modRole.id)) return true
      } catch (e) {
        return false
      }
    }
  },
  {
    level: 1,
    name: 'User',
    check: () => true
  }
]

/**
 * Get the user permission level
 * @param {Client} message Client message
 * @returns The permission level (1, 2, 3, 4, 5)
 */
exports.getUserPerms = message => {
  // get the user perm level
  let userPermLevel = 0
  // by checking each permission
  for (const permLevel of exports.permLevels) {
    // record the *highest* perm level the user have
    if (permLevel.check(message) && userPermLevel < permLevel.level) userPermLevel = permLevel
  }
  return userPermLevel
}

/**
 * Check if user has the appropriate permission level for a certain command
 * @param {Object} command The command object
 * @param {Discord} message Discord  message
 * @returns True or false
 */
exports.hasPerms = (command, message) => {
  // find the object that has the same name as the permName
  const perm = exports.permLevels.find(l => l.name === command.info.permLevel)
  // get the user perm level
  const userPermLevel = exports.getUserPerms(message).level
  // check if the user perm level is equal to or greater than the perm given
  if (!perm) {
    console.log(chalk.red(`Error: No ${command.info.permLevel} permLevel! \n${command}`))
    return false
  } else {
    return userPermLevel >= perm.level
  }
}
