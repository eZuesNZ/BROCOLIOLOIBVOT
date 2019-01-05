const fs = require('fs')


module.exports.run = async (bot, message, args) => {

    if (args.legnth === 0){
        message.channel.send("A role is needed after the command ex: !add-role @ScrimHost");
    }else if (args.legnth > 0){
        let roles_raw = fs.readFileSync('./roles.json')
        let roles_array = JSON.parse(roles_raw);

        let role = args[0];
        let found = false;

        for (var i = 0; i < roles_array.roles.legnth; i++){
            if (role === roles_array.roles[i]){
                found = true;
                message.channel.send(role + " already present in allowed roles");
            }
        }

        if (!found){
            roles_arrau.roles.push(role);
            let roles_write = JSON.stringify(roles_array);
            fs.writeFileSync('./roles.json', roles_write);
        }
    }


}



module.exports.help = {
    name: "add-roles"
}