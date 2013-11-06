Perseid.subs.posts = Meteor.subscribe("posts");

function yieldAdminItems() {
    if (Meteor.userId()) {
        this.render("adminPostItems", {to: "adminActions"})
    }
}

Router.map(function(){
    this.route("postList", {
        path: "/posts",
        waitOn: Perseid.subs.posts,
        after: yieldAdminItems
    });

    this.route("adminPostList", {
        path: "/admin/posts",
        waitOn: Perseid.subs.posts,
        after: yieldAdminItems
    });

    this.route("adminPostEditor", {
        template: "postEditor",
        path: "/admin/posts/editor/:_id?",
        waitOn: Perseid.subs.posts,
        after: yieldAdminItems,
        data: function () {
            if (!this.params._id) {
                return;
            }

            return Perseid.colls.posts.findOne({_id: this.params._id});
        }
    });
});

moment.lang("fr");