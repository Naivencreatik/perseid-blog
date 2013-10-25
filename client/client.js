var postsSub = Meteor.subscribe("posts");
var configSub = Meteor.subscribe("config");

Router.map(function(){
    this.route("home", {
        path: "/"
    });

    this.route("admin");

    this.route("adminLogin", {
        path: "/admin/login"
    });

    this.route("adminPostList", {
        path: "/admin/posts",
        waitOn: postsSub
    });

    this.route("adminPostEditor", {
        template: "postEditor",
        path: "/admin/posts/editor/:_id?",
        waitOn: postsSub,
        data: function () {
            if (!this.params._id) {
                return;
            }

            return Posts.findOne({_id: this.params._id});
        }
    });

    this.route("setup", {
        waitOn: configSub,
        before: function () {
            //Ensure the setup screen can't be displayed once the setup process is completed
            if (this.ready() && Config.findOne({_id: "setup"}).completed){
                console.log("App has already been configured, redirecting to admin home");
                this.redirect("admin");
            }
        }
    });

});

Router.configure({
    layoutTemplate: "layout",

    yieldTemplates: {
        "header": { to: "header" }
    }
});

Router.before(function () {
    var routeName = this.route.name;

    // no need to check at these URLs
    if (routeName === "adminLogin" || routeName.indexOf("admin") !== 0)
        return;

    var user = Meteor.user();
    if (!user) {
        if(Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
            this.stop();
        }
        else {
            this.redirect("adminLogin");
        }
    }
});

/* First time run redirection */
Deps.autorun(function(c){
    if (configSub.ready()){
        var setup = Config.findOne({_id: "setup"});

        if (!setup.completed) {
            Router.go("setup");
        }

        c.stop();
    }
});

moment.lang("fr");