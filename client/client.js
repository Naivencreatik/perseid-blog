Router.map(function(){
    this.route('home', {
        path: '/'
    });

    this.route('admin', {
        before: [
            function(){
                var self = this;
                Deps.autorun(function(c){
                    if(!Meteor.loggingIn() && !Meteor.user()){
                        self.redirect('adminLogin');
                    }
                    else if (Meteor.user()){
                        c.stop();
                    }
                });
            }
        ]
    });

    this.route('adminLogin', {
        path: '/admin/login'
    });

    this.route('adminSetup', {
        path: '/admin/setup',
        before: [
            function(){
                var self = this;
                Deps.autorun(function(c){
                    if(!Meteor.loggingIn()){
                        if (Meteor.users.find().count() !== 0){
                            Router.go('admin');
                        }
                        c.stop();
                    }
                });
            }
        ]
    });
});

Router.configure({
    layout: 'layout',

    renderTemplates: {
        'header': { to: 'header' }
    }
});

/* First time run redirection */
Deps.autorun(function(c){
    var setup = Config.findOne({_id: 'setup'});
    if(setup && !setup.completed){
        Router.go('adminSetup');
    }
});