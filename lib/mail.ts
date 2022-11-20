import {Transport} from "nodemailer";

let nodemailer = require('nodemailer')

declare global {
    var mail: Transport | undefined
}

const client = globalThis.mail || nodemailer.createTransport({
    port: 465,
    host: "post.novadev.ru",
    auth: {
        user: 'no-reply@microhost1.ru',
        pass: '25,#,GIoGrUDI',
    },
    secure: true,
})

if (process.env.NODE_ENV !== "production") globalThis.mail = client

export default client
