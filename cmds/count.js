const ytdl = require('ytdl-core')

module.exports.run = async (bot, message, args) => {

    const streamOptions = {seek: 0, volume: 1};
    let voiceChannelID = "518589421881393195";

    console.log("Starting voice countdown");

    if (voiceChannelID != null) {
        if (message.guild.channels.get(voiceChannelID)){
            let vc = message.guild.channels.get(voiceChannelID);
            console.log("Next stop, connceting")

            vc.join().then(connection => {
                console.log("[VOICE CHANNEL] join countdown channel")
                const stream = ytdl ('https://www.youtube.com/watch?v=mTmuMtTFGQs', {filter: 'audioonly'});
                const dispatcher = connection.playStream(stream, streamOptions);

                dispatcher.on("end", end => {
                    console.log("[VOICE CHANNEL] left countdown channel.");
                    vc.leave();
                });
            }).catch(err => {
                console.log(err);
            });

        }
    }
}





module.exports.help = {
    name: "count"
}