Accounts.onCreateUser(function (options, user) {
    postUser(user)

  // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;

    return user;
});
