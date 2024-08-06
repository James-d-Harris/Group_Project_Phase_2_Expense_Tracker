const fullDate = new Date();
const today = new Date(Date.UTC(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate()));
const oneMonthAgo = new Date(today);
oneMonthAgo.setUTCMonth(today.getUTCMonth() - 1);

const baseCategoryColors = {
    "Rent": "#FF0000",
    "Food": "#FF5733",
    "Maintenance": "#0000FF",
    "Fun": "#FF00FF",
    "Misc": "#FFFF00",
    "Deposit": "#00FF00"
};

let categoryColors = {}

let expenses = [
    { category: "Fun", location: "Netflix", description: "Subscription", amount: -15.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2) },
    { category: "Food", location: "Walmart", description: "Groceries", amount: -97.35, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2) },
    { category: "Maintenance", location: "Jiffy Lube", description: "Oil Change", amount: -25.19, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10) },
    { category: "Maintenance", location: "Circle K", description: "Gas", amount: -43.82, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 12) },
    { category: "Rent", location: "Apartment", description: "Monthly Rent", amount: -1200.00, date: new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() - 5) },
    { category: "Food", location: "Trader Joe's", description: "Groceries", amount: -45.60, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8) },
    { category: "Fun", location: "Movie Theater", description: "Movie Tickets", amount: -25.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 15) },
    { category: "Misc", location: "Amazon", description: "Online Shopping", amount: -50.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 20) },
    { category: "Food", location: "Whole Foods", description: "Groceries", amount: -89.75, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 25) },
    { category: "Maintenance", location: "Car Wash", description: "Car Wash", amount: -12.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 28) },
    { category: "Fun", location: "Hulu", description: "Subscription", amount: -12.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3) },
    { category: "Food", location: "Costco", description: "Groceries", amount: -150.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7) },
    { category: "Fun", location: "Bowling Alley", description: "Bowling Night", amount: -30.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14) },
    { category: "Misc", location: "Best Buy", description: "Electronics", amount: -100.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 18) },
    { category: "Food", location: "Safeway", description: "Groceries", amount: -65.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 22) },
    { category: "Maintenance", location: "Mechanic", description: "Car Repair", amount: -250.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 27) },
    { category: "Fun", location: "Spotify", description: "Subscription", amount: -10.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1) },
    { category: "Food", location: "Trader Joe's", description: "Groceries", amount: -45.60, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 9) },
    { category: "Fun", location: "Concert", description: "Concert Tickets", amount: -75.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 13) },
    { category: "Misc", location: "Home Depot", description: "Home Improvement", amount: -80.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 16) },
    { category: "Food", location: "Trader Joe's", description: "Groceries", amount: -45.60, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 21) },
    { category: "Fun", location: "Gym", description: "Monthly Membership", amount: -50.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 26) },
    { category: "Maintenance", location: "Mechanic", description: "Tire Change", amount: -80.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30) },
    { category: "Rent", location: "Apartment", description: "Monthly Rent", amount: -1200.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate()) },
    { category: "Fun", location: "Disney+", description: "Subscription", amount: -7.99, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2) },
    { category: "Food", location: "Trader Joe's", description: "Groceries", amount: -45.60, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4) },
    { category: "Fun", location: "Amusement Park", description: "Entry Tickets", amount: -100.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8) },
    { category: "Misc", location: "Walmart", description: "Household Items", amount: -20.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6) },
    { category: "Deposit", location: "Bank", description: "Salary", amount: 2000.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1) },
    { category: "Deposit", location: "Bank", description: "Freelance Work", amount: 500.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10) },
];

let currentEditIndex = null;

function getFilteredExpenses() {
    if ( expenses.length > 0 ) {
        return expenses.filter(expense => expense.date >= oneMonthAgo).sort((a, b) => b.date - a.date);
    } else {
        return {}
    }
}

function getAllExpenses() {
    if ( expenses.length > 0 ) {
        return expenses.sort((a, b) => b.date - a.date);
    } else {
        return {}
    }
}

function formatDate(date) {
    return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
}

function formatAmount(amount) {
    if (amount > 0) {
        return `<span class="amount-positive">+${amount.toFixed(2)}</span>`;
    } else {
        return `<span class="amount-negative">${amount.toFixed(2)}</span>`;
    }
}

function populateExpenses() {
    const expensesList = document.getElementById('expenses-list');
    expensesList.innerHTML = '';

    const sortedExpenses = getAllExpenses();

    if ( sortedExpenses.length > 0 ) {
        sortedExpenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><span class="category-badge" style="background-color: ${categoryColors[expense.category] || '#FFFFFF'};">${expense.category}</span></td>
                <td>${expense.location}</td>
                <td>${expense.description}</td>
                <td>${formatAmount(expense.amount)}</td>
                <td>${formatDate(expense.date)}</td>
                <td>
                    <button class="edit-expense-button" onclick="editExpense(${index})">Edit</button>
                    <button class="delete-expense-button" onclick="deleteExpense('${expense._id}')">Delete</button>
                </td>
            `;
            expensesList.appendChild(row);
        });
    }
}

function calculateCategoryTotals() {
    const categoryTotals = {};

    const filteredExpenses = getFilteredExpenses()


    if ( filteredExpenses.length > 0 ) {
        filteredExpenses.forEach(expense => {
            if (expense.category !== "Deposit") {
                if (!categoryTotals.hasOwnProperty(expense.category)) {
                    categoryTotals[expense.category] = 0;
                }
                categoryTotals[expense.category] += Math.abs(expense.amount);
            }
        });
    }

    return categoryTotals;
}

function calculateIncomeExpenseDifference() {
    let totalIncome = 0;

    const filteredExpenses = getFilteredExpenses()


    if ( filteredExpenses.length > 0 ) {
        filteredExpenses.forEach(expense => {
            totalIncome += expense.amount;
        });
    }

    return totalIncome;
}

let barChart;
let pieChart;

function setupCharts() {
    const barCtx = document.getElementById('bar-chart').getContext('2d');
    const pieCtx = document.getElementById('pie-chart').getContext('2d');

    if (barChart) barChart.destroy();
    if (pieChart) pieChart.destroy();

    const categoryTotals = calculateCategoryTotals();
    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);
    const colors = categories.map(category => categoryColors[category]);
    const textColor = getComputedStyle(document.querySelector('.monthly-report h2')).color;

    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expenses',
                data: amounts,
                backgroundColor: colors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColor
                    }
                },
                x: {
                    ticks: {
                        color: textColor
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        }
    });

    pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: amounts,
                backgroundColor: colors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        }
    });

    const difference = calculateIncomeExpenseDifference();
    const differenceElement = document.getElementById('income-expense-difference');
    differenceElement.innerHTML = `Net Change: ${difference.toFixed(2)}`;
    if (difference > 0) {
        differenceElement.className = 'amount-positive';
    } else {
        differenceElement.className = 'amount-negative';
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function populateCategoryOptions() {
    const datalist = document.getElementById('categories');
    datalist.innerHTML = ''; // Clear existing options

    let combinedCategories = {}

    if (expenses.length > 0) {
        combinedCategories = new Set([
            ...Object.keys(baseCategoryColors),
            ...expenses.map(expense => expense.category)
        ]);
    } else {
        combinedCategories = new Set([
            ...Object.keys(baseCategoryColors)
        ]);
    }


    for (const category of combinedCategories) {
        const option = document.createElement('option');
        option.value = category;
        datalist.appendChild(option);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    if (window.loggedIn) {
        expenses = []
    }

    if (window.userExpenses && window.userExpenses.length > 0) {
        expenses = window.userExpenses.map(exp => ({
            ...exp,
            date: new Date(exp.date)
        }));
    }

    if (window.categoryColors) {
        categoryColors = { ...baseCategoryColors, ...window.categoryColors };
    }

    populateCategoryOptions();
    populateExpenses();
    setupCharts();

    // Set today's date as the default date for the date input field
    document.getElementById('date').value = today.toISOString().split('T')[0];

    document.getElementById('expense-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        let category = document.getElementById('category').value;
        if (!categoryColors[category]) {
            categoryColors[category] = getRandomColor();
            populateCategoryOptions(); // Refresh category options to include the new custom category
        }
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = new Date(document.getElementById('date').value);
        const color = categoryColors[category];

        const expense = { category, location, description, amount, date, color };

        const response = await fetch('/add-expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        });

        if (response.ok) {
            expenses.push(expense);
            populateExpenses();
            setupCharts();
            document.getElementById('expense-form').reset();
            document.getElementById('date').value = today.toISOString().split('T')[0];
        } else {
            alert('Failed to add expense');
        }
    });

    // Open the login modal
    const loginButton = document.querySelector('.nav-item-login');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            document.getElementById('loginModal').style.display = 'block';
        });
    }

    // Open the register modal
    const registerButton = document.querySelector('.nav-item-register');
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            document.getElementById('registerModal').style.display = 'block';
        });
    }

    // Close the modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (event) => {
            event.target.closest('.modal').style.display = 'none';
        });
    });

    // Close the modal if the user clicks outside of it
    window.onclick = (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            alert('Login failed');
        }
    });

    // Handle register form submission
    document.getElementById('register-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            document.getElementById('registerModal').style.display = 'none';
            alert('Registration successful! Please login.');
        } else {
            alert('Registration failed');
        }
    });

    // Handle logout
    const logoutButton = document.querySelector('.nav-item-logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            console.log('Logout button clicked');
            const response = await fetch('/logout', {
                method: 'POST'
            });
            window.location.href = '/';
        });
    }
});

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function editExpense(index) {
    const filtered = getAllExpenses();
    const expense = filtered[index];
    currentEditIndex = expenses.indexOf(expense);

    const row = document.getElementById('expenses-list').children[index];
    row.innerHTML = `
        <td><input type="text" value="${expense.category}" id="edit-category-${index}" class="edit-expense-input"></td>
        <td><input type="text" value="${expense.location}" id="edit-location-${index}" class="edit-expense-input"></td>
        <td><input type="text" value="${expense.description}" id="edit-description-${index}" class="edit-expense-input"></td>
        <td><input type="number" value="${expense.amount}" id="edit-amount-${index}" class="edit-expense-input"></td>
        <td><input type="date" value="${expense.date.toISOString().split('T')[0]}" id="edit-date-${index}" class="edit-expense-input"></td>
        <td>
            <button class="edit-expense-button" onclick="saveEditExpense(${index})">Save</button>
            <button class="edit-expense-button" onclick="cancelEditExpense(${index})">Cancel</button>
        </td>
    `;
}

async function saveEditExpense(index) {
    const expense = expenses[currentEditIndex];
    const category = document.getElementById(`edit-category-${index}`).value;
    const location = document.getElementById(`edit-location-${index}`).value;
    const description = document.getElementById(`edit-description-${index}`).value;
    const amount = parseFloat(document.getElementById(`edit-amount-${index}`).value);
    const date = new Date(document.getElementById(`edit-date-${index}`).value);

    const updatedExpense = { ...expense, category, location, description, amount, date };

    if( window.loggedIn ) {
        const response = await fetch('/update-expense', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                expenseId: expense._id,
                category,
                location,
                description,
                amount,
                date: date.toISOString()
            })
        });
    
        if (!response.ok) {
            alert('Failed to update expense');
        }
    }

    expenses[currentEditIndex] = updatedExpense;
    currentEditIndex = null;
    populateExpenses();
    setupCharts();
}

function cancelEditExpense(index) {
    currentEditIndex = null;
    populateExpenses();
}

async function deleteExpense(expenseId) {
    const response = await fetch('/remove-expense', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expenseId })
    });

    if (response.ok) {
        expenses = expenses.filter(exp => exp._id !== expenseId);
        populateExpenses();
        setupCharts();
    } else {
        alert('Failed to delete expense');
    }
}

