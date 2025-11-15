// Dummy database
const sampleCases = {
    "C-102934": {
        incidentType: "Phishing",
        dateFiled: "2025-01-12",
        status: "Pending",
        steps: [
            { title: "Report Filed", desc: "Your report has been submitted.", done: true },
            { title: "Under Review", desc: "A cyber officer will review your case.", done: false },
            { title: "Investigator Assigned", desc: "Investigator will be assigned soon.", done: false },
            { title: "Case Resolved", desc: "Final decision will appear here.", done: false }
        ]
    },
    "C-583294": {
        incidentType: "Financial Fraud",
        dateFiled: "2024-12-30",
        status: "Resolved",
        steps: [
            { title: "Report Filed", done: true },
            { title: "Under Review", done: true },
            { title: "Investigator Assigned", done: true },
            { title: "Case Resolved", done: true }
        ]
    },
    "C-958342": {
        incidentType: "Account Hacked",
        dateFiled: "2025-01-10",
        status: "In Review",
        steps: [
            { title: "Report Filed", done: true },
            { title: "Under Review", done: true },
            { title: "Investigator Assigned", done: false },
            { title: "Case Resolved", done: false }
        ]
    }
};

const form = document.getElementById("trackForm");
const resultBox = document.getElementById("resultBox");
const stepsBox = document.getElementById("caseSteps");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const token = document.getElementById("tokenInput").value.trim();

    if (!sampleCases[token]) {
        alert("Invalid Token ID. Try again.");
        resultBox.style.display = "none";
        return;
    }

    const data = sampleCases[token];

    // Fill basic info
    document.getElementById("resToken").textContent = token;
    document.getElementById("resType").textContent = data.incidentType;
    document.getElementById("resDate").textContent = new Date(data.dateFiled).toLocaleDateString();

    const statusEl = document.getElementById("resStatus");
    statusEl.textContent = data.status;

    statusEl.className = "status-badge " + (
        data.status === "Pending" ? "status-pending" :
        data.status === "In Review" ? "status-review" :
        "status-resolved"
    );

    // Build timeline UI
    stepsBox.innerHTML = "";
    data.steps.forEach(step => {
        const div = document.createElement("div");
        div.className = "timeline-step " + (step.done ? "completed" : "");

        div.innerHTML = `
            <h4>${step.title}</h4>
            <p>${step.desc || ""}</p>
        `;
        stepsBox.appendChild(div);
    });

    resultBox.style.display = "block";
});
