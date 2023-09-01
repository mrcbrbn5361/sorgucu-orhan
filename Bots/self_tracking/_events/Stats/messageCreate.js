name: "messageCreate",

/**
 * @param {Message} message 
 * @returns {Promise<void>}
 */

onLoad: async function (message) {
    if (message.author.bot || !message.guild || message.webhookID || message.channel.type === "dm") return;
    
    const seenData = await Seens.findOne({userID: message.author.id});
    if (!seenData) {
        seenData = {
            userID: message.author.id,
            guildID: message.guildId,
            lastSeenMessage: Date.now(),
            lastSeen: Date.now(),
            messageChannelId: message.channelId,
            messageContent: message.content,
            lastType: "MESSAGE",
            lastContent: [],
        };
    }
    
    seenData.lastSeenMessage = Date.now();
    seenData.lastSeen = Date.now();
    seenData.messageChannelId = message.channelId;
    seenData.messageContent = message.content;
    seenData.lastType = "MESSAGE";
    seenData.lastContent.push({
        date: Date.now(),
        content: message.content,
        guild: message.guildId,
        channel: message.channelId,
    });
    
    await Seens.updateOne({userID: message.author.id}, seenData);
    
    const statsData = await Stats.findOne({guildID: message.guildId, userID: message.author.id});
    if (!statsData) {
        statsData = {
            guildID: message.guildId,
            userID: message.author.id,
            topMessage: 0,
        };
    }
    
    statsData.topMessage++;
    
    await Stats.updateOne({guildID: message.guildId, userID: message.author.id}, statsData);

}
