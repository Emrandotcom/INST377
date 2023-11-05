document.addEventListener("DOMContentLoaded", () => {

  const fromCurrnecySelection = document.getElementById("fromCurrency");
  const toCurrencySelection = document.getElementById("toCurrency");

  fetch("https://api.frankfurter.app/currencies")
    .then((response) => response.json())
    .then((data) => {
      for (const key in data) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = data[key];
        fromCurrnecySelection.appendChild(option);

        const option2 = document.createElement("option");
        option2.value = key;
        option2.textContent = data[key];
        toCurrencySelection.appendChild(option2);
      }
    });

  const form = document.getElementById("currencyConverterForm");
  const resultDiv = document.getElementById("conversionResult");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fromCurrency = fromCurrnecySelection.value;
    const toCurrency = toCurrencySelection.value;
    const amount = document.getElementById("amount").value;

    if (fromCurrency === toCurrency) {
      alert("You cannot convert to and from the same currency!");
      return;
    }

    fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const conversionRate = data.rates[toCurrency];
        const convertedAmount = (amount * conversionRate).toFixed(2);
        resultDiv.textContent = `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`;
      })
      .catch((error) => {
        resultDiv.textContent = "Conversion failed. Please try again later.";
      });
  });
});