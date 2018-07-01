var users = [{
    name: 'kate',
    password: 'kate'
}]
var User = {
    findOne: function(reqUser, cb){
        const usr = users.filter(function(u){
            return u.name === reqUser.name;
        })[0];
        if(usr){
            cb(null, usr);
        }else{
            cb('Not found', null); 
        }
    }
}

module.exports = {
    User
};