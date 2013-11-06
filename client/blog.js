Perseid.subs.posts = Meteor.subscribe("posts");

Router.map(function(){
    this.route("posts", {
        waitOn: Perseid.subs.posts
    });

    this.route("adminPostList", {
        path: "/admin/posts",
        waitOn: Perseid.subs.posts
    });

    this.route("adminPostEditor", {
        template: "postEditor",
        path: "/admin/posts/editor/:_id?",
        waitOn: Perseid.subs.posts,
        data: function () {
            if (!this.params._id) {
                return;
            }

            return Perseid.colls.posts.findOne({_id: this.params._id});
        }
    });
});

Router.after(function(){
    if (Meteor.userId()) {
        this.render("adminPostItems", {to: "adminActions"})
    }
});

moment.lang("fr");