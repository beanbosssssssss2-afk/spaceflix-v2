(function () {
    if (localStorage.getItem("passwordProtection") === "enabled") {
        let storedUser = localStorage.getItem("user");
        let lastLogin = localStorage.getItem("lastLogin");

        if (!storedUser || !lastLogin) {
            // Redirect to login if user is not logged in
            window.location.href = "/login.html";
            return;
        }

        const lastLoginTime = new Date(lastLogin);
        const currentTime = new Date();
        const diffInHours = (currentTime - lastLoginTime) / (1000 * 60 * 60);

        if (diffInHours > 3) {
            alert("Your session has expired. Please log in again.");
            localStorage.removeItem("user");
            localStorage.removeItem("pass");
            localStorage.removeItem("lastLogin");
            window.location.href = "/login.html";
        }
    }
})();
