let route = window.location.href.substring(22, window.location.href.length);
switch (route) {
    case "login":
        $("#header-main-button").text("Register");
        $("#header-main-button").attr("href", "/register");
        break;

    case "register":
        $("#header-main-button").text("login");
        $("#header-main-button").attr("href", "/login");
    break;

    case "notes":
        $("#header-main-button").text("logout");
        $("#header-main-button").attr("href", "/logout");
    break;  

    default: 
        $("#header-main-button").text("logout");
        $("#header-main-button").attr("href", "/logout");
        break;
}