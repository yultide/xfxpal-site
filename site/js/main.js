var card = $("#template");
var cards = $('#cards');

for (var i = 0; i < 10; i++) {
    cards.append(card.clone());
}