module.exports = {

    name: "ready",

    /**
     * @param {Message} message
     * @returns {Promise<void>}
     */
    onLoad: async function (message) {
        if (!client.guilds.cache.size) return;
        client.guilds.cache.map(async guild => {
            await guild.members.fetch();
        });
    }
