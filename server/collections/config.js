Meteor.methods({
    "config.initialSetup": function(params) {
        var completed = Config.findOne({_id:'setup'}).completed;

        if (completed) {
            throw new Meteor.Error(400, "CMS is alreay configured");
        }

        Accounts.createUser(params);

        Config.update({_id: 'setup'}, {$set: {completed: true}});
    }
});