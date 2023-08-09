$(function() {
    const baseURL = 'https://deckofcardsapi.com/api/deck';
  
// 1st
    $.getJSON(`${baseURL}/new/draw/`)
      .then(data => {
        const { suit, value } = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
      });
  

// 2nd
    let firstCard = null;
    $.getJSON(`${baseURL}/new/draw/`)
      .then(data => {
        firstCard = data.cards[0];
        const deckId = data.deck_id;
        return $.getJSON(`${baseURL}/${deckId}/draw/`);
      })
      .then(data => {
        const secondCard = data.cards[0];
        [firstCard, secondCard].forEach(card => {
          console.log(
            `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
          );
        });
      });
  
      
// 3rd
    let deckId = null;
    const $btn = $('button');
    const $cardArea = $('#card-containers');
  
    $.getJSON(`${baseURL}/new/shuffle/`)
      .then(data => {
        deckId = data.deck_id;
        $btn.show();
      });
  
    $btn.on('click', function() {
      $.getJSON(`${baseURL}/${deckId}/draw/`)
        .then(data => {
          const cardSrc = data.cards[0].image;
          const angle = Math.random() * 90 - 45;
          const randomX = Math.random() * 40 - 20;
          const randomY = Math.random() * 40 - 20;
          $cardArea.append(
            $('<img>', {
              src: cardSrc,
              css: {
                transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
              }
            })
          );
          if (data.remaining === 0) {
            $btn.remove();
          }
        });
    });
  });
  