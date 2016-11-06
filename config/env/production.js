module.exports = {
	debug: false,
	mongoUri: 'mongodb://localhost/database',
	sessionSecret: "product_session_secret"
	facebook: {
		clientID: '<FACEBOOK_APP_ID>',
		clientSecret: '<FACEBOOK_APP_SECRET>',
		callbackURL: 'http://localhost/oauth/facebook/callback'
	},
	google: {
		clientID: '<GOOGLE_APP_ID>',
		clientSecret: '<GOOGLE_APP_SECRET>',
		callbackURL: 'http://localhost/oauth/google/callback'
	}
}