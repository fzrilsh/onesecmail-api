const { EventEmitter } = require('events');

/**
   * start create new mail
   * @returns JSON
   */
async function getRandomMail() {
  const mail = (await getMailApi())[0]
  const event = new EventEmitter()

  getMailMessage(mail, event)

  return {
    mail, event
  }
}

/**
   * 1secmail.com api process
   * @param advanced {boolean} - Create new message or another action
   * @param username {string} - username of mail
   * @param domain {string} - domain of mail
   * @param id {int} - id of mail message
   */
async function getMailApi(advanced = true, username, domain, id) {
  var response;

  try {
    if (advanced) {
      response = await (await fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox')).json();
    } else {
      response = await (await fetch(`https://www.1secmail.com/api/v1/?action=${id ? "readMessage" : "getMessages"}&login=${username}&domain=${domain}${id ? `&id=${id}` : ""}`)).json();
    }

    return response
  } catch (error) {
    return []
  }
}

/**
   * Process new mail
   * @param mail {string} - Mail username and domain
   * @param event {EventEmitter} - Event message
   */
function getMailMessage(mail, event) {
  var lastID = []
  setInterval(async () => {
    const [username, domain] = mail.split('@')
    const msgs = await getMailApi(false, username, domain)
    if (!msgs.length) return null;

    msgs.filter(msg => !lastID.includes(msg.id)).map(async (msg) => {
      var message = await getMailApi(false, username, domain, msg.id)
      lastID.push(msg.id)

      event.emit('newMsg', messageModel(message))
    })

  }, 3000)
}

/**
   * Returns the model of message
   * @returns json
   */
function messageModel(json, username, domain, model = {}) {
  model.id = json.id
  model.sender = json.from
  model.subject = json.subject
  model.date = new Date(json.date)
  model.msgBody = json.body
  model.msgText = json.textBody
  model.attachments = json.attachments.filter(
    (attachment) =>
      "filename" in attachment &&
      "size" in attachment &&
      "contentType" in attachment
  ).map(v => {
    return {
      fileName: v.filename,
      fileSize: v.size,
      fileContentType: v.contentType,
      fileUrl: `https://www.1secmail.com/api/v1/?action=download&login=${username}&domain=${domain}&id=${json.id}&file=${v.filename}`
    }
  })

  return model
}

module.exports = getRandomMail