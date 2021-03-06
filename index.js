const { Client, Collection } = require('discord.js')
const fs = require('fs')
const config = require('./config')
const { intents, partials } = require('./modules/base')
const { logGray } = require('./modules/logger')

// Access our .env file
const dotenv = require('dotenv')
dotenv.config()

// Initialize client
const client = new Client({ intents, partials, ws: { properties: config.isMobile ? { $browser: 'Discord iOS' } : {} } })

// Handle errors
const outputErr = require('./modules/errorCatch')
process.on('unhandledRejection', error => outputErr(error, client))
client.on('error', error => outputErr(error, client))

// Read the commands folder
client.commands = new Collection()
const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
logGray('Loading commands')
for (const file of commands) {
  // Add module of each of the command files
  const command = require(`./commands/${file}`)
  // Load em
  if (command.info) client.commands.set(command.info.name, command)
  else logGray('Warning:', file, 'is not loaded!')
}

// Read the autoresponses folder
client.autoresponses = []
client.autoresponseNames = []
const autoresponses = fs.readdirSync('./autoresponses').filter(file => file.endsWith('.js'))
logGray('Loading autoresponses')
for (const file of autoresponses) {
  const name = file.split('.')[0]
  // Add module of each of the autoresponse files
  const autoresponse = require(`./autoresponses/${file}`)
  // Add to arrays
  client.autoresponses.push(autoresponse)
  client.autoresponseNames.push(name)
}

// Read the events folder
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
logGray('Loading events')
for (const file of events) {
  const eventName = file.split('.')[0]
  // Add module of each of the event files
  const event = require(`./events/${file}`)
  // Load em
  client.on(eventName, (...args) => event.execute(...args))
}

client.login(config.discordToken)
