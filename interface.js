function displayList(array) {
	if (array.length < 1 && isLoaded) {
		array = ["Ready to use! Input any lowercase letter!"];
	} else if (array.length < 1 && !isLoaded) {
		array = ["Please, wait for loading of 100k list of words..."];
	}

	// Get a container element
	var listContainer = document.getElementsByClassName('list')[0];

	// Clear it
	listContainer.innerHTML = '';

	// Make the list
	var listElement = document.createElement('ul');

	// Add it to the page
	listContainer.appendChild(listElement);

	// Set up a loop that goes through the items in listItems one at a time
	for (var i = 0; i < array.length; ++i) {
		// create an item for each one
		var listItem = document.createElement('li');

		// Add the item text
		listItem.innerHTML = array[i];

		// Add listItem to the listElement
		listElement.appendChild(listItem);
	}
}

function getJSON() {
	let url = 'https://random-word-api.herokuapp.com/word?key=4B4IXS2K&number=100000';
	fetch(url)
		.then(res => res.json())
		.then((out) => {
			console.log('Checkout this JSON!');
			isLoaded = true;
			document.getElementsByClassName('input')[0].disabled = false;
			displayList([]);
			dummyBranches(out);
		})
		.catch(err => { throw err });

}