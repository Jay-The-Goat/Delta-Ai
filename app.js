// DELTA AI UPDATE MANAGER

const APP_VERSION = "1.0.1";

let newVersionAvailable = false;

// Register service worker
async function registerDelta() {
    if (!("serviceWorker" in navigator)) {
        console.log("Service workers not supported.");
        return;
    }

    try {
        const registration =
            await navigator.serviceWorker.register("./sw.js");

        console.log("Delta AI service worker registered.");

        await registration.update();

        registration.addEventListener("updatefound", () => {
            const worker = registration.installing;

            worker.addEventListener("statechange", () => {
                if (
                    worker.state === "installed" &&
                    navigator.serviceWorker.controller
                ) {
                    newVersionAvailable = true;

                    showUpdateMessage();
                }
            });
        });

    } catch (error) {
        console.error("Delta AI update error:", error);
    }
}

// Display update notification
function showUpdateMessage() {
    const status = document.getElementById("updateStatus");

    if (status) {
        status.textContent =
            "A new Delta AI version is available! Refresh to update.";
    }
}

// Check for application updates
async function checkDeltaUpdates() {
    if (!("serviceWorker" in navigator)) return;

    const registration =
        await navigator.serviceWorker.getRegistration();

    if (registration) {
        await registration.update();
    }
}

// Start Delta AI
window.addEventListener("load", registerDelta);

// Check periodically
setInterval(checkDeltaUpdates, 5 * 60 * 1000);