let route = window.location.href.substring(22, window.location.href.length);
switch (route) {
    case "login":
        $("#header-main-button").text("Register");
        $("#header-main-button").attr("href", "/register");
        break;

    case "register":
        $("#header-main-button").append(`<i class="sign-in icon"></i>Login`);
        $("#header-main-button").attr("href", "/login");
    break;

    case "notes":
        $("#header-main-button").append(`<i class="sign-out icon"></i>Logout`);
        $("#header-main-button").attr("href", "/logout");
    break;  
}