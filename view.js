$(document).ready(function() {
    // Fetch users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if there are users
    if (users.length > 0) {
        const tableBody = $('#data-table tbody');
        tableBody.empty();

        // Populate the table with users' data
        users.forEach(user => {
            const row = $('<tr></tr>');
            row.append($('<td></td>').text(user.userId));
            row.append($('<td></td>').text(user.userName));
            row.append($('<td></td>').text(user.password));

            const actionCell = $('<td></td>');

            // Edit action
            const editLink = $('<a href="#" class="edit-link">Edit</a>');
            editLink.on('click', function(event) {
                event.preventDefault();
                editData(user.userId); // Call editData with userId
            });

            // Delete action
            const deleteLink = $('<a href="#" class="delete-link">| Del</a>');
            deleteLink.on('click', function(event) {
                event.preventDefault();
                deleteData(user.userId, row); // Call deleteData with userId
            });

            actionCell.append(editLink);
            actionCell.append(deleteLink);

            row.append(actionCell);
            tableBody.append(row);
        });
    } else {
        $("#retrieveDataQueryResult").html("<p style='color: red;'>No Data found.</p>");
    }
});

// Function to edit data
function editData(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.userId === userId);

    if (user) {
        $('#id').val(userId); // Set hidden input field with userId
        $('#userId').val(user.userId); // Set userId field
        $('#userName').val(user.userName); // Set userName field
        $('#password').val(user.password); // Set password field
    }
}

// Function to update data
function updateData() {
    const userId = $('#id').val();
    const userName = $('#userName').val();
    const password = $('#password').val();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.userId === userId);

    if (userIndex !== -1) {
        users[userIndex].userName = userName;
        users[userIndex].password = password;

        // Save the updated users array back to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        alert("User data updated successfully!");

        // Optionally, reload the page to reflect the changes
        location.reload();
    } else {
        alert("User not found.");
    }
}

// Function to delete data
function deleteData(userId, row) {
    if (confirm("Are you sure you want to delete this user?")) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.filter(u => u.userId !== userId);

        // Save the updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Remove the table row
        row.remove();

        alert("User deleted successfully!");
    }
}