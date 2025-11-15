// Move case cards between columns
document.querySelectorAll(".move-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        const targetColumn = btn.getAttribute("data-target");
        const card = btn.closest(".case-card");
        const column = document.getElementById(targetColumn);

        if (column) {
            column.appendChild(card);
            alert("Case moved to: " + targetColumn.toUpperCase());
        }
    });
});
