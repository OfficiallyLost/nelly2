module.exports = {
	name: 'eval',
	description: 'eval js code',
    cooldown: 2,
    
    execute: (msg, client) => {

const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

    let owner = ['475371795185139712', '254814547326533632', '322996242521260042']
    if (!owner.includes(msg.author.id))
      try {
        const code = args.join(" ");
        let evaled = eval(code)
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
  
        msg.channel.createMessage(`\`\`\`${clean(evaled)}\`\`\``)
        } 
  
      catch (err) {
        msg.channel.createMessage({
            embed: {
                title: "Error",
                color: 13703449,
                description: `\`\`\`xl\n${clean(err)}\n\`\`\``,
                timestamp: new Date(),
                }
            })
        }
    }
}