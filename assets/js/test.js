document.getElementById('degreePlanForm').addEventListener('submit', function(event){
    event.preventDefault();
    var selectedDegree = document.getElementById('degreePlanSelect').value;
    
    // AJAX request to send the selectedDegree to your Python script
    fetch('/process_degree_plan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ degreePlan: selectedDegree }),
    })
    .then(response => response.json())
    .then(data => {
        // Update the selectedPlan element with response from Python
        document.getElementById('selectedPlan').innerText = data.result;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
