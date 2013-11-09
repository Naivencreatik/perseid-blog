Blog.subs.posts = Meteor.subscribe("posts");

var PostController = RouteController.extend({
    waitOn: Blog.subs.posts,
    adminActionsTemplate: "adminPostActions"
});

Router.map(function() {
    this.route("postList", {
        path: "/posts",
        controller: PostController
    });

    this.route("adminPostList", {
        path: "/admin/posts",
        controller: PostController,
    });

    this.route("adminPostEditor", {
        template: "postEditor",
        path: "/admin/posts/editor/:_id?",
        controller: PostController,
        data: function() {
            if (!this.params._id) {
                return;
            }

            return Blog.colls.posts.findOne({_id: this.params._id});
        }
    });
});

moment.lang("fr");