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

  const fetchAndDisplayQuote = async () => {
    try {
      const response = await fetch('https://zenquotes.io/api/random');
      const data = await response.json();
      const quoteElement = document.getElementById('quote');
      
      if (quoteElement) {
        quoteElement.innerText = data[0]?.q || 'Failed to fetch a quote.';
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  fetchAndDisplayQuote();
});