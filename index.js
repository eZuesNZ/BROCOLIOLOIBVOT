// require packages
const Discord = require('discord.js');
const settings = require('./settings.json');
const fs = require('fs');
require('dotenv/config');
const http = require('http');
const port = process.env.PORT || 3000;
// This is a simple server
http.createServer().listen(port);

// initialise are bot
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// import bot settings (data)
const prefix = settings.prefix;
const token = process.env.TOKEN;
const owner = settings.owner;

//read command files
fs.readdir('./cmds', (err,files) => {
    if (err) {
        console.log(err);    
    }

    let cmdFiles = files.filter(f => f.split(".").pop() === "js");

    if (cmdFiles.length === 0 ){
        console.log("No files found");
        return;
    }

    cmdFiles.forEach((f,i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}: ${f} loaded`);
        bot.commands.set(props.help.name, props);
    })
})

let validation = function(serverRoles, userRoles){
    let val = false;
    serverRoles.forEach((role) => {
        userRoles.forEach((usr) => {
            if (role == usr){
                val = true;
            }
        });
    });
    return val;
}




bot.on('ready', async () => {
    console.log("Hello, im ready");
});

bot.on("message",msg => {
    if (msg.channel.type == "dm") return;
    if (msg.author.bot) return;

    let msg_array = msg.content.split(" ");
    let command = msg_array[0];
    let args = msg_array.slice(1);

    if (!command.startsWith(prefix)) return;

    if (validation(allowedRoles.roles,msg.member.roles.array()) || msg.member.id === owner){
        let cmd = bot.commands.get(command.slice(prefix.length));
        if (cmd){
            cmd.run(bot,msg,args);
                  
            
    }
        
    }else {
        msg.channel.send("Hey you, you dont have access to this bot command")
    } 

});

bot.on('error', err => {
    console.log(err);
});





// Bot login
bot.login(token);