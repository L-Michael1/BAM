// Create a button element
const button = document.createElement('button');
button.id = 'summarizeButton';
button.textContent = 'Summarize';
button.classList.add('summarizeButtonStyle');

// Style the button
button.style.position = 'fixed';
button.style.bottom = '30px';
button.style.right = '30px';
button.style.zIndex = '1000';
button.style.padding = '15px 20px';
button.style.backgroundColor = '#a044fc';
button.style.color = '#fff';
button.style.fontFamily = 'Inter, sans-serif';
button.style.fontSize = '1.1rem';
button.style.fontWeight = 'bold';
button.style.border = 'none';
button.style.borderRadius = '10px';
button.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
button.style.transition = 'opacity 0.5s ease';
button.style.opacity = '0';
button.style.pointerEvents = 'none';

// Add hover styles
button.style.cursor = 'pointer';
button.addEventListener('mouseenter', () => {
	button.style.backgroundColor = '#8f28f7';
})
button.addEventListener('mouseleave', () => {
	button.style.backgroundColor = "#a044fc";
})

// Add active styles
button.addEventListener('mousedown', () => {
	button.style.backgroundColor = '#a044fc';
})
button.addEventListener('mouseup', () => {
	button.style.backgroundColor = '#8f28f7';
})

// // Add on on-click for the button
button.addEventListener('click', () => {
    // Get the selected text
    const selectedText = window.getSelection().toString().trim();
    
    // Check if any text is selected
    if (selectedText !== '') {
			// Changes the buttons functionality and styling to loading phase
			button.textContent = 'Loading...';
			button.disabled = true;

			// Make the API call
			fetch('http://127.0.0.1:8000/summarize-section', {
			  method: 'POST',
				headers: {
						'Content-Type': 'application/json'
				},
				body: JSON.stringify({ text: selectedText })
			})
			.then(response => {
				// Check if the response is unsuccessful
				if (!response.ok) {
					alert('There was an error with the summary');
				}

				// Returns the buttons functionality and styling from the loading phase
				button.textContent = 'Summarize';
				button.disabled = false;

				// Parse the response as JSON
				return response.json();
			})
			.then(data => {
				// Log the summary
				console.log('Summary:', data.summary);

				// Returns the buttons functionality and styling from the loading phase
				button.textContent = 'Summarize';
				button.disabled = false;

				// You can do whatever you want with the summary here
			})
			.catch(error => {
				// Notifes the user of any errors with the call
				alert('There was an error with the summary\n', error);

				// Returns the buttons functionality and styling from the loading phase
				button.textContent = 'Summarize';
				button.disabled = false;
			});
    } 
		else {
			alert('Please select text before summarizing');
    }
});

// Append the button to the document body
document.body.appendChild(button);

// Listen for text selection events
document.addEventListener('mouseup', () => {
	const selectedText = window.getSelection().toString();

	if (selectedText) {
		button.style.opacity = '1';
		button.style.pointerEvents = 'auto';
	}
	else {
		button.style.opacity = '0';
		button.style.pointerEvents = 'none';
	}
});