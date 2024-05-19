// Create a button element
const button = document.createElement('button');
button.id = 'summarizeButton';
button.textContent = 'Recapify';
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
button.style.fontSize = '18px';
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

// Add on on-click for the button
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
				// Returns the buttons functionality and styling from the loading phase
				button.textContent = 'Recapify';
				button.disabled = false;

				// Parse the response as JSON
				return response.json();
			})
			.then(data => {
				// Retrieves the data and parses it it
				let summary = data.summary;
				let parsedSummary = summary.replace(/^[\n\s]+/, '');

				// Creates an HTML modal to display the data
				const modalHtml = `
					<div id="modal" style="display: block; position: fixed; z-index: 2000; padding-top: 120px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.4);">
					<div style="background-color: #fefefe; margin: auto; padding: 40px; border: 2px solid #525151; border-radius: 30px; width: 70%; position: relative">
							<span class="close" style="color: #aaa; position: absolute; right: 40px; top: 25px; font-size: 28px; font-weight: bold; cursor: pointer">&times;</span>
							<h2 style="margin-top: 10px; margin-bottom: 20px; font-size: 30px; color: black; font-weight: bold">Summary</h2>
							<p id="summaryText" style="font-size: 16px; color: black">${parsedSummary}</p>
						</div>
					</div>
				`;
				
				// Adds the HTML modal to the body
				document.body.insertAdjacentHTML('beforeend', modalHtml);

				// When the close button is clicked closes the modal
				document.querySelector('.close').addEventListener('click', () => {
					document.getElementById('modal').remove();
				});

				// When clicking outside the modal, closes it
				window.addEventListener('click', (event) => {
					if (event.target === document.getElementById('modal')) {
						document.getElementById('modal').remove();
					}
				});
			})
			.catch(error => {
				// Notifes the user of any errors with the call
				alert('Sorry, the selected text exceeds the max number of words.\n', error);

				// Returns the buttons functionality and styling from the loading phase
				button.textContent = 'Recapify';
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