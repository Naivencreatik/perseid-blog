Perseid.colls.posts = new Meteor.Collection('posts');

Meteor.methods({
    "post.save": function (content) {
        Perseid.checkUserId(this.userId);
        check(content, Perseid.match.NonEmptyString);

        Perseid.colls.posts.insert({content: content, date: new Date()});
    },

    "post.edit": function(id, content) {
        Perseid.checkUserId(this.userId);
        check(id, Perseid.match.NonEmptyString);
        check(content, Perseid.match.NonEmptyString);

        Perseid.colls.posts.update({_id: id}, {$set: {content:content}});
    },

    "post.delete": function(id){
        Perseid.checkUserId(this.userId);
        check(id, Perseid.match.NonEmptyString);

        Perseid.colls.posts.remove({_id: id});
    }
});