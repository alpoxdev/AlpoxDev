const LambdaForwarder = require('aws-lambda-ses-forwarder');

export const onEmailHandler = (event, context, callback) => {
    // See aws-lambda-ses-forwarder/index.js for all options.
    const overrides = {
        config: {
            fromEmail: 'contact@alpox.dev',
            emailBucket: 'alpoxdev-email',
            emailKeyPrefix: 'emailsPrefix/',
            forwardMapping: {
                'contact@alpox.dev': ['alpoxdev@gmail.com'],
            },
        },
    };
    LambdaForwarder.handler(event, context, callback, overrides);
};
