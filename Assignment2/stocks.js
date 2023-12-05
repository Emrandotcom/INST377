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

  const fetchStockData = async () => {
    const stockTicker = document.getElementById('stockTicker').value.toUpperCase();
    const dateRange = document.getElementById('dateRange').value;

    try {
      const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${stockTicker}/range/${dateRange}/day?unadjusted=true&sort=asc&apiKey=p_QlzVmWDnSSkAzA2TDfJVuS6mwaVyYZ`);
      const data = await response.json();

      const dates = data.results.map(result => new Date(result.t));
      const closingPrices = data.results.map(result => result.c);

      const ctx = document.getElementById('stockChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: `${stockTicker} Closing Prices`,
            data: closingPrices,
            borderColor: 'blue',
            borderWidth: 2,
            fill: false,
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              }
            },
            y: {
              beginAtZero: false
            }
          }
        }
      });

      const redditResponse = await fetch('https://tradestie.com/apps/reddit/api/');
      const redditData = await redditResponse.json();
      const topStocksTable = document.getElementById('topStocks').querySelector('tbody');
      topStocksTable.innerHTML = '';

      for (let i = 0; i < Math.min(5, redditData.length); i++) {
        const stock = redditData[i];
        const row = topStocksTable.insertRow();
        row.insertCell(0).innerText = stock.Ticker;
        row.insertCell(1).innerText = stock.CommentCount;
        row.insertCell(2).innerText = stock.Sentiment;

        const sentimentCell = row.insertCell(2);
        sentimentCell.innerHTML = stock.Sentiment === 'Bullish' ? '&#x1F608;' : (stock.Sentiment === 'Bearish' ? '&#x1F61E;' : '');

        const linkCell = row.insertCell(3);
        const yahooFinanceLink = document.createElement('a');
        yahooFinanceLink.href = `https://finance.yahoo.com/quote/${stock.Ticker}`;
        yahooFinanceLink.target = '_blank';
        yahooFinanceLink.innerText = 'Yahoo Finance';
        linkCell.appendChild(yahooFinanceLink);
      }

    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  }
});
