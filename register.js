document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const userId = document.getElementById('userId').value;
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    // Check if all fields are filled
    if (!userId || !userName || !password) {
        alert("Please fill in all required fields.");
        return;
    }

    // Get users from localStorage or initialize it as an empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user already exists
    const existingUser = users.find(u => u.userId === userId);
    if (existingUser) {
        alert("User ID already exists. Please choose a different one.");
        return;
    }

    // Add new user to the users array
    users.push({ userId, userName, password });

    // Save the updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registration successful!");

    // Optionally, redirect to the main page
    window.location.href = 'index.html';
});