Perseid.colls.posts.save = function (content) {
    Meteor.call("savePost", content);
};

Perseid.colls.posts.edit = function (id, content) {
    Meteor.call("editPost", id, content);
};

Perseid.colls.posts.erase = function(id) {
    Meteor.call("erasePost", id);
};