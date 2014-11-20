Template.menu_wrapper.helpers({
    menuOn: function() {
        if(Session.get("menu"))
            return true;
        return false;
    },
    isBucket: function() {
        if( Session.get("menu")== "bucket")
            return true;
        return false;
    },
    isBoard: function() {
        if( Session.get("menu")== "board")
            return true;
        return false;
    }
});

Template.menu_wrapper.events({
});
