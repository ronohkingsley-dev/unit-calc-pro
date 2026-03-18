function addAssignment() {
    const container = document.getElementById('assignmentContainer');
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'assign-input';
    input.placeholder = `Asgn ${container.children.length + 1} mark`;
    input.style.marginTop = "10px";
    container.appendChild(input);
}

function calculateFate() {
    const internalMax = parseInt(document.getElementById('internalWeight').value);
    const finalMax = 100 - internalMax;

    // 1. Collect all CAT marks
    const catInputs = document.querySelectorAll('.cat-input');
    let catTotal = 0;
    catInputs.forEach(input => catTotal += (parseFloat(input.value) || 0));

    // 2. Collect all Assignment marks
    const assignInputs = document.querySelectorAll('.assign-input');
    let assignTotal = 0;
    assignInputs.forEach(input => assignTotal += (parseFloat(input.value) || 0));

    const currentTotal = catTotal + assignTotal;
    const resultArea = document.getElementById('resultArea');

    // Validation
    if (currentTotal > internalMax) {
        resultArea.innerHTML = `<div class="remorse-msg">Warning: Current marks (${currentTotal}) exceed the set internal max of ${internalMax}. Check your entries.</div>`;
        return;
    }

    // 3. Generate the Grade Matrix
    const grades = [
        { label: 'A', target: 70 },
        { label: 'B', target: 60 },
        { label: 'C', target: 50 },
        { label: 'D', target: 40 }
    ];

    let html = `<div class="result-box">
        <h3>Required for Final Exam (/${finalMax})</h3>
        <table class="grade-table">`;

    grades.forEach(g => {
        const marksNeeded = g.target - currentTotal;
        const percentageNeeded = ((marksNeeded / finalMax) * 100).toFixed(1);
        
        let status = "";
        if (percentageNeeded > 100) status = `<span class="impossible">Impossible</span>`;
        else if (percentageNeeded <= 0) status = `<span class="secured">Safe!</span>`;
        else status = `<strong>${percentageNeeded}%</strong> (${marksNeeded.toFixed(1)} mks)`;

        html += `<tr><td>Grade ${g.label}</td><td>${status}</td></tr>`;
    });

    html += `</table></div>`;
    resultArea.innerHTML = html;
}