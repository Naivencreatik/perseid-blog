Posts = new Meteor.Collection('posts');

Meteor.methods({
    savePost: function (content) {
        check(content, NonEmptyString);

        if(!this.userId){
            throw new Meteor.Error(403, 'Must be logged in');
        }

        Posts.insert({content: content, date: new Date()});
    }
});