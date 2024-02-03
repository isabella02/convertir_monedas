// Selectors
const currencyOne = document.getElementById("moneda-origen");
const currencyTwo = document.getElementById("moneda-destino");
const amountOne = document.getElementById("monto");
const amountTwo = document.getElementById("resultado");
const rateEl = document.getElementById("tasa");
const swap = document.getElementById("swap");
const text2 = document.getElementById("texto2");
const convert = document.getElementById("convertir");
const divisa = document.getElementById("moneda-tabla");
const titulo = document.getElementById("tabla-cambio");


 
// Fetch exchange rate and update DOM
function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/6a8b5f511669eb2303cfe713/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {

        const rate = data.conversion_rates[currency_two];

        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        text2.innerText = `${amountOne.value} ${currency_one} = `;

        amountTwo.textContent = `${(amountOne.value * rate).toFixed(2)} ${currency_two}`;
      
    });
}

swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;

  calculate();
});

convert.addEventListener("click", () => {
    calculate();
    amountOne.addEventListener("input", calculate);
    currencyTwo.addEventListener("change", calculate);
    amountTwo.addEventListener("input", calculate); 
});

function generarTabla() {
    const currency_one = currencyOne.value;
    const currency_two = currencyTwo.value;

    fetch(`https://v6.exchangerate-api.com/v6/6a8b5f511669eb2303cfe713/latest/${divisa.value}`)
        .then((res) => res.json())
        .then((data) => {
        const rates = data.conversion_rates;

        const tableBody = document.querySelector('#tabla-convert tbody');
        titulo.textContent = ` TABLA DE CONVERSIÓN - ${divisa.value}`;

        tableBody.innerHTML = '';

       
            for (const currency in rates) {
               
                const rate = rates[currency];
                const usdValue = (1 / rate).toFixed(2);

                const row = document.createElement('tr');
                row.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700');
                row.innerHTML = `
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${currency}
                </th>
                <td class="px-6 py-4">
                    ${rate}
                </td>
                <td class="px-6 py-4">
                    $1 = ${usdValue} ${currency}
                </td>
                `;
                tableBody.appendChild(row);
         }
        });
}

divisa.addEventListener("change", () => {
    generarTabla()
});


generarTabla()