const { storeInfo, getInfo } = require('./botInfo')

/**
 * Record statistics for every command
 * @param {String} commandName
 */
module.exports = async commandName => {
  // Record command name
  const count = (await getInfo(`${commandName}Stat`)) || 0
  storeInfo(`${commandName}Stat`, count + 1)

  // Uptime record-keeping
  const upSince = await getInfo('upSince') // get time when bot started
  if (!upSince) storeInfo('upSince', Date.now())
}
