Template.posts.helpers({
    posts: function () {
        return Posts.find({}, {sort: {date: -1}});
    }
});

Template.post.helpers({
    ago: function() {
        var m = moment(this.date);
        if(m.isBefore(moment().startOf('day'))){
            return m.format("L");
        }
        else {
            return moment(this.date).fromNow();
        }
    }
});