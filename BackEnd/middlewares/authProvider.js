const {oauth_client_id,oauth_client_secret, 
       callback_url, callback_url_dev, 
       production, 
       facebook_app_id, facebook_app_secret, 
       github_client_id, github_client_secret
      }=require("../config");

const GoogleStrategy=require("passport-google-oauth20").Strategy
const FacebookStrategy=require("passport-facebook").Strategy
const GithubStrategy=require("passport-github2").Strategy

const callbackUrl=(provider)=>`${production?callback_url:callback_url_dev}/api/authUser/${provider}/callback`

const getProfile=(accessToken, refreshToken, profile, done)=>{
    console.log(profile)
     done(null,{profile}) }


const useGoogleStrategy=()=>{
    return new GoogleStrategy({
        clientID:oauth_client_id,
        clientSecret:oauth_client_secret,
        callbackURL:callbackUrl("google")
    }, getProfile)
};

const useFacebookStrategy=()=>{
    return new FacebookStrategy({
        clientID:facebook_app_id,
        clientSecret:facebook_app_secret,
        callbackURL:callbackUrl("facebook"),
        profileFields:['id','emails','displayName' ,'name','photos']
    }, getProfile)
};

const useGithubStrategy=()=>{
    return new GithubStrategy({
        clientID:github_client_id,
        clientSecret:github_client_secret,
        callbackURL:callbackUrl("github")
        //, scope:["user:email"]
    },getProfile)
};

module.exports={
    useGoogleStrategy,
    useFacebookStrategy,
    useGithubStrategy
}