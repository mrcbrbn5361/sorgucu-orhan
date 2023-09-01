
name: "messageCreate",

/**
 * @param {Message} message
 * @returns {Promise<void>}
 */
onLoad: async function (message) {
    if (message.author.bot || !message.channel) return;
    let args = message.content.substring(client.prefix.some(x => x.length)).split(" ");
    let command = args[0].toLocaleLowerCase()
    let acar = message.client;
    args = args.splice(1);

    let uye = message.guild ? message.guild.members.cache.get(message.author.id) : message.author;
    if(!uye) return;


    if(acar.commands.has(command) || acar.aliases.has(command)) {
        let run = acar.commands.get(command) || acar.aliases.get(command);
        if(run.permissions && run.permissions.length) {
            if(run.permissions.includes("OWNER")) {
                if(!client.owners.includes(message.author.id)) throw new Error("Yeterli yetkiye sahip değilsiniz.");
            } else {
                if(message.guild && !client.owners.includes(message.author.id) && !run.permissions.some(x => uye.roles.cache.has(x)) && !uye.permissions.has('ADMINISTRATOR')) throw new Error(`Bu komutu kullanabilmek için ${run.permissions.map(x => message.guild.roles.cache.get(x)).join(', ')} rollerine sahip olmalısın.`);
                if(!message.guild) throw new Error(`Bu komutu kullanabilmek için sunucuda bulunmalısın.`);
            }
        }
  
        run.onRequest(message.client, message, args)
    }
}
