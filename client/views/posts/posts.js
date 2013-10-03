Template.posts.events({
    "change .upload-test": function (event) {
        SmartFile.upload(event.target.files[0], "");
    }
});

Template.posts.helpers({
    posts: function () {
        return Posts.find({}, {sort: {date: -1}});
    }
});

var converter = new Showdown.converter({ extensions: ['youtube.embed', 'autolink']});

Template.post.helpers({
    postContent: function () {
        return new Handlebars.SafeString(converter.makeHtml(this.content));
    },
    ago: function () {
        var m = moment(this.date);
        if(m.isBefore(moment().startOf('day'))){
            return m.format("L");
        }
        else {
            return moment(this.date).fromNow();
        }
    }
});