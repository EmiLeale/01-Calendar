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
const activitiesContainer = document.getElementById("see-activities");

let dateTimeTask = document.getElementById("datetime-local");
let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let dayString;

console.log(currentDate);

let activitiesCalendar =
  JSON.parse(localStorage.getItem("activitiesOnCalendar")) || [];
let activities = JSON.parse(localStorage.getItem("activities")) || [];

function createActivity() {
  newActivity.classList.toggle("hidden");
  saveActivity.onclick = () => {
    event.preventDefault();
    let activity = {
      name: newActivity.querySelector("input").value.trim(),
      description: newActivity.querySelector("textarea").value.trim(),
      color: newActivity.querySelector("div input[type=color]").value,
    };
    if (activity.name === "" || activity.description === "") {
      window.alert("Please enter a title and a description");
      return;
    }
    activities.push(activity);
    localStorage.setItem("activities", JSON.stringify(activities));
    loadActivities();
    newActivity.querySelector("input").value = "";
    newActivity.querySelector("div input[type=color]").value = "#000000";
    newActivity.querySelector("textarea").value = "";
  };
}
placeActivity.addEventListener("click", createActivity);
const selectActivity = document.querySelector("#new-day-activity select");

function loadActivities() {
  let activities = JSON.parse(localStorage.getItem("activities")) || [];
  activitiesContainer.classList.remove("hidden");
  activitiesContainer.innerHTML = ``;
  selectActivity.innerHTML = `<option value="" disabled selected>Select activity</option>`;

  activities.forEach((activity, i) => {
    divTask = document.createElement("div");
    activitiesContainer.appendChild(divTask);
    divTask.classList.add("activity_activities_individual");
    divTask.innerHTML = `<input type="checkbox" id="checkbox${i}"><label class="activity_name-of-activity" for="checkbox${i}">${activities[i].name}</label>`;

    option = document.createElement("option");
    selectActivity.appendChild(option);
    option.id = `activity${i}`;
    option.innerHTML = `<option value="${i}">${activities[i].name}</option>`;
  });
}

function openNewTask() {
  newDayActivity.classList.remove("hidden");

  dateTimeTask.value = `${currentYear}-${addZeroToNumber(
    currentMonth + 1
  )}-${addZeroToNumber(currentDay)}`;

  saveTask.onclick = () => {
    event.preventDefault();
    if (selectActivity.value === "") {
      window.alert("Please select an activity");
    } else {
      newDayActivity.classList.add("hidden");
      addTaskToDay();
      newDayActivity.querySelector("select").value = "";
      newDayActivity.querySelector("div input[type=color]").value = "#000000";
      if (selectMode.value === "Year") {
        generateYear();
      } else if (selectMode.value === "Month") {
        generateCalendar(currentMonth, currentYear);
      } else if (selectMode.value === "Week") {
        generateWeek();
      }
    }
  };

  closeTask.onclick = () => {
    event.preventDefault();
    newDayActivity.classList.add("hidden");
  };

  selectActivity.onchange = () => {
    if (selectActivity.value !== "") {
      activities.forEach((activity) => {
        currentSelect =
          selectActivity.options[selectActivity.selectedIndex].text;
        if (currentSelect === activity.name) {
          newDayActivity.querySelector("div input[type=color]").value =
            activity.color;
        }
      });
    }
  };
}

function addTaskToDay() {
  currentDay = Number(dateTimeTask.value.slice(8, 10));
  currentMonth = Number(dateTimeTask.value.slice(5, 7)) - 1;
  currentYear = Number(dateTimeTask.value.slice(0, 4));

  let activity = selectActivity.value;
  let color = newDayActivity.querySelector("div input[type=color]").value;

  let task = {
    activity: activity,
    date: `${currentYear}/${addZeroToNumber(
      currentMonth + 1
    )}/${addZeroToNumber(currentDay)}`,
    day: `${currentDay}`,
    month: `${currentMonth}`,
    year: `${currentYear}`,
    color: color,
  };

  activitiesCalendar.push(task);
  localStorage.setItem(
    "activitiesOnCalendar",
    JSON.stringify(activitiesCalendar)
  );
}

function areThereTasks(container, day) {
  activitiesCalendar.forEach((activity) => {
    if (
      currentMonth === Number(activity.month) &&
      day === Number(activity.day)
    ) {
      let datos = document.createElement("p");
      datos.style.backgroundColor = `${activity.color}`;
      datos.classList.add("calendar_day_datos");
      datos.innerText = activity.activity;
      container.appendChild(datos);
    }
  });

  if (selectMode.value === "Month") {
    if (container.children.length > 4) {
      Array.from(container.children).forEach((child, i) => {
        if (i >= 4) {
          child.classList.add("hidden");
        }
      });
    }
  } else if (selectMode.value === "Week") {
    if (container.children.length > 22) {
      Array.from(container.children).forEach((child, i) => {
        if (i >= 22) {
          child.classList.add("hidden");
        }
      });
    }
  } else if (selectMode.value === "Year") {
    if (container.children.length > 0) {
      Array.from(container.children).forEach((child, i) => {
        if (i >= 0) {
          child.classList.add("hidden");
          container.style.backgroundColor = "red";
        }
      });
    }
  }
}

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
      newDayActivity.classList.add("hidden");
      actualizeMonth();
      generateAgend();
      break;
    case "Week":
      calendarWeekly.classList.remove("hidden");
      calendarMonthly.classList.add("hidden");
      calendarDaily.classList.add("hidden");
      calendarYearly.classList.add("hidden");
      newDayActivity.classList.add("hidden");
      actualizeMonth();
      generateWeek();
      break;
    case "Year":
      calendarYearly.classList.remove("hidden");
      calendarMonthly.classList.add("hidden");
      calendarWeekly.classList.add("hidden");
      calendarDaily.classList.add("hidden");
      newDayActivity.classList.add("hidden");
      generateYear();
      break;
    default:
      calendarMonthly.classList.remove("hidden");
      calendarDaily.classList.add("hidden");
      calendarWeekly.classList.add("hidden");
      calendarYearly.classList.add("hidden");
      newDayActivity.classList.add("hidden");
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

      areThereTasks(dayButton, day);

      let clickCount = 0;
      dayButton.onclick = () => {
        event.preventDefault();
        clickCount++;
        if (clickCount === 1) {
          setTimeout(function () {
            if (clickCount === 1) {
              currentDay = day;
              currentMonth = i;
              openNewTask();
            }
            clickCount = 0;
          }, 250);
        } else if (clickCount === 2) {
          clickCount = 0;
          dayButton.ondblclick = () => {
            event.preventDefault();
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
            newDayActivity.classList.add("hidden");
          };
        }
      };
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

    areThereTasks(dayDiv, dayObj.day);

    let clickCount = 0;
    dayDiv.onclick = () => {
      clickCount++;
      if (clickCount === 1) {
        setTimeout(function () {
          if (clickCount === 1) {
            currentDay = dayObj.day;
            openNewTask();
          }
          clickCount = 0;
        }, 250);
      } else if (clickCount === 2) {
        clickCount = 0;
        dayDiv.ondblclick = () => {
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
          newDayActivity.classList.add("hidden");
        };
      }
    };
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
        beforeDays.onclick = () => {
          currentDay = Number(beforeDays.firstElementChild.innerHTML);
          changeMonth(-1);
          openNewTask();
        };
      } else if (day <= daysInMonth) {
        let dayDiv = document.createElement("button");
        dayDiv.innerHTML = `<p class="calendar-monthly_day_number_p">${day}</p>`;
        dayDiv.classList.add("calendar-monthly_day_number");
        daysContainer.appendChild(dayDiv);

        areThereTasks(dayDiv, day);

        day++;
        let clickCount = 0;
        dayDiv.onclick = () => {
          clickCount++;
          if (clickCount === 1) {
            setTimeout(function () {
              if (clickCount === 1) {
                currentDay = Number(dayDiv.firstElementChild.innerHTML);
                openNewTask();
              }
              clickCount = 0;
            }, 250);
          } else if (clickCount === 2) {
            clickCount = 0;
            dayDiv.ondblclick = () => {
              currentDay = Number(dayDiv.firstElementChild.innerHTML);
              currentDate = new Date(currentYear, currentMonth, currentDay, 0);
              infoSelect.innerText = `${addZeroToNumber(
                currentMonth + 1
              )} / ${currentYear}`;
              calendarDaily.classList.remove("hidden");
              calendarMonthly.classList.add("hidden");
              generateAgend(currentDate.getDate());
              selectMode.value = "Day";
              newDayActivity.classList.add("hidden");
            };
          }
        };
      } else if (day > daysInMonth) {
        let afterDays = document.createElement("button");
        afterDays.innerHTML = `<p class="calendar-monthly_day_number_p">${dayInNexMonth}</p>`;
        afterDays.classList.add("calendar-monthly_day_number_out-of-month");
        daysContainer.appendChild(afterDays);
        dayInNexMonth++;
        afterDays.onclick = () => {
          currentDay = Number(afterDays.firstElementChild.innerHTML);
          changeMonth(1);
          openNewTask();
        };
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

function initApp() {
  actualizeMonth();
  generateCalendar(currentMonth, currentYear);
  lucideMoon.classList.add("hidden");

  if (localStorage.length === 0) {
    createActivity();
  } else {
    loadActivities();
  }

  document.onclick = (e) => {
    let clickInside = document
      .querySelector("body .calendar")
      .contains(e.target);
    if (!clickInside) {
      newDayActivity.classList.add("hidden");
    }
  };
}

document.addEventListener("DOMContentLoaded", initApp);
