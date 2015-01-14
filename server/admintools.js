djankan = {
    // creates a new meteor user, triggering hook making new userprofile
    newUser : function(newUserEmailAddress) {
        Accounts.createUser({
            email:newUserEmailAddress,
            password:"password"
        })
        getUserProfiles();
    },
    getUserProfiles : function() {
        getUserProfiles()
    }
}
