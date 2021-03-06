Template.adminPostList.helpers({
    "posts": function() {
        return Blog.colls.posts.find({}, {sort: {date: -1}});
    }
});

Template.adminPost.events({
    "click .post-delete": function(event, template) {
        Meteor.call("post.delete", this._id);
    },

    "click .post-edit": function(event, template) {
        Router.go('adminPostEditor', {_id: this._id});
    }
});