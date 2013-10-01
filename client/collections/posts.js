Posts.save = function (content) {
    Meteor.call("savePost", content);
};

Posts.edit = function (id, content) {
    Meteor.call("editPost", id, content);
};