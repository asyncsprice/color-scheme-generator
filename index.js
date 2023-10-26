/* variables */
const baseURL = "https://www.thecolorapi.com"
const colorSeed = document.getElementById("color-seed")
const colorScheme = document.getElementById("color-scheme")
const container = document.getElementById("color-container")
const btn = document.getElementById("btn")
const body = document.getElementById("body")
const lightDarkBtn = document.getElementById("light-dark-btn")

/* begins the fetch */
btn.addEventListener("pointerdown", () => {
    const selectedColor = colorSeed.value
    const colorWithoutHash = selectedColor.slice(1);
    fetch(`${baseURL}/scheme?hex=${colorWithoutHash}&mode=${colorScheme.value}&count=5`)
    .then(res => res.json())
    .then(data => getColors(data))
})

/* toggles light/dark mode */
lightDarkBtn.addEventListener("pointerdown", () => {
    body.classList.toggle("dark-text")
    body.classList.toggle("dark-bg")
    colorScheme.classList.toggle("dark-text")
    colorScheme.classList.toggle("dark-bg")
    btn.classList.toggle("dark-btn")
})

/* this function receives the data from the fetch and renders it to the screen */
const getColors = arr => {
    let html = ""
    let counter = 0;
    for (color of arr.colors) {
        counter++
        html += `
            <div id="color-code${counter}" class="returned-color" data-color="${color.hex.value}" style="background-color: ${color.hex.value}">
            </div>
            <p id="code${counter}" class="hex-code" data-color="${color.hex.value}">${color.hex.value}</p>
        `  
    }
    container.innerHTML = html
}

/* saves target to clipboard */
window.addEventListener("pointerdown", (e) => {
    if (e.target.id.includes("code")) {
        alert(`${e.target.dataset.color} has been copied to the clipboard`)
        navigator.clipboard.writeText(e.target.dataset.color)
    }
})