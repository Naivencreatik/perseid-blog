checkUserId = function(userId){
    if(!userId) {
        throw new Meteor.Error(403);
    }
};