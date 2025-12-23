// -----------------------
// BOOTSTRAP TOOLTIPS
// -----------------------
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')

const tooltipList = [...tooltipTriggerList].map(el =>
  new bootstrap.Tooltip(el, {
    delay: { show: 200, hide: 0 }
  })
)


// -----------------------
// THEME TOGGLE FUNCTION
// -----------------------
function toggleTheme() {
    const html = document.documentElement;
    const toggleButton = document.querySelector('[onclick="toggleTheme()"]');

    const current = html.getAttribute('data-bs-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition) {
        html.setAttribute('data-bs-theme', next);
    } else {
        document.startViewTransition(() => {
            html.setAttribute('data-bs-theme', next);
        });
    }

    // toggle icon (sun/moon)
    const icon = toggleButton ? toggleButton.querySelector('i') : null;
    if (icon) {
        icon.className = next === 'dark'
            ? 'ph ph-sun fs-5'
            : 'ph ph-moon fs-5';
    }

    // update map theme ALSO
    map.setStyle(getMapStyle(next));

    return false;
}


// -----------------------
// COPY FUNCTION
// -----------------------
function copydetail(event, textToCopy) {
    event.preventDefault();

    navigator.clipboard.writeText(textToCopy);

    const el = event.currentTarget;
    const icon = el;
    const originalClass = icon.className;

    // get/create tooltip
    const tooltip = bootstrap.Tooltip.getInstance(el) || new bootstrap.Tooltip(el);

    // change tooltip text
    el.setAttribute("data-bs-original-title", "Copied");
    tooltip.setContent({ '.tooltip-inner': 'Copied' });
    tooltip.show();

    // change icon
    icon.className = "ph ph-check-circle text-success";

    // reset after 2s
    setTimeout(() => {
        tooltip.hide();
        icon.className = originalClass;

        el.setAttribute("data-bs-original-title", "Copy");
        tooltip.setContent({ '.tooltip-inner': 'Copy' });

    }, 300);
}


// -----------------------
// SPEAK BUTTON
// -----------------------
const speakButton = document.getElementById('speakButton');
speakButton.addEventListener('click', () => {
    const message = new SpeechSynthesisUtterance("Chitesh Malhotra");
    window.speechSynthesis.speak(message);
});


// -----------------------
// MAP THEME FUNCTION
// -----------------------
function getMapStyle(theme) {
    return theme === "light"
        ? "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        : "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
}


// -----------------------
// INITIALIZE MAP
// -----------------------
const html = document.documentElement;
const initialTheme = html.getAttribute("data-bs-theme") || "light";

const map = new maplibregl.Map({
    container: "map",
    style: getMapStyle(initialTheme),
    center: [77.2090, 28.6139],
    zoom: 3,
    attributionControl: false
});

map.on('load', () => {
    map.flyTo({
        zoom: 11,
        speed: 0.8
    });
});

// MARKER
new maplibregl.Marker({color:"#4ade80"})
    .setLngLat([77.2090, 28.6139])
    .addTo(map);

new maplibregl.Marker({color:"#fff700ff"})
    .setLngLat([76.93, 28.65])
    .addTo(map);

function updateClock() {
    const now = new Date();
    const optionsIndia = { timeZone: 'Asia/Kolkata',hour: "numeric",  minute: 'numeric', second:'numeric',  hour12: true };
    const timeIndia = new Intl.DateTimeFormat('en-IN', optionsIndia).format(now).toUpperCase();
    document.getElementById('clock').innerText = timeIndia;
}

updateClock()
let clockInterval = setInterval(updateClock, 1000);


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.toast').forEach(toastEl => {
        new bootstrap.Toast(toastEl).show();
    });
});