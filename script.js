async function searchCountry() {
  const input = document.getElementById("countryInput").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!input) {
    resultDiv.innerHTML = "<p>Please enter a country name.</p>";
    return;
  }

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${input}`);
    if (!response.ok) throw new Error("Country not found");

    const countries = await response.json();
    countries.forEach((country) => {
      const { name, capital, flags, currencies, population, region, area } = country;
      const currency = currencies ? Object.values(currencies)[0] : { name: "N/A" };

      const countryHTML = `
        <div class="country">
          <h2>${name.common}</h2>
          <img src="${flags.png}" alt="Flag of ${name.common}"/>
          <p><strong>Capital:</strong> ${capital ? capital[0] : "N/A"}</p>
          <p><strong>Currency:</strong> ${currency.name}</p>
          <p><strong>Population:</strong> ${population.toLocaleString()}</p>
          <p><strong>Region:</strong> ${region}</p>
          <p><strong>Area:</strong> ${area.toLocaleString()} km²</p>
        </div>
      `;
      resultDiv.innerHTML += countryHTML;
    });
  } catch (error) {
    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
