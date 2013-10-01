Template.adminPostList.helpers({
    "posts": function() {
        return Posts.find({}, {sort: {date: -1}});
    }
});

Template.adminPost.events({
    "click .post-delete": function(event, template) {
        Posts.remove({_id: this._id});
    },

    "click .post-edit": function(event, template) {
        Router.go('postEditor', {_id: this._id});
    }
});