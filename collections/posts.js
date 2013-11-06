Perseid.colls.posts = new Meteor.Collection('posts');

Meteor.methods({
    savePost: function (content) {
        Perseid.checkUserId(this.userId);
        check(content, Perseid.match.NonEmptyString);

        Perseid.colls.posts.insert({content: content, date: new Date()});
    },

    editPost: function(id, content) {
        Perseid.checkUserId(this.userId);
        check(id, Perseid.match.NonEmptyString);
        check(content, Perseid.match.NonEmptyString);

        Perseid.colls.posts.update({_id: id}, {$set: {content:content}});
    },

    erasePost: function(id){
        Perseid.checkUserId(this.userId);
        check(id, Perseid.match.NonEmptyString);

        Perseid.colls.posts.remove({_id: id});
    }
});