import {Transport} from "nodemailer";

let nodemailer = require('nodemailer')

declare global {
    var mail: Transport | undefined
}

const client = globalThis.mail || nodemailer.createTransport({
    port: 465,
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    secure: true,
})

if (process.env.NODE_ENV !== "production") globalThis.mail = client

export default client
