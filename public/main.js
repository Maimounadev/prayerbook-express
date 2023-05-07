let heart = document.getElementsByClassName("fa fa-heart");
let trash = document.getElementsByClassName("fa-trash");


const bibleVerses = {
  John: [
    {
      chapter: 3,
      verse: 16,
      text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.'
    },
    // Add more verses from the book of John here...
  ],
  Romans: [
    {
      chapter: 8,
      verse: 28,
      text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.'
    },
    // Add more verses from the book of Romans here...
  ],
  Philippians: [
    {
      chapter: 4,
      verse: 13,
      text: 'I can do all this through him who gives me strength.'
    },
    
  ],

  Genesis: [
    {
      chapter: 1,
      verse: 1,
      text: 'In the beginning, God created the heavens and the earth.'
    },
    // Add more verses from the book of Genesis here...
  ],
  Exodus: [
    {
      chapter: 14,
      verse: 14,
      text: 'The LORD will fight for you; you need only to be still.'
    },
    // Add more verses from the book of Exodus here...
  ],
  Psalms: [
    {
      chapter: 23,
      verse: 1,
      text: 'The LORD is my shepherd, I lack nothing.'
    },
    // Add more verses from the book of Psalms here...
  ],
  Proverbs: [
    {
      chapter: 3,
      verse: 5,
      text: 'Trust in the LORD with all your heart and lean not on your own understanding.'
    },
    // Add more verses from the book of Proverbs here...
  ],
  Isaiah: [
    {
      chapter: 40,
      verse: 31,
      text: 'But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.'
    },
    // Add more verses from the book of Isaiah here...
  ],
  Matthew: [
    {
      chapter: 5,
      verse: 16,
      text: 'In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.'
    },
    // Add more verses from the book of Matthew here...
  ],
  Mark: [
    {
      chapter: 10,
      verse: 27,
      text: 'Jesus looked at them and said, "With man this is impossible, but not with God; all things are possible with God."'
    },
    // Add more verses from the book of Mark here...
  ],
  Luke: [
    {
      chapter: 6,
      verse: 31,
      text: 'Do to others as you would have them do to you.'
    },
    // Add more verses from the book of Luke here...
  ],
  Acts: [
    {
      chapter: 1,
      verse: 8,
      text: 'But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.'
    },
    // Add more verses from the book of Acts here...
  ],
  
  
};

const bookSelect = document.getElementById('bookSelect');
const verseDisplay = document.getElementById('verseDisplay');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
  const selectedBook = bookSelect.value;
  const selectedVerses = bibleVerses[selectedBook];

  // Clear previous verse display
  verseDisplay.innerHTML = '';

  // Display each verse of the selected book
  selectedVerses.forEach(verse => {
    const verseElement = document.createElement('p');
    verseElement.textContent = `Chapter ${verse.chapter}, Verse ${verse.verse}: ${verse.text}`;
    verseDisplay.appendChild(verseElement);
  });
});




















Array.from(heart).forEach(function(element) {
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        const heart = parseFloat(this.parentNode.parentNode.childNodes[3].innerText)
        const verse = document.querySelector('#verseDisplay').innerText
        console.log(verse)
        fetch('input', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'msg': msg,
            'heart':heart,
            'verse' :verse
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        fetch('input', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

