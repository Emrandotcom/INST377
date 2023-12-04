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
  });

  const navigateTo = (page) => {
    window.location.href = page;
  };

  const handleLookupCommand = (stock) => {
    document.getElementById('ticker').value = stock;
    document.getElementById('date-range').value = '30';
    document.getElementById('lookup-button').click();
  };

  annyang.addCommands({
    'lookup :stock': handleLookupCommand,
  });

  const ctx = document.getElementById('stock-chart').getContext('2d');
  const stockChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Closing Value',
        data: [],
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
      }],
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
        },
      },
    },
  });

  const fetchStockData = async (ticker, days) => {
    try {
      const apiKey = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=*';
      const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${days}/day?apiKey=${apiKey}`);
      const data = await response.json();

      const dates = data.results.map(result => new Date(result.t * 1000));
      const closingValues = data.results.map(result => result.c);

      stockChart.data.labels = dates;
      stockChart.data.datasets[0].data = closingValues;
      stockChart.update();
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  document.getElementById('lookup-button').addEventListener('click', () => {
    const ticker = document.getElementById('ticker').value.toUpperCase();
    const days = document.getElementById('date-range').value;

    fetchStockData(ticker, days);
  });

  const fetchRedditStocks = async () => {
    try {
      const redditResponse = await fetch('https://www.reddit.com/r/stocks/hot.json?limit=5');
      const redditData = await redditResponse.json();

      const tbody = document.querySelector('#reddit-stocks tbody');
      tbody.innerHTML = '';

      redditData.data.children.forEach(post => {
        const ticker = post.data.title.match(/\b([A-Z]{3,5})\b/);
        const commentCount = post.data.num_comments;
        const sentiment = post.data.link_flair_text;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="https://finance.yahoo.com/quote/${ticker[1]}" target="_blank">${ticker[1]}</a></td>
            <td>${commentCount}</td>
            <td>${sentiment}</td>
          `;

        const icon = document.createElement('i');
        icon.className = sentiment.toLowerCase() === 'bullish' ? 'fas fa-bullhorn' : 'fas fa-bear';
        row.querySelector('td:nth-child(3)').appendChild(icon);

        tbody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching Reddit stocks:', error);
    }
  };

  fetchRedditStocks();
});
