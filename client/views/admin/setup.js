Template.adminSetup.events({
    'submit': function(event, template){
        event.preventDefault();
        Accounts.createUser({
            username: template.find('[name="login"]').value,
            password: template.find('[name="password"]').value,
        }, function(err){
            if (err){
                console.log(err);
                return;
            }
            Router.go('admin');
        });
    }
});