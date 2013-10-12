Posts = new Meteor.Collection('posts');

Meteor.methods({
    savePost: function (content) {
        check(content, NonEmptyString);
        checkUserId(this.userId);

        Posts.insert({content: content, date: new Date()});
    },

    editPost: function(id, content) {
        check(id, NonEmptyString);
        check(content, NonEmptyString);
        checkUserId(this.userId);

        Posts.update({_id: id}, {$set: {content:content}});
    },

    erasePost: function(id){
        check(id, NonEmptyString);
        checkUserId(this.userId);

        Posts.remove({_id: id});
    }
});