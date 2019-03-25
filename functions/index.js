const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const SENDGRID_API_KEY = functions.config().sendgrid.key;
console.log(SENDGRID_API_KEY);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.validateNewEmail = functions.firestore
    .document('Users/{UsersId}')
    .onCreate((event) => new Promise((resolve, reject) => {
        const userData = event.data();
        console.log("user data", userData)
        const user = userData
        const url = `https://superlotto-3be45.firebaseapp.com/confirmEmail?UT=${user.UserToken}`
        if (user) {
            const msg = {
                to: user.Email,
                from: 'Ez-Homes@lottogames.com',
                subject: 'Email Verification : ',
                // text: `Hey ${toName}. You have a new follower!!! `
                html: `
                            <strong> Hello ${user.Name}. Welcome to Ez-Homes App. You have to verify your email to enable you access to particular pages. Click on the button below to confirm your email. Thank you.</strong>
                                <br/><br/><br/>
                            <center>
                                <a href = ${url}> <button> Confirm Email </button> </a>
                            </center>
                        `,
            }
            sgMail.send(msg)
                .then(() => console.log('Email.sent'))
                .catch((e) => {
                    console.log(e);
                    console.log(e.message);
                })
        }
    }))

