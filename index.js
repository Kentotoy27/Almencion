document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    if (!userId || !password) {
        alert("Please fill in all required fields.");
        return;
    }

    // Simulate backend call to validate login credentials
    const users = JSON.parse(localStorage.getItem('users')) || [];  // Simulating a database with localStorage

    const user = users.find(u => u.userId === userId);

    const errorMessageElement = document.getElementById('error-message');

    if (user && user.password === password) {
        alert("Login successful! Welcome, " + user.userName);
        sessionStorage.setItem('userId', user.userId); // Store user data in session
        sessionStorage.setItem('userName', user.userName);

        // Redirect to the view page
        window.location.href = 'view.html';
    } else {
        errorMessageElement.innerHTML = "Invalid User ID or Password. Please try again.";
    }
});