# onesecmail
Wrapper for 1secmail.com

## Table of Contents

- [onesecmail](#onesecmail)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
      - [For Node.js](#for-nodejs)
    - [WARNING](#warning)

## Usage

#### For Node.js

Install using:

```shell
npm install onesecmail --save
```

### WARNING

this module require nodejs ver ^18.7.0

```javascript
const onesecmail = require('onesecmail');

(async () => {
    const { mail, event } = await onesecmail()
    console.log(mail)
    event.on('newMsg', console.log)
})()

//Event response ->
{
    id: 10561939,
    sender: 'fazriloke18@gmail.com',
    subject: 'Hello World',
    date: '2023-04-30T04:16:42.000Z',
    msgBody: '<div dir="ltr">Whats up... NodeJS</div>\n',
    msgText: 'Whats up... NodeJS\n',
    attachments: [
        {
            fileName: 'Vector.png',
            fileSize: 207,
            fileContentType: 'image/png',
            fileUrl: 'https://www.1secmail.com/api/v1/?action=download&login=undefined&domain=undefined&id=10561939&file=Vector.png'
        }
    ]
}
```