if (process.env.NODE_ENV === 'test') {
    module.exports = {
        JWT_SECRET: 'stringthatiwillchangelater',
        oauth: {
            google: {
                clientID: '47699222239-mh5pn801vqee713rjhcrpam93lnldamq.apps.googleusercontent.com',
                clientSecret: 'maIGTM0_Lwrl4w6WMmPywsiR', // porcess.env.CLIENTSECRET
            },
            facebook: {
                clientID: '1013067069110606',
                clientSecret: '9a004594c857f2342980296a6822c8f9', // porcess.env.CLIENTSECRET
            },
        },
    };
} else {
    module.exports = {
        JWT_SECRET: 'stringthatiwillchangelater',
        oauth: {
            google: {
                clientID: '47699222239-mh5pn801vqee713rjhcrpam93lnldamq.apps.googleusercontent.com',
                clientSecret: 'maIGTM0_Lwrl4w6WMmPywsiR', // porcess.env.CLIENTSECRET
            },
            facebook: {
                clientID: '1013067069110606',
                clientSecret: '9a004594c857f2342980296a6822c8f9', // porcess.env.CLIENTSECRET
            },
        },
    };
}