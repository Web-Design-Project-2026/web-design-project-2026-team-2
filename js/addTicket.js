const addTicketButton = document.getElementById("add-ticket");
const ticketContainer = document.getElementById("ticket-container");
const summaryContainer = document.getElementById("ticket-summary");

addTicketButton.addEventListener("click", addTicket);

// attach remove listener to the initial ticket row
const initialRemoveButton = document.querySelector(".remove-ticket");
initialRemoveButton.addEventListener("click", function () {
  removeTicket(ticketContainer.children[0], summaryContainer.children[0]);
});

function addTicket() {
  if (ticketContainer.querySelectorAll(".row").length >= 3) {
    return;
  }

  const ticketIndex = ticketContainer.querySelectorAll(".row").length + 1;
  const inputId = `ticket-first-name-${ticketIndex}`;

  const row = document.createElement("div");
  const summary = document.createElement("div");

  const selectId = `ticket-type-${ticketIndex}`;
  row.innerHTML = `
    <div class="row">
      <div class="input-group">
        <label for="${inputId}">First name</label>
        <input id="${inputId}" type="text" placeholder="e.g. John" />
      </div>
      <div class="input-group">
        <label for="${selectId}" class="sr-only">Ticket type</label>
        <select id="${selectId}">
          <option value="No Ticket" data-price="0kr">Ticket Type</option>
          <option value="Entry Ticket" data-price="100kr">Entry Ticket</option>
          <option value="Plus Ticket" data-price="150kr">Plus Ticket</option>
          <option value="Experience Ticket" data-price="200kr">Experience Ticket</option>
        </select>
      </div>
      <button class="remove-ticket"><img src="./icons/cancel.png" alt="Remove ticket" /></button>
    </div>
  `;

  ticketContainer.appendChild(row);

  summary.innerHTML = `
    <div class="summary-row">
      <p class="ticket-type">No Ticket</p>
      <p class="ticket-price">0kr</p>
    </div>
  `;

  summaryContainer.appendChild(summary);

  const allSelects = document.querySelectorAll("select");
  const newestSelect = allSelects[allSelects.length - 1];
  newestSelect.addEventListener("change", updateOverview);

  const removeButton = row.querySelector(".remove-ticket");
  removeButton.addEventListener("click", function () {
    removeTicket(row, summary);
  });

  if (ticketContainer.querySelectorAll(".row").length >= 3) {
    addTicketButton.style.display = "none";
  }
}

function removeTicket(row, summary) {
  row.remove();
  summary.remove();
  updateTotal();
  if (ticketContainer.querySelectorAll(".row").length < 3) {
    addTicketButton.style.display = "block";
  }
}

const select = document.querySelector("select");
select.addEventListener("change", updateOverview);

// the following functionality was coded with help of ChatGPT: https://chatgpt.com/share/6a046129-08b4-8329-aac1-cd0803da8126
function updateOverview() {
  const select = this;
  const allSelects = document.querySelectorAll("select");
  const ticketType = document.querySelectorAll(".ticket-type");
  const ticketPrice = document.querySelectorAll(".ticket-price");

  let index = 0;
  for (let i = 0; i < allSelects.length; i++) {
    if (allSelects[i] === select) {
      index = i;
    }
  }

  // use of selectedOptions was adapted based on: https://jakearchibald.com/2024/how-should-selectedoption-work/
  const selectedOption = select.options[select.selectedIndex];
  ticketType[index].innerText = select.value;
  ticketPrice[index].innerText = selectedOption.dataset.price;

  updateTotal();
}

function updateTotal() {
  const ticketPrice = document.querySelectorAll(".ticket-price");
  const total = document.querySelector(".total-value");
  let totalPrice = 0;
  for (let i = 0; i < ticketPrice.length; i++) {
    const price = parseInt(ticketPrice[i].innerText);
    totalPrice += price;
  }
  total.innerText = `${totalPrice}kr`;
}
