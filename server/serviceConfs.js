ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: process.env.FB_APP_ID,
    secret: process.env.FB_SECRET
});