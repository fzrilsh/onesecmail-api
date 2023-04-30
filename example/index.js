const onesecmail = require('../index');

(async () => {
    const { mail, event } = await onesecmail()
    console.log(mail)
    event.on('newMsg', console.log)
})()