Template.header.events({
    'click .header-logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('home');
    }
});