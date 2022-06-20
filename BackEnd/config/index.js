require('dotenv').config()

const config={
    production:process.env.NODE_ENV==="production",
    development:process.env.NODE_ENV==="development",
    port:process.env.PORT,
    app_host:process.env.APP_HOST,
    dbUserName:process.env.DB_USERNAME,
    dbPassword:process.env.DB_PASSWORD,
    dbHost:process.env.DB_HOST,
    dbHostFront:process.env.DB_HOST_FRONT,
    dbName:process.env.DB_NAME,
    tokenSecret:process.env.TOKEN_SECRET,
    tokenExpires:process.env.TOKEN_EXPIRES,
    stripePublicKey:process.env.STRIPE_PK,
    stripeSecretKey:process.env.STRIPE_SK,
    oauth_client_id:process.env.OAUTH_CLIENT_ID,
    oauth_client_secret:process.env.OAUTH_CLIENT_SECRET,
    callback_url:process.env.CALLBACK_URL,
    callback_url_dev:process.env.CALLBACK_URL_DEVELOPMENT,
    facebook_app_id:process.env.FACEBOOK_APP_ID,
    facebook_app_secret:process.env.FACEBOOK_APP_SECRET,
    github_client_id:process.env.GITHUB_CLIENT_ID,
    github_client_secret:process.env.GITHIB_CLIENT_SECRET
}

module.exports=config

