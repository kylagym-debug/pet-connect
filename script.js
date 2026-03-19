function hideAllPages() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("adoption-page").style.display = "none";
    document.getElementById("lost-page").style.display = "none";
}

function hideAllForms() {
    document.getElementById("animal-form").style.display = "none";
    document.getElementById("owner-form").style.display = "none";
    document.getElementById("missing-form").style.display = "none";
    document.getElementById("found-form").style.display = "none";
}

// HOME → ADOPTION or LOST
function showMain(page) {
    hideAllPages();

    if (page === "adoption") {
        document.getElementById("adoption-page").style.display = "block";
    } else {
        document.getElementById("lost-page").style.display = "block";
    }
}

// BACK → HOME
function goHome() {
    // hide EVERYTHING first
    document.getElementById("home-page").style.display = "none";
    document.getElementById("adoption-page").style.display = "none";
    document.getElementById("lost-page").style.display = "none";
    document.getElementById("animal-form").style.display = "none";
    document.getElementById("owner-form").style.display = "none";
    document.getElementById("missing-form").style.display = "none";
    document.getElementById("found-form").style.display = "none";

    // then show ONLY home
    document.getElementById("home-page").style.display = "block";
}

// ADOPTION OPTIONS
function showAdoption(type) {
    hideAllForms();

    if (type === "animal") {
        document.getElementById("animal-form").style.display = "block";
    } else {
        document.getElementById("owner-form").style.display = "block";
    }
}

// LOST OPTIONS
function showLost(type) {
    hideAllForms();

    if (type === "missing") {
        document.getElementById("missing-form").style.display = "block";
    } else {
        document.getElementById("found-form").style.display = "block";
    }
}

// MAKE SURE HOME SHOWS FIRST
window.onload = function () {
    goHome();
};
