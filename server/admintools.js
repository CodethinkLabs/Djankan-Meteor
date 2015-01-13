djankan = {
    // creates a new meteor user, triggering hook making new userprofile
    newUser : function(newUserEmailAddress) {
        existingEmail = UserProfiles.findOne({email:newUserEmailAddress});
        if(existingEmail) throw "email already in use";
        Accounts.createUser({
            email:newUserEmailAddress,
            password:"password"
        })
    }
}
