let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        if (task.completed) taskCard.classList.add('completed');

        taskCard.innerHTML = `
            <span onclick="toggleTask(${index})">${task.name}</span>
            <button onclick="deleteTask(${index})">🗑️</button>
        `;

        tasksList.appendChild(taskCard);
    });
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskName = taskInput.value.trim();
    if (!taskName) return alert('Please enter a task!');

    tasks.push({ name: taskName, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
    updateStats();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    updateStats();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    updateStats();
}

// Optional: Quick prompt
function quickTaskPrompt() {
    const taskName = prompt("What's your task?");
    if (taskName) {
        tasks.push({ name: taskName, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        updateStats();
    }
}

// Initial render
renderTasks();


let weeklyTasks = JSON.parse(localStorage.getItem('weeklyTasks')) || [];

function renderWeeklyTasks() {
    const list = document.getElementById('weekly-tasks-list');
    list.innerHTML = '';

    weeklyTasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        if(task.completed) taskCard.classList.add('completed');

        taskCard.innerHTML = `
            <span>${task.name}</span>
            <br><br/>
            <label>Start Date: </lable>
            <input type="date" value="${task.startDate}" onchange="updateStartDate(${index}, this.value)">
            <br><br/>
            <label>End Date: </lable>
            <input type="date" value="${task.endDate}" onchange="updateEndDate(${index}, this.value)">
            <br><br/>
            <button onclick="toggleWeeklyTask(${index})">
                ${task.completed ? "Undo" : "Complete"}
            </button>
            <button onclick="deleteWeeklyTask(${index})">🗑️</button>
        `;
        list.appendChild(taskCard);
    });
}

function addWeeklyTask() {
    const input = document.getElementById('weekly-task-input');
    const name = input.value.trim();
    if (!name) return alert("Enter a task!");

    weeklyTasks.push({ name, startDate: '', endDate: '', completed: false });
    localStorage.setItem('weeklyTasks', JSON.stringify(weeklyTasks));
    input.value = '';
    renderWeeklyTasks();
}

function updateStartDate(index, value) {
    weeklyTasks[index].startDate = value;
    localStorage.setItem('weeklyTasks', JSON.stringify(weeklyTasks));
}

function updateEndDate(index, value) {
    weeklyTasks[index].endDate = value;
    localStorage.setItem('weeklyTasks', JSON.stringify(weeklyTasks));
}

function toggleWeeklyTask(index) {
    weeklyTasks[index].completed = !weeklyTasks[index].completed;
    localStorage.setItem('weeklyTasks', JSON.stringify(weeklyTasks));
    renderWeeklyTasks();
}

function deleteWeeklyTask(index) {
    weeklyTasks.splice(index, 1);
    localStorage.setItem('weeklyTasks', JSON.stringify(weeklyTasks));
    renderWeeklyTasks();
}

// Initial render
renderWeeklyTasks();




const habits = ["Reading", "Drink Water", "Exercise", "Journal", "Entertainment"];
const weeklyHabitsContainer = document.getElementById('weekly-habits-list');

// --- Helper Functions ---
function getWeekDates() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Sunday=0
    const monday = new Date(now);
    monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { monday, sunday };
}

function formatDate(d) {
    return `${d.getDate().toString().padStart(2,'0')}/` +
           `${(d.getMonth()+1).toString().padStart(2,'0')}/` +
           `${d.getFullYear()}`;
}

function getWeekNumber(d) {
    const oneJan = new Date(d.getFullYear(),0,1);
    return Math.ceil((((d - oneJan) / 86400000) + oneJan.getDay()+1)/7);
}

function getCurrentWeekKey() {
    const { monday } = getWeekDates();
    return `${monday.getFullYear()}-W${getWeekNumber(monday)}`;
}

// --- Initialize weekly data ---
let weeklyHabitData = JSON.parse(localStorage.getItem('weeklyHabitData')) || {};
const currentWeekKey = getCurrentWeekKey();

// Remove outdated weeks
for (let key in weeklyHabitData) {
    if (key !== currentWeekKey) delete weeklyHabitData[key];
}

// Initialize current week if not present
if (!weeklyHabitData[currentWeekKey]) {
    weeklyHabitData[currentWeekKey] = habits.map(habit => ({
        name: habit,
        days: Array(7).fill(false)
    }));
}
localStorage.setItem('weeklyHabitData', JSON.stringify(weeklyHabitData));

const today = new Date();
const todayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1; // Monday=0, Sunday=6

// --- Render Habits ---
function renderWeeklyHabits() {
    weeklyHabitsContainer.innerHTML = '';
    const { monday, sunday } = getWeekDates();

    const weekHeader = document.createElement('div');
    weekHeader.className = 'week-header';
    weekHeader.innerText = `Week: ${formatDate(monday)} – ${formatDate(sunday)}`;
    weeklyHabitsContainer.appendChild(weekHeader);

    weeklyHabitData[currentWeekKey].forEach((habit, habitIndex) => {
        const habitCard = document.createElement('div');
        habitCard.className = 'habit-card';

        let circlesHtml = habit.days.map((done, dayIndex) => {
            const clickable = dayIndex === todayIndex ? 'clickable' : '';
            return `<span class="circle ${done ? 'filled' : ''} ${clickable}" 
                    ${clickable ? `onclick="toggleDay(${habitIndex}, ${dayIndex})"` : ''}></span>`;
        }).join('');

        let message = habit.days.every(d => d) ? 
            `<div class="message">🎉 You completed ${habit.name} this week!</div>` : '';

        habitCard.innerHTML = `
            <h3>${habit.name}</h3>
            <div class="week-circles">${circlesHtml}</div>
            ${message}
        `;
        weeklyHabitsContainer.appendChild(habitCard);
    });
}

// --- Toggle Day ---
function toggleDay(habitIndex, dayIndex) {
    if (dayIndex !== todayIndex) return; // safety
    const habit = weeklyHabitData[currentWeekKey][habitIndex];
    habit.days[dayIndex] = !habit.days[dayIndex];
    localStorage.setItem('weeklyHabitData', JSON.stringify(weeklyHabitData));
    renderWeeklyHabits();
}

// --- Initial Render ---
renderWeeklyHabits();




async function fetchQuote() {
    try {
      const res = await fetch("https://dummyjson.com/quotes");
      const data = await res.json();
  
      // Pick first quote or a random one
      const randomIndex = Math.floor(Math.random() * data.quotes.length);
      const quoteObj = data.quotes[randomIndex];
  
      document.getElementById("quote").innerText = `"${quoteObj.quote}" — ${quoteObj.author}`;
    } catch (error) {
      document.getElementById("quote").innerText = "⚠️ Could not load quote. Try again.";
      console.error(error);
    }
  }
  
  function newQuote() {
    fetchQuote();
  }
  
  // Initial load
  fetchQuote();
  



