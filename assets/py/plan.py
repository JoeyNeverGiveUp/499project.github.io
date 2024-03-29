from js import document

def display_choice(event):
                selected_option = document.getElementById('degreePlanSelect').value
                document.getElementById('selectedPlan').innerText = selected_option

document.getElementById('submit').addEventListener('click', display_choice)