const content = document.querySelector(".wrapper .content");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const counter = document.querySelector(".counter");
let numberOfPages;

init();

function init () {
    load(1, (res) => renderList(res.results));

    load(1, (res) => {
        numberOfPages = res.info.pages;
    });

    isButtonDisabled(nextButton, counter.textContent);
    isButtonDisabled(prevButton, counter.textContent);
}

prevButton.addEventListener("click", () => {
    let updatedCounter = --counter.textContent;
    isButtonDisabled(prevButton, counter.textContent);
    load(updatedCounter, (res) => renderList(res.results));
});

nextButton.addEventListener("click", () => {
    let updatedCounter = ++counter.textContent;
    isButtonDisabled(nextButton, counter.textContent);
    load(updatedCounter, (res) => renderList(res.results));

});

function isButtonDisabled(button, counter) {
    nextButton.disabled = false;
    prevButton.disabled = false;

    if (button === prevButton && counter <= 1) {
        button.disabled = true;
    }

    if (button === nextButton && counter >= numberOfPages) {
        button.disabled = true;
    }
}

function renderList(items) {
    const ol = document.createElement("ol");
    ol.setAttribute("start", String(counter.textContent * 20 - 19));

    for (const item of items) {
        const listElement = document.createElement("li");
        listElement.textContent = item.name;

        ol.appendChild(listElement);
    }

    content.innerHTML = "";
    content.appendChild(ol);
}

function load(pageNumber, callback) {
    const API_URL = `https://rickandmortyapi.com/api/character?page=${pageNumber}`;
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(xhr.response);
        } else {
            alert("Error loading data!");
        }
    };

    xhr.onerror = () => {
        alert("Error loading data!");
    };

    xhr.open("GET", API_URL);
    xhr.send();
}
