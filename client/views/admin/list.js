Template.adminPostList.helpers({
    "posts": function() {
        return Perseid.colls.posts.find({}, {sort: {date: -1}});
    }
});

Template.adminPost.events({
    "click .post-delete": function(event, template) {
        Perseid.colls.posts.erase(this._id);
    },

    "click .post-edit": function(event, template) {
        Router.go('adminPostEditor', {_id: this._id});
    }
});

Template.adminPost.helpers({
    "firstLine": function () {
        var lines = this.content.split("\n");
        return lines[0];
    }
});