// ONCE backend is ready: Replace sampleReports[] with real API call.

const sampleReports = [
    {
        caseId: "C-102934",
        incidentType: "Phishing",
        dateFiled: "2025-01-15",
        status: "Pending"
    },
    {
        caseId: "C-958342",
        incidentType: "Account Hacked",
        dateFiled: "2025-01-10",
        status: "In Review"
    },
    {
        caseId: "C-583294",
        incidentType: "Financial Fraud",
        dateFiled: "2024-12-30",
        status: "Resolved"
    }
];

const tableBody = document.querySelector(".data-table tbody");

sampleReports.forEach(report => {
    const badgeClass =
        report.status === "Pending" ? "status-pending" :
        report.status === "In Review" ? "status-review" :
        "status-resolved";

    const row = `
        <tr>
            <td>${report.caseId}</td>
            <td>${report.incidentType}</td>
            <td>${new Date(report.dateFiled).toLocaleDateString()}</td>
            <td><span class="status-badge ${badgeClass}">${report.status}</span></td>
            <td>
                <button class="view-btn">View</button>
            </td>
        </tr>
    `;

    tableBody.innerHTML += row;
});
