module.exports = {
	debug: true,
	mongoUri: 'mongodb://127.0.0.1/database',
	sessionSecret: "dev_session_secret",
	facebook: {
		clientID: '<FACEBOOK_APP_ID>',
		clientSecret: '<FACEBOOK_APP_SECRET>',
		callbackURL: 'http://127.0.0.1:3000/oauth/facebook/callback'
	},
	google: {
		clientID: '<GOOGLE_APP_ID>',
		clientSecret: '<GOOGLE_APP_SECRET>',
		callbackURL: 'http://127.0.0.1:3000/oauth/google/callback'
	}
}