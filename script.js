// -----------------------------
// PAGE NAVIGATION
// -----------------------------
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

function showMain(page) {
    hideAllPages();

    if (page === "adoption") {
        document.getElementById("adoption-page").style.display = "block";
    } else {
        document.getElementById("lost-page").style.display = "block";
    }
}

function goHome() {
    hideAllPages();
    hideAllForms();
    document.getElementById("home-page").style.display = "block";
}

function showAdoption(type) {
    hideAllForms();

    if (type === "animal") {
        document.getElementById("animal-form").style.display = "block";
    } else {
        document.getElementById("owner-form").style.display = "block";
    }
}

function showLost(type) {
    hideAllForms();

    if (type === "missing") {
        document.getElementById("missing-form").style.display = "block";
    } else {
        document.getElementById("found-form").style.display = "block";
    }
}

// -----------------------------
// DATA STORAGE
// -----------------------------
let adoptionAnimalProfiles = [];
let ownerProfiles = [];

let missingDogProfiles = [];
let foundDogProfiles = [];

// -----------------------------
// ADOPTION SECTION
// -----------------------------
function submitAdoptionAnimalProfile(event) {
    event.preventDefault();

    const name = document.getElementById("animal-name").value;
    const type = document.getElementById("animal-type").value;

    const characteristics = Array.from(
        document.querySelectorAll('#animal-characteristics input:checked')
    ).map(cb => cb.value);

    adoptionAnimalProfiles.push({ name, type, characteristics });

    alert(`Animal profile for ${name} created!`);
    event.target.reset();
}

function submitOwnerProfile(event) {
    event.preventDefault();

    const ownerName = document.getElementById("owner-name").value;

    const dreamCharacteristics = Array.from(
        document.querySelectorAll('#dream-characteristics input:checked')
    ).map(cb => cb.value);

    ownerProfiles.push({
        name: ownerName,
        dreamCharacteristics
    });

    alert(`Owner profile for ${ownerName} created!`);
    event.target.reset();
}

function matchProfiles() {
    const results = document.getElementById("adoption-results");
    results.innerHTML = "";

    ownerProfiles.forEach(owner => {
        adoptionAnimalProfiles.forEach(animal => {

            const matches = animal.characteristics.filter(c =>
                owner.dreamCharacteristics.includes(c)
            );

            if (matches.length > 0) {
                const div = document.createElement("div");
                div.innerHTML = `
                    <strong>${owner.name}</strong> matched with 
                    <strong>${animal.name}</strong> (${matches.length} traits)
                `;
                results.appendChild(div);
            }
        });
    });
}

// -----------------------------
// LOST & FOUND SECTION
// -----------------------------
function submitMissingDogProfile(event) {
    event.preventDefault();

    const profile = {
        name: document.getElementById("missing-dog-name").value,
        color: document.getElementById("missing-dog-color").value,
        size: document.getElementById("missing-dog-size").value,
        breed: document.getElementById("missing-dog-breed").value,
        standout: document.getElementById("missing-dog-standout").value,
        picture: document.getElementById("missing-dog-picture").files[0]
    };

    missingDogProfiles.push(profile);

    alert("Missing dog reported!");
    event.target.reset();
}

function submitFoundDogProfile(event) {
    event.preventDefault();

    const profile = {
        color: document.getElementById("found-dog-color").value,
        size: document.getElementById("found-dog-size").value,
        breed: document.getElementById("found-dog-breed").value,
        standout: document.getElementById("found-dog-standout").value,
        picture: document.getElementById("found-dog-picture").files[0]
    };

    foundDogProfiles.push(profile);

    alert("Found dog reported!");
    event.target.reset();
}

function matchDogProfiles() {
    const results = document.getElementById("lost-results");
    results.innerHTML = "";

    let matches = [];

    missingDogProfiles.forEach(missing => {
        foundDogProfiles.forEach(found => {

            let score = 0;

            if (missing.color === found.color) score++;
            if (missing.size === found.size) score++;
            if (
                missing.breed &&
                found.breed &&
                missing.breed.toLowerCase() === found.breed.toLowerCase()
            ) score++;

            if (score > 0) {
                matches.push({ missing, found, score });
            }
        });
    });

    matches.sort((a, b) => b.score - a.score);

    if (matches.length === 0) {
        results.innerHTML = "<p>No matches found.</p>";
        return;
    }

    matches.slice(0, 3).forEach(match => {
        const div = document.createElement("div");

        div.innerHTML = `
            <strong>Missing:</strong> ${match.missing.name}<br>
            <strong>Found Dog:</strong> ${match.found.color}, ${match.found.size}<br>
            <strong>Score:</strong> ${match.score}
            <hr>
        `;

        results.appendChild(div);
    });
}

// -----------------------------
// LOAD HOME FIRST
// -----------------------------
window.onload = function () {
    goHome();
};
