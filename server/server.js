Meteor.startup(function () {
    if (Posts.find().count() === 0){
        Posts.insert({content: "#first-post", date: new Date()});
        Posts.insert({content: "#second-post", date: new Date()});
    }

    if (!Config.findOne({_id: 'setup'})){
        Config.insert({_id: 'setup', completed: false});
    }
});