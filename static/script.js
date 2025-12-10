const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// --- THEME TOGGLE FUNCTION ---
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
    const icon = toggleButton ? toggleButton.querySelector('i') : null;
    if (icon) {
        icon.className = next === 'dark'
            ? 'ph ph-sun fs-4'
            : 'ph ph-moon fs-4';
    }
    return false;
}


function copydetail(event, textToCopy) {
    event.preventDefault();

    // Copy the text passed as argument
    navigator.clipboard.writeText(textToCopy);

    const el = event.currentTarget;
    const icon = el;
    const originalClass = icon.className;

    // Get or create tooltip instance
    const tooltip = bootstrap.Tooltip.getInstance(el) || new bootstrap.Tooltip(el);

    // Update tooltip to "Copied"
    el.setAttribute("data-bs-original-title", "Copied");
    tooltip.setContent({ '.tooltip-inner': 'Copied' });
    tooltip.show();

    // Change icon temporarily
    icon.className = "ph ph-check-circle text-success small";

    // Reset after 2 seconds
    setTimeout(() => {
        tooltip.hide();

        // Reset icon
        icon.className = originalClass;

        // Reset tooltip text
        el.setAttribute("data-bs-original-title", "Click to Copy");
        tooltip.setContent({ '.tooltip-inner': 'Click to Copy' });
    }, 2000);
}


const speakButton = document.getElementById('speakButton');
speakButton.addEventListener('click', () => {
    const message = new SpeechSynthesisUtterance("Chitesh Malhotra");
    window.speechSynthesis.speak(message);
});