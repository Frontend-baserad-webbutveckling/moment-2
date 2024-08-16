const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// fetch anrop till server
async function getData() {
  try {
    const response = await fetch(
      "https://webbutveckling.miun.se/files/ramschema_ht23.json"
    );
    // Omvandla till JSON-format
    const data = await response.json();
    return data;
  } catch (error) {
    // felmeddelande
    console.error("Kunde inte ladda ner data från servern:", error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const data = await getData();

  // Kontrollerar om data har laddats korrekt
  if (!data) {
    console.error("Data kunde inte laddas!");
    return;
  }

  // variabler för tabellens tbody och sökfältet
  const tableBody = document.querySelector("#course-table tbody");
  const searchInput = document.querySelector("#search-input");

  function renderTable(filteredData) {
    // Rensa tabell
    tableBody.innerHTML = "";
    filteredData.forEach((course) => {
      // Skapa ett nytt rad-element
      const row = document.createElement("tr");
      // Sätt innehållet i raden baserat på kursens information
      row.innerHTML = `<td>${course.code}</td><td>${course.coursename}</td><td>${course.progression}</td>`;
      // Lägg till raden i tabellens tbody
      tableBody.appendChild(row);
    });
  }

  // Funktion för att filtrera kurser
  function filterCourses() {
    // normalisera söksträngen
    const searchText = searchInput.value.toLowerCase();
    // Filtrerar kurser som matchar söksträngen i antingen deras 'code' eller 'coursename' egenskaper
    const filteredData = data.filter(
      (course) =>
        course.code.toLowerCase().includes(searchText) ||
        course.coursename.toLowerCase().includes(searchText)
    );
    renderTable(filteredData);
  }

  function sortData(type) {
    data.sort((a, b) => {
      // Om typen är 'name', använd kursnamn, annars använd den specifika egenskapen och konvertera till små bokstäver
      let valA = (type === "name" ? a.coursename : a[type]).toLowerCase();
      let valB = (type === "name" ? b.coursename : b[type]).toLowerCase();

      // Jämför värdena och returnerar -1, 1 eller 0 för att sortera i stigande ordning
      return valA < valB ? -1 : valA > valB ? 1 : 0;
    });
    renderTable(data);
  }

  // eventlyssnare för varje tabellhuvud för att hantera sortering
  document.querySelectorAll("#course-table th").forEach((header) => {
    header.addEventListener("click", function () {
      sortData(this.getAttribute("data-type"));
    });
  });

  // filtrera datan dynamiskt
  searchInput.addEventListener("keyup", filterCourses);

  renderTable(data);
});
