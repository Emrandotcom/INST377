document.addEventListener("DOMContentLoaded", function () {
  let audioStatus = true;

  const toggleAudio = () => {
    audioStatus = !audioStatus;
    document.querySelector('.audio-status').innerText = `Audio is currently ${audioStatus ? 'on' : 'off'}.`;
  }

  document.getElementById('turn-on-audio').addEventListener('click', () => {
    annyang.start();
    toggleAudio();
  });

  document.getElementById('turn-off-audio').addEventListener('click', () => {
    annyang.abort();
    toggleAudio();
  });

  annyang.addCommands({
    'hello': function () {
      alert('Hello!');
    },
    'alerts with hello world': function () {
      alert('Hello, World!');
    },
    'change the color to :color': function (color) {
      document.body.style.backgroundColor = color;
    },
    'navigate to :page': function (page) {
      navigateTo(page.toLowerCase() + '.html');
    },
    'lookup :stock': function (stock) {
      document.getElementById('ticker').value = stock;
      document.getElementById('date-range').value = '30';
      document.getElementById('lookup-button').click();
    },
    'load dog breed :breed': function (breed) {
      showDogInfo(breed);
    },
    'quote': function () {
      fetchAndDisplayQuote();
    },
  });

  const navigateTo = (page) => {
    window.location.href = page;
  };

  const apiURL = "https://zenquotes.io/api/random";

  async function getRandomQuote(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const quote = data[0];
        console.log(`Quote: ${quote.q}`);
        console.log(`Author: ${quote.a}`);
        console.log(`Author Image: ${quote.i}`);
        console.log(`Character Count: ${quote.c}`);
        console.log(`HTML Quote: ${quote.h}`);
      } else {
        console.error('No quotes available.');
      }
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  }

  getRandomQuote(apiURL);
});