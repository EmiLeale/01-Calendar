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

let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
console.log(currentDate);
let dayString;

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
      infoSelect.innerText = `${currentYear}`;

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

// function getWeekStartingSunday(
//   date = new Date(`${currentYear} ${currentMonth + 1} ${currentDay}`)
// ) {
//   let dayOfWeek = date.getDay();
//   let startOfWeek = new Date(date);
//   startOfWeek.setDate(date.getDate() - dayOfWeek);
//   let weekNumbers = [];

//   let sunday = startOfWeek.getDate();

//   for (let i = 0; i < 7; i++) {
//     weekNumbers.push(sunday + i);
//   }

//   return weekNumbers;
// }
function getWeekStartingSunday(
  date = new Date(currentYear, currentMonth, currentDay)
) {
  let dayOfWeek = date.getDay();
  let startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);

  // Si la semana comienza en el mes anterior, ajustamos el mes
  if (startOfWeek.getMonth() !== currentMonth) {
    startOfWeek.setMonth(currentMonth);
    startOfWeek.setDate(1); // Comenzamos desde el primer día del mes actual
  }

  let weekNumbers = [];
  for (let i = 0; i < 7; i++) {
    let day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekNumbers.push({
      day: day.getDate(),
      month: day.getMonth() + 1,
      year: day.getFullYear(),
    });
  }
  return weekNumbers;
}
function generateWeek() {
  calendarWeeklyDays.innerHTML = "";
  let currentWeek = getWeekStartingSunday();
  console.log(getWeekStartingSunday());

  for (let i = 0; i < currentWeek.length; i++) {
    let dayDiv = document.createElement("div");
    let dayObj = currentWeek[i];
    dayDiv.innerHTML = `${whichDayIsIt(i)} ${addZeroToNumber(dayObj.day)}`;
    dayDiv.classList.add("calendar-weekly_day_number");
    calendarWeeklyDays.appendChild(dayDiv);
  }

  // Mostramos el rango de la semana
  let startDate = currentWeek[0];
  let endDate = currentWeek[currentWeek.length - 1];
  weekCalendarOnWeek.innerText = `${addZeroToNumber(
    startDate.day
  )} - ${addZeroToNumber(endDate.day)}`;
}
// function generateWeek() {
//   day = currentDay;
//   calendarWeeklyDays.innerHTML = "";

//   let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//   let currentWeek = getWeekStartingSunday();
//   console.log(currentDay, currentWeek);
//   if (currentWeek.includes(daysInMonth + 1)) {
//     for (let i = 0; i < currentWeek.length; i++) {
//       if (currentWeek[i] > daysInMonth) {
//         currentWeek[i] = 1;
//       }
//     }
//   }

//   for (let i = 0; i < 1; i++) {
//     for (let j = 0; j < 7; j++) {
//       let dayDiv = document.createElement("div");
//       switch (j) {
//         case (j = 0):
//           dayDiv.innerHTML = `<p class="calendar-weekly_day_number_p">Sun</p><p class="calendar-weekly_day_number_p">${addZeroToNumber(
//             currentWeek[0]
//           )}</p>`;
//           break;
//         case (j = 1):
//           dayDiv.innerHTML = `<p class="calendar-weekly_day_number_p">Mon</p><p class="calendar-weekly_day_number_p">${addZeroToNumber(
//             currentWeek[1]
//           )}</p>`;
//           break;
//         case (j = 2):
//           dayDiv.innerHTML = `<p class="calendar-weekly_day_number_p">Tue</p><p class="calendar-weekly_day_number_p">${addZeroToNumber(
//             currentWeek[2]
//           )}</p>`;
//           break;
//         case (j = 3):
//           dayDiv.innerHTML = `<p class="calendar-weekly_day_number_p">Wed</p><p class="calendar-weekly_day_number_p">${addZeroToNumber(
//             currentWeek[3]
//           )}</p>`;
//           break;
//         case (j = 4):
//           dayDiv.innerHTML = `<p class="calendar-weekly_day_number_p">Thu</p><p class="calendar-weekly_day_number_p">${addZeroToNumber(
//             currentWeek[4]
//           )}</p>`;
//           break;
//         case (j = 5):
//           dayDiv.innerHTML = `<p class="calendar-weekly_day_number_p">Fri</p><p class="calendar-weekly_day_number_p">${addZeroToNumber(
//             currentWeek[5]
//           )}</p>`;
//           break;
//         case (j = 6):
//           dayDiv.innerHTML = `<p class="calendar-weekly_day_number_p">Sat</p><p class="calendar-weekly_day_number_p">${addZeroToNumber(
//             currentWeek[6]
//           )}</p>`;
//           break;
//       }
//       dayDiv.classList.add("calendar-weekly_day_number");
//       calendarWeeklyDays.appendChild(dayDiv);
//       day++;
//     }
//   }
//   weekCalendarOnWeek.innerText = `${addZeroToNumber(
//     currentWeek[0]
//   )} to ${addZeroToNumber(currentWeek[6])}`;
// }

arrowBackCalendar.addEventListener("click", generateWeek);
arrowNextCalendar.addEventListener("click", generateWeek);

function changeWeek(offset) {
  currentDay += offset; // Cambiamos de semana

  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();

  if (currentDay < 1) {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    currentDay = daysInLastMonth + currentDay; // Ajustamos el día
  } else if (currentDay > daysInMonth) {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    currentDay = currentDay - daysInMonth; // Ajustamos el día
  }

  actualizeMonth();
  generateWeek();
}
// function changeWeek(offset) {
//   let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//   let daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();
//   currentDay += offset;

//   if (currentDay < 1) {
//     currentMonth--;
//     currentDay = daysInLastMonth;
//   } else if (currentDay > daysInMonth) {
//     currentMonth++;
//     currentDay = 1;
//   }
//   if (currentMonth < 0) {
//     currentMonth = 11;
//     currentYear--;
//   } else if (currentMonth > 11) {
//     currentMonth = 0;
//     currentYear++;
//   }
//   actualizeMonth();
//   generateWeek();
// }

// Fuction to actualize the day
function generateAgend() {
  let actualDate = infoSelect.innerHTML;
  let actualMonth = actualDate.replace(/\D/g, "").slice(0, 2);
  let actualYear = actualDate.replace(/\D/g, "").slice(2, 7);
  let numberDay = currentDay;
  let newActualDate = new Date(`${actualYear} ${actualMonth} ${numberDay}`);
  let newCurrenDate = newActualDate.getDay();

  dayCalendarOnDaily.innerText = `${whichDayIsIt(
    newCurrenDate
  )} ${addZeroToNumber(numberDay)}`;
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
        let beforeDays = document.createElement("div");
        beforeDays.innerHTML = `<p class="calendar-monthly_day_number_p">${lastMonthStart}</p>`;
        beforeDays.classList.add("calendar-monthly_day_number_out-of-month");
        daysContainer.appendChild(beforeDays);
        lastMonthStart++;
      } else if (day <= daysInMonth) {
        let dayDiv = document.createElement("div");
        dayDiv.innerHTML = `<p class="calendar-monthly_day_number_p">${day}</p>`;
        dayDiv.classList.add("calendar-monthly_day_number");
        daysContainer.appendChild(dayDiv);
        day++;
      } else if (day > daysInMonth) {
        let afterDays = document.createElement("div");
        afterDays.innerHTML = `<p class="calendar-monthly_day_number_p">${dayInNexMonth}</p>`;
        afterDays.classList.add("calendar-monthly_day_number_out-of-month");
        daysContainer.appendChild(afterDays);
        dayInNexMonth++;
      }
    }
  }
}

function changeMonth(offset) {
  currentMonth += offset;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  actualizeMonth();
  generateCalendar(currentMonth, currentYear);
}

function initApp() {
  actualizeMonth();
  generateCalendar(currentMonth, currentYear);
}

document.addEventListener("DOMContentLoaded", initApp);
