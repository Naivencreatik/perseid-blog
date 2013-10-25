Template.setup.events({
    'submit': function(event, template){
        event.preventDefault();

        var pwd = template.find('[name="password"]').value;
        var pwdconf = template.find('[name="password-confirm"]').value;

        if (pwd !== pwdconf) {
            alert(i18n.stringFor("setup.error.passwordmismatch"));
            return;
        }

        Config.initialSetup({
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