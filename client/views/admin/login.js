Template.adminLogin.events({
    'submit': function(event, template){
        event.preventDefault();

        Meteor.loginWithPassword(
            template.find('[name="login"]').value,
            template.find('[name="password"]').value,
            function(err) {
                if (err) {
                    Session.set('login.error', null);

                    if (err.error === 403) {
                        Session.set('login.error', 'login.error.forbidden');
                    }
                    else {
                        Session.set('login.error', 'login.error.unknown');
                    }
                }

                Router.go('admin');
            });
    }
});

Template.adminLogin.helpers({
    error: function(){
        var errorKey = Session.get('login.error');
        if (errorKey) {
            return i18n.stringFor(errorKey);
        }
    }
});