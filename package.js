Package.describe({
	summary: "a few useful helpers for Meteor's Session"
});

Package.on_use(function (api) {
	api.add_files([
		'session-extras.js'
	],'client');
});