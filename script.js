const arrowBackCalendar = document.getElementById("arrow-back");
const arrowNextCalendar = document.getElementById("arrow-next");
const arrowBackDaily = document.getElementById("arrow-back-daily");
const arrowNextDaily = document.getElementById("arrow-next-daily");
const arrowBackWeekly = document.getElementById("arrow-back-weekly");
const arrowNextWeekly = document.getElementById("arrow-next-weekly");
const selectMode = document.getElementById("switch-mode");
const calendarDaily = document.getElementById("calendar-day");
const calendarWeekly = document.getElementById("calendar-weekly");
const calendarWeeklyDays = document.getElementById("calendar-weekly_day");
const calendarMonthly = document.getElementById("calendar-monthly");
const calendarYearly = document.getElementById("calendar-yearly");
const infoSelect = document.getElementById("info-select");
const dayCalendarOnDaily = document.getElementById("calendar-day_day_number");
const weekCalendarOnWeek = document.getElementById("calendar-weekly_numbers");
const lucideMoon = document.getElementById("lucide-moon");
const lucideSun = document.getElementById("lucide-sun");
const link = document.getElementById("theme");
const switchTheme = document.getElementById("switch-theme");
const newDayActivity = document.getElementById("new-day-activity");
const saveTask = document.getElementById("save-task");
const closeTask = document.getElementById("close-task");
const placeActivity = document.getElementById("place-activity");
const newActivity = document.getElementById("new-activity");
const saveActivity = document.getElementById("save-activity");

let dateTimeTask = document.getElementById("datetime-local");

let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let dayString;

console.log(currentDate);

function createActivity() {
  newActivity.classList.toggle("hidden");
  let activity = {
    name: newActivity.querySelector("input").value,
    description: newActivity.querySelector("textarea").value,
    color: newActivity.querySelector("div").querySelector("input[type=color]")
      .value,
  };
  saveActivity.addEventListener("click", () => {
    if (activity.name === "" && activity.description === "") {
      window.alert("Please enter a title and a description");
    } else {
      localStorage.removeItem("name", activity.name);
    }
  });
  console.log(localStorage);
}
placeActivity.addEventListener("click", createActivity);

// //Switch the theme of the page
// function changeTheme() {
//   if (link.href.endsWith("styles.css")) {
//     link.href = link.href.replace("styles.css", "styles-night.css");
//     lucideSun.classList.remove("hidden");
//     lucideMoon.classList.add("hidden");
//   } else if (link.href.endsWith("styles-night.css")) {
//     link.href = link.href.replace("styles-night.css", "styles.css");
//     lucideSun.classList.add("hidden");
//     lucideMoon.classList.remove("hidden");
//   } else {
//     link.href = link.href.replace("styles.css", "styles-night.css");
//     lucideSun.classList.remove("hidden");
//     lucideMoon.classList.add("hidden");
//   }
// }
// switchTheme.addEventListener("click", changeTheme);

// Who happen when we switched the Select
const switchMode = () => {
  switch (selectMode.value) {
    case "Day":
      calendarDaily.classList.remove("hidden");
      calendarMonthly.classList.add("hidden");
      calendarWeekly.classList.add("hidden");
      calendarYearly.classList.add("hidden");
      actualizeMonth();
      generateAgend();
      break;
    case "Week":
      calendarWeekly.classList.remove("hidden");
      calendarMonthly.classList.add("hidden");
      calendarDaily.classList.add("hidden");
      calendarYearly.classList.add("hidden");
      actualizeMonth();
      generateWeek();
      break;
    case "Year":
      calendarYearly.classList.remove("hidden");
      calendarMonthly.classList.add("hidden");
      calendarWeekly.classList.add("hidden");
      calendarDaily.classList.add("hidden");
      generateYear();
      break;
    default:
      calendarMonthly.classList.remove("hidden");
      calendarDaily.classList.add("hidden");
      calendarWeekly.classList.add("hidden");
      calendarYearly.classList.add("hidden");
      actualizeMonth();
      generateCalendar(currentMonth, currentYear);
  }
};
selectMode.addEventListener("change", switchMode);

// Function to add a Zero to numbers with only One digit
const addZeroToNumber = (number) => {
  if (number.toString().length === 1) {
    return "0" + number;
  } else {
    return number;
  }
};

// Function to actualize the Month on paragraph Info Select
function actualizeMonth() {
  infoSelect.innerText = `${addZeroToNumber(
    currentMonth + 1
  )} / ${currentYear}`;
}

// Function for pass the number day to String day
const whichDayIsIt = (day) => {
  switch (day) {
    case 1:
      dayString = "Monday";
      break;
    case 2:
      dayString = "Tuesday";
      break;
    case 3:
      dayString = "Wednesday";
      break;
    case 4:
      dayString = "Thursday";
      break;
    case 5:
      dayString = "Friday";
      break;
    case 6:
      dayString = "Saturday";
      break;
    case 0:
      dayString = "Sunday";
      break;
  }
  return dayString;
};
// Function for pass the month and obtain a number
const whichMonthIsIt = (month) => {
  switch (month) {
    case "January":
      month = 1;
      break;
    case "February":
      month = 2;
      break;
    case "March":
      month = 3;
      break;
    case "April":
      month = 4;
      break;
    case "May":
      month = 5;
      break;
    case "June":
      month = 6;
      break;
    case "July":
      month = 7;
      break;
    case "August":
      month = 8;
      break;
    case "September":
      month = 9;
      break;
    case "October":
      month = 10;
      break;
    case "November":
      month = 11;
      break;
    case "December":
      month = 12;
      break;
  }
  return month;
};

// Function to Generate de Yearly calendar
function generateYear() {
  infoSelect.innerText = `${currentYear}`;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let daysInMonth = months.map((month, index) => {
    return new Date(currentYear, index + 1, 0).getDate();
  });

  calendarYearly.innerHTML = "";

  for (let i = 0; i < months.length; i++) {
    let monthDiv = document.createElement("div");
    monthDiv.classList.add("calendar-yearly_month_container");
    calendarYearly.appendChild(monthDiv);

    let h3 = document.createElement("h3");
    h3.innerText = `${months[i]}`;
    monthDiv.appendChild(h3);

    let monthDaysContainer = document.createElement("div");
    monthDaysContainer.classList.add("calendar-yearly_month");
    monthDiv.appendChild(monthDaysContainer);

    let firstDayOfWeek = new Date(currentYear, i, 1).getDay();

    for (let k = 0; k < firstDayOfWeek; k++) {
      let emptyCell = document.createElement("button");
      emptyCell.classList.add("calendar-yearly_month_day", "empty");
      monthDaysContainer.appendChild(emptyCell);
    }

    for (let j = 0; j < daysInMonth[i]; j++) {
      let day = j + 1;
      let dayButton = document.createElement("button");
      dayButton.classList.add("calendar-yearly_month_day");
      dayButton.innerText = `${day}`;
      monthDaysContainer.appendChild(dayButton);
      dayButton.addEventListener("click", () => {
        currentDay = day;
        currentMonth = i;
        openNewTask();
      });
      dayButton.addEventListener("dblclick", () => {
        let newDate = new Date(currentYear, i + 1, day, 0);
        currentDate = newDate;
        currentMonth = newDate.getMonth();
        currentYear = newDate.getFullYear();
        currentDay = day;
        infoSelect.innerText = `${addZeroToNumber(
          currentMonth
        )} / ${currentYear}`;
        calendarDaily.classList.remove("hidden");
        calendarYearly.classList.add("hidden");
        generateAgend(currentDay);
        selectMode.value = "Day";
      });
    }
  }
}

// Functions to actualize Weekly Calendar
function getWeekStartingSunday(
  date = new Date(currentYear, currentMonth, currentDay)
) {
  let dayOfWeek = date.getDay();
  let startOfWeek = new Date(date);

  startOfWeek.setDate(date.getDate() - dayOfWeek);

  let weekNumbers = [];
  for (let i = 0; i < 7; i++) {
    let day = new Date(startOfWeek);

    day.setDate(startOfWeek.getDate() + i);
    weekNumbers.push({
      day: day.getDate(),
      month: day.getMonth(),
      year: day.getFullYear(),
    });
  }

  return weekNumbers;
}
function generateWeek() {
  calendarWeeklyDays.innerHTML = "";
  let currentWeek = getWeekStartingSunday();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < currentWeek.length; i++) {
    let dayDiv = document.createElement("button");
    let dayObj = currentWeek[i];

    dayDiv.innerHTML = `${
      dayNames[i]
    }<p class="calendar-weekly_day_number_p">${addZeroToNumber(
      dayObj.day
    )}</p>`;
    dayDiv.classList.add("calendar-weekly_day_number");
    calendarWeeklyDays.appendChild(dayDiv);
    dayDiv.addEventListener("click", () => {
      currentDay = dayObj.day;
      openNewTask();
    });
    dayDiv.addEventListener("dblclick", () => {
      currentDate = new Date(
        dayObj.year,
        dayObj.month,
        dayObj.day,
        0
      ).getDate();

      currentMonth = new Date(
        dayObj.year,
        dayObj.month,
        dayObj.day,
        0
      ).getMonth();
      currentYear = new Date(
        dayObj.year,
        dayObj.month,
        dayObj.day,
        0
      ).getFullYear();
      infoSelect.innerText = `${addZeroToNumber(
        currentMonth + 1
      )} / ${currentYear}`;
      calendarDaily.classList.remove("hidden");
      calendarWeekly.classList.add("hidden");
      currentDay = dayObj.day;
      generateAgend(dayObj.day);
      selectMode.value = "Day";
    });
  }

  let startDate = currentWeek[0];
  let endDate = currentWeek[currentWeek.length - 1];
  weekCalendarOnWeek.innerText = `${addZeroToNumber(
    startDate.day
  )} - ${addZeroToNumber(endDate.day)}       ${addZeroToNumber(
    currentMonth + 1
  )} / ${currentYear}`;
}
arrowBackCalendar.addEventListener("click", changeWeek(-7));
arrowNextCalendar.addEventListener("click", changeWeek(7));
function changeWeek(offset) {
  currentDay += offset;
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();
  if (currentDay < 1) {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    currentDay = daysInLastMonth + currentDay;
  } else if (currentDay > daysInMonth) {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    currentDay = currentDay - daysInMonth;
  }

  actualizeMonth();
  generateWeek();
}

// Fuction to actualize the day
function generateAgend(day) {
  let actualDate = infoSelect.innerHTML;
  let actualMonth = Number(actualDate.replace(/\D/g, "").slice(0, 2)) - 1;
  let actualYear = Number(actualDate.replace(/\D/g, "").slice(2, 7));
  let numberDay = currentDay;
  let newActualDate = new Date(actualYear, actualMonth, numberDay);
  let newCurrenDate = newActualDate.getDay();
  dayCalendarOnDaily.innerText = `${whichDayIsIt(
    newCurrenDate
  )} ${addZeroToNumber(numberDay)}`;

  currentMonth = actualMonth;
  currentYear = actualYear;
}
arrowBackCalendar.addEventListener("click", generateAgend);
arrowNextCalendar.addEventListener("click", generateAgend);

// Function to actualize the day when click the arrows
function changeDay(offset) {
  currentDay += offset;
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();

  if (currentDay < 1) {
    currentMonth--;
    currentDay = daysInLastMonth;
  } else if (currentDay > daysInMonth) {
    currentMonth++;
    currentDay = 1;
  }
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  actualizeMonth();
  generateAgend();
}

// Function to generate the calendar on Monthly
function generateCalendar(currentMonth, currentYear) {
  let firstDay = new Date(currentYear, currentMonth).getDay();
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();
  let lastMonthStart = daysInLastMonth - firstDay + 1;
  let daysContainer = document.getElementById("calendar-monthly");
  daysContainer.innerHTML = "";

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayNames.forEach((day) => {
    let dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    dayDiv.classList.add("calendar-monthly_day");
    daysContainer.appendChild(dayDiv);
  });
  let day = 1;
  let dayInNexMonth = 1;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let beforeDays = document.createElement("button");
        beforeDays.innerHTML = `<p class="calendar-monthly_day_number_p">${lastMonthStart}</p>`;
        beforeDays.classList.add("calendar-monthly_day_number_out-of-month");
        daysContainer.appendChild(beforeDays);
        lastMonthStart++;
        beforeDays.addEventListener("click", () => {
          currentDay = Number(beforeDays.firstElementChild.innerHTML);
          changeMonth(-1);
          openNewTask();
        });
        beforeDays.addEventListener("dblclick", () => {
          currentDay = Number(beforeDays.firstElementChild.innerHTML);
          currentDate = new Date(currentYear, currentMonth - 1, currentDay, 0);
          infoSelect.innerText = `${addZeroToNumber(
            currentMonth
          )} / ${currentYear}`;
          calendarDaily.classList.remove("hidden");
          calendarMonthly.classList.add("hidden");
          generateAgend(currentDate.getDate());
          selectMode.value = "Day";
        });
      } else if (day <= daysInMonth) {
        let dayDiv = document.createElement("button");
        dayDiv.innerHTML = `<p class="calendar-monthly_day_number_p">${day}</p>`;
        dayDiv.classList.add("calendar-monthly_day_number");
        daysContainer.appendChild(dayDiv);
        day++;
        dayDiv.addEventListener("click", () => {
          currentDay = Number(dayDiv.firstElementChild.innerHTML);
          openNewTask();
        });
        dayDiv.addEventListener("dblclick", () => {
          currentDay = Number(dayDiv.firstElementChild.innerHTML);
          currentDate = new Date(currentYear, currentMonth, currentDay, 0);
          infoSelect.innerText = `${addZeroToNumber(
            currentMonth + 1
          )} / ${currentYear}`;
          calendarDaily.classList.remove("hidden");
          calendarMonthly.classList.add("hidden");
          generateAgend(currentDate.getDate());
          selectMode.value = "Day";
        });
      } else if (day > daysInMonth) {
        let afterDays = document.createElement("button");
        afterDays.innerHTML = `<p class="calendar-monthly_day_number_p">${dayInNexMonth}</p>`;
        afterDays.classList.add("calendar-monthly_day_number_out-of-month");
        daysContainer.appendChild(afterDays);
        dayInNexMonth++;
        afterDays.addEventListener("click", () => {
          currentDay = Number(afterDays.firstElementChild.innerHTML);
          changeMonth(1);
          openNewTask();
        });
        afterDays.addEventListener("dblclick", () => {
          currentDay = Number(afterDays.firstElementChild.innerHTML);
          currentDate = new Date(currentYear, currentMonth, currentDay, 0);
          infoSelect.innerText = `${addZeroToNumber(
            currentMonth + 2
          )} / ${currentYear}`;
          calendarDaily.classList.remove("hidden");
          calendarMonthly.classList.add("hidden");
          generateAgend(currentDate.getDate());
          selectMode.value = "Day";
        });
      }
    }
  }
}

// Function to change the month and/or year
function changeMonth(offset) {
  if (
    selectMode.value === "Day" ||
    selectMode.value === "Month" ||
    selectMode.value === "Week"
  ) {
    currentMonth += offset;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    } else if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    actualizeMonth();
  } else if (selectMode.value === "Year") {
    currentYear = Number(infoSelect.innerText);
    currentYear += offset;
    generateYear();
    return;
  }
  generateCalendar(currentMonth, currentYear);
}

function openNewTask() {
  newDayActivity.classList.remove("hidden");
  dateTimeTask.value = `${currentYear}-${addZeroToNumber(
    currentMonth + 1
  )}-${addZeroToNumber(currentDay)}`;

  saveTask.addEventListener("submit", () => {
    newDayActivity.classList.add("hidden");
  });

  closeTask.addEventListener("click", () => {
    newDayActivity.classList.add("hidden");
  });
}

function initApp() {
  actualizeMonth();
  generateCalendar(currentMonth, currentYear);
  lucideMoon.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", initApp);
