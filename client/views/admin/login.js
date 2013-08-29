Template.adminLogin.events({
    'submit': function(event, template){
        event.preventDefault();

        Meteor.loginWithPassword(
            template.find('[name="login"]').value,
            template.find('[name="password"]').value,
            function(err) {
                if (err) {
                    Session.set('admin.login.error', null);

                    if (err.error === 403) {
                        Session.set('admin.login.error', 'Unknown user / Bad password');
                    }
                    else {
                        Session.set('admin.login.error', 'Unknown error');
                    }
                }

                Router.go('admin');
            });
    }
});

Template.adminLogin.helpers({
    error: function(){
        return Session.get('admin.login.error');
    }
});