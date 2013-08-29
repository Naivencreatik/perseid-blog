Config = new Meteor.Collection("config");

Config.completeSetup = function() {
    Config.update({_id: 'setup'}, {$set: {completed: true}});
};