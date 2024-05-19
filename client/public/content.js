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
button.style.padding = '10px 20px';
button.style.backgroundColor = '#007bff';
button.style.color = '#fff';
button.style.fontFamily = 'Inter, sans-serif';
button.style.border = 'none';
button.style.borderRadius = '4px';
button.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
button.style.transition = 'opacity 0.5s ease';
button.style.opacity = '0';
button.style.pointerEvents = 'none';

// Add hover styles
button.style.cursor = 'pointer';
button.addEventListener('mouseenter', () => {
	button.style.backgroundColor = '#026fe3';
})
button.addEventListener('mouseleave', () => {
	button.style.backgroundColor = "#007bff";
})

// Add active styles
button.addEventListener('mousedown', () => {
	button.style.backgroundColor = '#007bff';
})
button.addEventListener('mouseup', () => {
	button.style.backgroundColor = '#026fe3';
})

// // Add on on-click for the button
button.addEventListener('click', () => {
	console.log(window.getSelection().toString());


	// MAKE THE API CALL HERE **

	
})

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