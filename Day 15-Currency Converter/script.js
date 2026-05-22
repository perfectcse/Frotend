const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const result = document.getElementById("result");
const btn = document.getElementById("convert");

// 🌐 API URL
const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

// 🌍 Load currencies
async function loadCurrencies() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const currencies = Object.keys(data.rates);

  currencies.forEach(currency => {
    fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
  });

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}

// 💱 Convert
btn.addEventListener("click", async () => {
  const amount = amountInput.value;

  if (!amount) {
    result.innerText = "Enter amount ❌";
    return;
  }

  const res = await fetch(API_URL);
  const data = await res.json();

  const from = fromCurrency.value;
  const to = toCurrency.value;

  const rate = data.rates[to] / data.rates[from];
  const converted = (amount * rate).toFixed(2);

  result.innerText = `${amount} ${from} = ${converted} ${to}`;
});

// 🚀 Init
loadCurrencies();