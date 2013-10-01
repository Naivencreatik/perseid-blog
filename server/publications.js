Meteor.publish("config", function() {
    return Config.find();
});

Meteor.publish("posts", function() {
    return Posts.find();
});