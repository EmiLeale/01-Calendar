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
const placeActivityPlace = document.querySelector(
  "#place-activity .lucide-circle-plus"
);
const placeActivityMinus = document.querySelector(
  "#place-activity .lucide-circle-minus"
);
const deleteTask = document.getElementById("delete-task");

const newActivity = document.getElementById("new-activity");
const saveActivity = document.getElementById("save-activity");
const activitiesContainer = document.getElementById("see-activities");
const slotsDay = document.getElementById("slots-day");
const selectActivity = document.querySelector("#new-day-activity select");

let dateTimeTask = document.getElementById("datetime-local");
let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let dayString;
let isDayClick = true;

let activitiesCalendar =
  JSON.parse(localStorage.getItem("activitiesOnCalendar")) || [];
let activities = JSON.parse(localStorage.getItem("activities")) || [];

function editActivity(event) {
  let btnEdit = event.target;
  let label = btnEdit
    .closest(".activity_activities_individual")
    .querySelector("label").innerText;

  for (let i = 0; i < activities.length; i++) {
    if (label === activities[i].name) {
      let activity = {
        name: activities[i].name,
        description: activities[i].description,
        color: activities[i].color,
      };

      newActivity.classList.remove("hidden");
      newActivity.querySelector("input").value = activities[i].name;
      newActivity.querySelector("div input[type=color]").value =
        activities[i].color;
      newActivity.querySelector("textarea").value = activities[i].description;

      saveActivity.onclick = () => {
        event.preventDefault();
        let actualizeActivity = {
          name: newActivity.querySelector("input").value.trim(),
          description: newActivity.querySelector("textarea").value.trim(),
          color: newActivity.querySelector("div input[type=color]").value,
        };

        if (activity.name === "" || activity.description === "") {
          window.alert("Please enter a title and a description");
          return;
        }

        activitiesCalendar = activitiesCalendar.map((task) => {
          if (task.activity === activities[i].name) {
            return {
              ...task, // Mantiene los datos originales
              activity: actualizeActivity.name,
              description: actualizeActivity.description,
              color: actualizeActivity.color,
            };
          }
          return task;
        });

        localStorage.setItem(
          "activitiesOnCalendar",
          JSON.stringify(activitiesCalendar)
        );

        console.log("Calendario actualizado:", activitiesCalendar);

        activities[i] = actualizeActivity;

        localStorage.setItem("activities", JSON.stringify(activities));

        initApp();

        newActivity.querySelector("input").value = "";
        newActivity.querySelector("div input[type=color]").value = "#000000";
        newActivity.querySelector("textarea").value = "";
      };
    }
  }
}

function createActivity() {
  newActivity.querySelector("input").value = "";
  newActivity.querySelector("div input[type=color]").value = "#000000";
  newActivity.querySelector("textarea").value = "";

  if (activitiesContainer.classList.contains("hidden")) {
    newActivity.classList.remove("hidden");

    placeActivityMinus.classList.remove("hidden");
    placeActivityPlace.classList.add("hidden");
  } else {
    newActivity.classList.toggle("hidden");
    placeActivityMinus.classList.toggle("hidden");
    placeActivityPlace.classList.toggle("hidden");
  }
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

function loadActivities() {
  let activities = JSON.parse(localStorage.getItem("activities")) || [];
  activitiesContainer.classList.remove("hidden");
  activitiesContainer.innerHTML = ``;
  selectActivity.innerHTML = `<option value="" disabled selected>Select activity</option>`;

  activities.forEach((activity, i) => {
    divTask = document.createElement("div");
    activitiesContainer.appendChild(divTask);
    divTask.classList.add("activity_activities_individual");
    divTask.innerHTML = `<input type="checkbox" id="checkbox${i}" class="checkbox-activity"><label class="activity_name-of-activity" for="checkbox${i}">${activities[i].name}</label><button onclick="editActivity(event)"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg></button>`;

    let checkBox = document.getElementById(`checkbox${i}`);
    checkBox.checked = true;
    checkBox.onchange = () => {
      let content = checkBox.parentElement.querySelector("label").innerText;
      let ver = Array.from(document.querySelectorAll(".calendar button div"));
      let verName = ver.filter((button) => button.innerText === content);
      verName.forEach((button) =>
        button.setAttribute("data-content", button.innerText.trim())
      );
      let verName1 = ver.filter((button) => button.dataset.content === content);
      if (checkBox.checked) {
        verName1.forEach((button) => button.classList.remove("hidden"));
      } else {
        verName1.forEach((button) => button.classList.add("hidden"));
      }
    };

    option = document.createElement("option");
    selectActivity.appendChild(option);
    option.id = `activity${i}`;
    option.value = `${activities[i].name}`;
    option.innerHTML = `${activities[i].name}`;
  });
}

function openNewTask() {
  dateTimeTask.value = `${currentYear}-${addZeroToNumber(
    currentMonth + 1
  )}-${addZeroToNumber(currentDay)}`;
  newDayActivity.classList.remove("hidden");

  if (isDayClick) {
    newDayActivity.querySelector("select").value = "";
    newDayActivity.querySelector("div input[type=color]").value = "#000000";
    newDayActivity.querySelector("div input[type=text]").value = "";
    deleteTask.classList.add("hidden");

    saveTask.onclick = () => {
      event.preventDefault();
      if (selectActivity.value === "") {
        window.alert("Please select an activity");
      } else {
        newDayActivity.classList.add("hidden");
        addTaskToDay();
        newDayActivity.querySelector("select").value = "";
        newDayActivity.querySelector("div input[type=color]").value = "#000000";
        newDayActivity.querySelector("div input[type=text]").value = "";
        if (selectMode.value === "Year") {
          generateYear();
        } else if (selectMode.value === "Month") {
          generateCalendar(currentMonth, currentYear);
        } else if (selectMode.value === "Week") {
          generateWeek();
        } else {
          generateAgend(currentDay);
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
            newDayActivity.querySelector("div input[type=text]").value =
              activity.description;
          }
        });
      }
    };
  }
}

function addTaskToDay() {
  currentDay = Number(dateTimeTask.value.slice(8, 10));
  currentMonth = Number(dateTimeTask.value.slice(5, 7)) - 1;
  currentYear = Number(dateTimeTask.value.slice(0, 4));

  let activity = selectActivity.value;
  let description = newDayActivity.querySelector("div input[type=text]").value;
  let color = newDayActivity.querySelector("div input[type=color]").value;
  let task = {
    activity: activity,
    description: description,
    date: `${currentYear}/${addZeroToNumber(
      currentMonth + 1
    )}/${addZeroToNumber(currentDay)}`,
    day: `${addZeroToNumber(currentDay)}`,
    month: `${addZeroToNumber(currentMonth + 1)}`,
    year: `${currentYear}`,
    color: color,
  };

  activitiesCalendar.push(task);
  localStorage.setItem(
    "activitiesOnCalendar",
    JSON.stringify(activitiesCalendar)
  );
}

function editTask() {
  let divDaysTask = Array.from(
    document.querySelectorAll(".container-days-calendar")
  );
  divDaysTask.forEach((task) => {
    task.onclick = () => {
      let activity;
      let color;
      let description;
      let date;
      if (
        selectMode.value === "Month" ||
        selectMode.value === "Week" ||
        selectMode.value === "Year"
      ) {
        activity = task.innerText;
        color = task.lastChild.innerText.slice(0, 7);
        description = task.lastChild.innerText.slice(19);
        date = task.lastChild.innerText.slice(8, 18);
      } else if (selectMode.value === "Day") {
        activity = task.firstElementChild.innerText;
        color = task.lastElementChild.innerText.slice(10);
        description = task.firstElementChild.nextElementSibling.innerText;
        date = task.lastElementChild.innerText.slice(0, 10);
      }

      selectActivity.value = activity;
      newDayActivity.querySelector("div input[type=color]").value = color;
      newDayActivity.querySelector("div input[type=text]").value = description;
      newDayActivity.classList.remove("hidden");
      deleteTask.classList.remove("hidden");

      isDayClick = false;
      setTimeout(() => {
        isDayClick = true;
      }, 300);

      let lastTask = {
        activity: activity,
        description: description,
        date: date,
        day: date.slice(8, 10),
        month: date.slice(5, 7),
        year: date.slice(0, 4),
        color: color,
      };
      let index = activitiesCalendar.findIndex(
        (task) =>
          task.activity === lastTask.activity &&
          task.description === lastTask.description &&
          task.date === lastTask.date &&
          task.day === lastTask.day &&
          task.month === lastTask.month &&
          task.year === lastTask.year &&
          task.color === lastTask.color
      );
      deleteTask.onclick = () => {
        if (index !== -1) {
          activitiesCalendar.splice(index, 1);
          localStorage.setItem(
            "activitiesOnCalendar",
            JSON.stringify(activitiesCalendar)
          );
        }
      };
      selectActivity.onchange = () => {
        if (selectActivity.value !== "") {
          activities.forEach((activity) => {
            currentSelect =
              selectActivity.options[selectActivity.selectedIndex].text;
            if (currentSelect === activity.name) {
              newDayActivity.querySelector("div input[type=color]").value =
                activity.color;
              newDayActivity.querySelector("div input[type=text]").value =
                activity.description;
              saveTask.onclick = () => {
                event.preventDefault();
                activitiesCalendar.splice(index, 1);
                localStorage.setItem(
                  "activitiesOnCalendar",
                  JSON.stringify(activitiesCalendar)
                );
                addTaskToDay();
                newDayActivity.classList.add("hidden");
                newDayActivity.querySelector("select").value = "";
                newDayActivity.querySelector("div input[type=color]").value =
                  "#000000";
                newDayActivity.querySelector("div input[type=text]").value = "";
                if (selectMode.value === "Year") {
                  generateYear();
                } else if (selectMode.value === "Month") {
                  generateCalendar(currentMonth, currentYear);
                } else if (selectMode.value === "Week") {
                  generateWeek();
                } else {
                  generateAgend(currentDay);
                }
              };
            }
          });
        }
      };

      closeTask.onclick = () => {
        event.preventDefault();
        newDayActivity.classList.add("hidden");
      };
    };
  });
}

function areThereTasks(container, day, month, year) {
  if (
    selectMode.value === "Month" ||
    selectMode.value === "Week" ||
    selectMode.value === "Year"
  ) {
    activitiesCalendar.forEach((activity) => {
      editTask();
      if (
        month + 1 === Number(activity.month) &&
        day === Number(activity.day) &&
        year === Number(activity.year)
      ) {
        let datos = document.createElement("div");
        datos.style.backgroundColor = `${activity.color}aa`;
        datos.classList.add("calendar_day_datos");
        datos.classList.add("container-days-calendar");
        datos.innerText = activity.activity;
        let p = document.createElement("p");
        p.innerText = `${activity.color} ${activity.date} ${activity.description}`;
        p.classList.add("hidden");
        datos.appendChild(p);
        container.appendChild(datos);

        if (selectMode.value === "Month") {
          if (container.children.length > 4) {
            Array.from(container.children).forEach((child, i) => {
              if (i >= 4) {
                child.classList.add("hidden");
              }
            });
          }
        } else if (selectMode.value === "Week") {
          datos.classList.add("calendar_day_datos_weekly");
          datos.classList.remove("calendar_day_datos");
          if (container.children.length > 9) {
            Array.from(container.children).forEach((child, i) => {
              if (i >= 9) {
                child.classList.add("hidden");
              }
            });
          }
        } else if (selectMode.value === "Year") {
          if (container.children.length > 0) {
            Array.from(container.children).forEach((child, i) => {
              if (i >= 0) {
                child.classList.add("hidden");
                container.style.backgroundColor = `${activity.color}aa`;
              }
            });
          }
        }
      }
    });
  } else if (selectMode.value === "Day") {
    let slots = Array.from(container).slice(1, 13);
    let usedSlots = new Set();

    activitiesCalendar.forEach((activity) => {
      editTask();
      if (
        Number(activity.month) === month + 1 &&
        Number(activity.day) === day &&
        Number(activity.year) === year
      ) {
        let slot = undefined;

        for (let i = 0; i < slots.length; i++) {
          let s = slots[i];
          if (!usedSlots.has(s)) {
            slot = s;
            break;
          }
        }
        if (slot) {
          slot.innerHTML = `<div class="container-days-calendar"><h3>${activity.activity}</h3><p>${activity.description}</p><p class="hidden">${activity.date}${activity.color}</p></div>`;
          slot.firstElementChild.style.backgroundColor = `${activity.color}aa`;
          usedSlots.add(slot);
        }
      }
    });
  }
}

//Switch the theme of the page
function changeTheme() {
  if (link.href.endsWith("styles.css")) {
    link.href = link.href.replace("styles.css", "styles-night.css");
    lucideSun.classList.remove("hidden");
    lucideMoon.classList.add("hidden");
  } else if (link.href.endsWith("styles-night.css")) {
    link.href = link.href.replace("styles-night.css", "styles.css");
    lucideSun.classList.add("hidden");
    lucideMoon.classList.remove("hidden");
  } else {
    link.href = link.href.replace("styles.css", "styles-night.css");
    lucideSun.classList.remove("hidden");
    lucideMoon.classList.add("hidden");
  }
}
switchTheme.addEventListener("click", changeTheme);

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
      actualizeMonth();
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
  if (selectMode.value === "Year") {
    infoSelect.innerText = `${currentYear}`;
  } else {
    infoSelect.innerText = `${addZeroToNumber(
      currentMonth + 1
    )} / ${currentYear}`;
  }
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
    h3.style.cursor = "pointer";
    h3.onclick = () => {
      calendarYearly.innerHTML = "";
      currentMonth = whichMonthIsIt(months[i]) - 1;
      selectMode.value = "Month";
      switchMode();
    };

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

      areThereTasks(dayButton, day, i, currentYear);

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
            let newDate = new Date(currentYear, i, day, 0);
            currentDate = newDate;
            currentMonth = newDate.getMonth();
            currentYear = newDate.getFullYear();
            currentDay = day;
            calendarDaily.classList.remove("hidden");
            calendarYearly.classList.add("hidden");
            selectMode.value = "Day";
            newDayActivity.classList.add("hidden");
            actualizeMonth();
            generateAgend(currentDay);
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

    areThereTasks(dayDiv, dayObj.day, dayObj.month, dayObj.year);

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
          selectMode.value = "Day";
          newDayActivity.classList.add("hidden");
          generateAgend(dayObj.day);
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
  slotsDay.innerHTML = "";
  let newActualDate = new Date(currentYear, currentMonth, currentDay);
  let newCurrenDate = newActualDate.getDay();
  dayCalendarOnDaily.innerText = `${whichDayIsIt(
    newCurrenDate
  )} ${addZeroToNumber(currentDay)}`;

  horarios = document.createElement("div");
  horarios.classList.add("calendar-day_horarios_horarios");
  horarios.innerHTML = `<span>6hs</span><span>10hs</span><span>14hs</span><span>18hs</span><span>20hs</span>`;
  slotsDay.appendChild(horarios);

  for (let i = 0; i < 12; i++) {
    slot = document.createElement("button");
    slot.classList.add("calendar-day_horarios_2hs");
    slotsDay.appendChild(slot);
    slot.onclick = () => {
      openNewTask();
    };
  }

  areThereTasks(slotsDay.children, currentDay, currentMonth, currentYear);
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
        };
      } else if (day <= daysInMonth) {
        let dayDiv = document.createElement("button");
        dayDiv.innerHTML = `<p class="calendar-monthly_day_number_p">${day}</p>`;
        dayDiv.classList.add("calendar-monthly_day_number");
        daysContainer.appendChild(dayDiv);
        areThereTasks(dayDiv, day, currentMonth, currentYear);
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
              selectMode.value = "Day";
              newDayActivity.classList.add("hidden");
              generateAgend(currentDate.getDate());
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
    currentMonth = 0;

    y = new Date(currentYear, currentMonth, 1);
    currentYear = y.getFullYear();
    currentMonth = y.getMonth();
    currentDay = y.getDate();
    actualizeMonth();
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
