Meteor.publish("posts", function() {
    return Perseid.colls.posts.find();
});