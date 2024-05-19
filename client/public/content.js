// Gets the button styles from content.css
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './content.css'; // linter error - works fine
document.head.appendChild(link);

// Create a button element
const button = document.createElement('button');
button.id = 'summarizeButton';
button.textContent = 'Summarize';
button.classList.add('summarizeButton');
button.style.opacity = '0';

// Add on on-click for the button
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