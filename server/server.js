Meteor.publish("posts", function() {
    return Blog.colls.posts.find();
});

Meteor.startup(function() {
    Blog.smartfile.mkdir("uploads");
});
