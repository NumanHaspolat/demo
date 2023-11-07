const userButtons = document.querySelectorAll(".user-select button");
const playButton = document.querySelector(".play");

let selectedButton = null;

function addMoneyToBox(boxIndex, isBot) {
  const userSelect = isBot
    ? document.querySelector(`.user-select.bot button:nth-child(${boxIndex})`)
    : document.querySelector(`.user-select button:nth-child(${boxIndex})`);

  if (userSelect) {
    const existingMoney = userSelect.querySelector(".money");
    if (!existingMoney) {
      const moneyElement = document.createElement("span");
      moneyElement.innerHTML =
        '<img class="money" src="https://www.freeiconspng.com/thumbs/money-icons/money-icon-29.png" width="100px" />';
      userSelect.appendChild(moneyElement);
    }
  }
}

userButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.parentElement.classList.contains("bot")) return;

    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
      selectedButton = null;
      button.innerHTML = "";
    } else {
      if (selectedButton !== null) {
        selectedButton.classList.remove("selected");
        selectedButton.innerHTML = "";
      }
      button.classList.add("selected");
      selectedButton = button;
      const xElement = document.createElement("span");
      xElement.classList.add("x");
      xElement.innerHTML =
        '<img class="money" src="https://www.freeiconspng.com/thumbs/money-icons/money-icon-29.png" width="100px" />';
      button.appendChild(xElement);
    }
  });
});

let remainingAttempts = 1;

playButton.addEventListener("click", () => {
  const userSelectedButton = document.querySelector(
    ".user-select button.selected"
  );
  if (!userSelectedButton) {
    alert("Bir kutu seçiniz!");
    return;
  }

  if (remainingAttempts === 0) {
    alert("Oyun bitti, baştan başlıyoruz!");
    const moneyElements = document.querySelectorAll(".money");
    moneyElements.forEach((element) => {
      element.remove();
    });

    setTimeout(() => {
      const userSelectedButton = document.querySelector(
        ".user-select button.selected"
      );
      if (userSelectedButton) {
        userSelectedButton.classList.remove("selected");
      }

      const botButtons = document.querySelectorAll(".user-select.bot button");
      const randomBox = Math.floor(Math.random() * botButtons.length);

      const selectedButton = botButtons[randomBox];

      if (selectedButton) {
        const existingMoney = selectedButton.querySelector(".money");
        if (!existingMoney) {
          const moneyElement = document.createElement("span");
          moneyElement.innerHTML =
            '<img class="money" src="https://www.freeiconspng.com/thumbs/money-icons/money-icon-29.png" width="100px" />';
          selectedButton.appendChild(moneyElement);
        }
      }

      remainingAttempts = 1;
    }, 1000);

    return;
  }

  const botButtons = document.querySelectorAll(".user-select.bot button");
  const randomBox = Math.floor(Math.random() * botButtons.length);

  const selectedButton = botButtons[randomBox];

  if (selectedButton) {
    const existingMoney = selectedButton.querySelector(".money");
    if (!existingMoney) {
      const moneyElement = document.createElement("span");
      moneyElement.innerHTML =
        '<img class="money" src="https://www.freeiconspng.com/thumbs/money-icons/money-icon-29.png" width="100px" />';
      selectedButton.appendChild(moneyElement);
    }
  }

  if (userSelectedButton && selectedButton) {
    const userBoxIndex =
      Array.from(userSelectedButton.parentElement.children).indexOf(
        userSelectedButton
      ) + 1;
    const botBoxIndex =
      Array.from(selectedButton.parentElement.children).indexOf(
        selectedButton
      ) + 1;

    if (userBoxIndex === botBoxIndex) {
      alert("Oyun Durduruldu! Kutular eşleşti.");
      setTimeout(() => {
        const moneyElements = document.querySelectorAll(".money");
        moneyElements.forEach((element) => {
          element.remove();
        });
        remainingAttempts = 1;
      }, 1000);
    } else {
      alert("Oyun Bitti! Bir saniye içinde baştan başlıyoruz.");
      setTimeout(() => {
        const moneyElements = document.querySelectorAll(".money");
        moneyElements.forEach((element) => {
          element.remove();
        });
        remainingAttempts = 1;
      }, 1000);
    }
  }
});

const botButtons = document.querySelectorAll(".user-select.bot button");
botButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Bot butonlarına tıklamayı engelliyor
  });
});
