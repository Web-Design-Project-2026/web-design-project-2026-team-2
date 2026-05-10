const addTicketButton = document.getElementById("add-ticket");
const ticketContainer = document.getElementById("ticket-container");

addTicketButton.addEventListener("click", addTicket);

function addTicket() {
  if (ticketContainer.querySelectorAll(".row").length >= 3) {
    return;
  }
  const row = document.createElement("div");

  row.innerHTML = `
      <div class="row">
        <input type="text" placeholder="First name*" />

        <select>
          <option value="">Ticket Type</option>
          <option value="entry">Entry Ticket</option>
          <option value="plus">Plus Ticket</option>
          <option value="experience">Experience Ticket</option>
        </select>
      </div>
    `;

  ticketContainer.appendChild(row);

  if (ticketContainer.querySelectorAll(".row").length >= 3) {
    addTicketButton.style.display = "none";
  }
}

const ticketType = document.getElementById("ticket-type");
const ticketPrice = document.getElementById("ticket-price");
const select = document.querySelector("select");

select.addEventListener("change", updateOverview);

function updateOverview() {
//use of selectedOptions was adapted based on: https://jakearchibald.com/2024/how-should-selectedoption-work/
  const selectedOption = select.selectedOptions[0];
  ticketType.innerText = select.value;
  ticketPrice.innerText = selectedOption.dataset.price;
}
