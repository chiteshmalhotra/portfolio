// -----------------------
// BOOTSTRAP TOOLTIPS
// -----------------------
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')

const tooltipList = [...tooltipTriggerList].map(el =>
  new bootstrap.Tooltip(el)
)


// -----------------------
// THEME TOGGLE FUNCTION
// -----------------------
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-bs-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    // Fallback for browsers that don't support the API
    if (!document.startViewTransition) {
        applyTheme(next);
        return;
    }

    // Get button position
    const btn = document.getElementById('themeToggle');
    const rect = btn.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Set CSS variables for clip-path origin
    document.documentElement.style.setProperty('--vt-x', `${x}px`);
    document.documentElement.style.setProperty('--vt-y', `${y}px`);

    document.startViewTransition(() => {
        const html = document.documentElement;
    html.setAttribute('data-bs-theme', next);

    // Update icons/maps
    const toggleButton = document.getElementById('themeToggle');
    const icon = toggleButton?.querySelector('i');
    if (icon) {
        icon.className = next === 'dark' ? 'ph ph-sun fs-5 align-middle' : 'ph ph-moon fs-5 align-middle';
    }
    if (typeof map !== 'undefined') map.setStyle(getMapStyle(next));
    });
}

document.onkeydown = function(e){
  e = e || window.event;
  var key = e.which || e.keyCode;
  if(key == 68){
    toggleTheme();
  }
}

// D Toggle shortcut
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.toast').forEach(toastEl => {
        new bootstrap.Toast(toastEl).show();
    });
});


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
    zoom: 8,
    attributionControl: false
});

map.on('load', () => {
    map.flyTo({
        zoom: 12,
        speed: 0.5
    });
});

// MARKER
new maplibregl.Marker({color:'var(--bs-success)'})
    .setLngLat([77.2090, 28.6139])
    .addTo(map);

new maplibregl.Marker({color:"var(--bs-warning)"})
    .setLngLat([76.93, 28.65])
    .addTo(map);

// -----------------------
// CLOCK
// -----------------------
function updateClock() {
    const now = new Date();
    const optionsIndia = { timeZone: 'Asia/Kolkata',hour: "numeric",  minute: 'numeric', second:'numeric',  hour12: true };
    const timeIndia = new Intl.DateTimeFormat('en-IN', optionsIndia).format(now).toUpperCase();
    document.getElementById('clock').innerText = timeIndia;
}

updateClock()
let clockInterval = setInterval(updateClock, 1000);