EDIT_CARD = function (template,card_id) {
    card=Cards.findOne({_id:card_id});
    title=card.title;
    cardNumber=card.header.cardNumber;
    description=card.description;
    return ''

+   '<div class="card_header_edit">'
+       '<textarea rows=1>'+title+'</textarea>'
+       '<div class="edit_card"></div>'
+   '</div>'
+   '<div class="card_body">'
+       '<textarea name="description" cols=30 rows=5>'+description+'</textarea><br><br>'
+       '<input type="checkbox" id="'+card_id+'archive">Archive<br>'
+       '<button>Save</button>'
+   '</div>'

}
