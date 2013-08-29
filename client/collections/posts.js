Posts.save = function (content, cb) {
    Meteor.call("savePost", content);
};