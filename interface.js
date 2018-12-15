function displayList(array) {
	if (array.length < 1 && isLoaded) {
		array = ["Ready to use! Input any two lowercase letters!"];
	} else if (array.length < 1 && !isLoaded) {
		array = ["Please, wait for loading of 370k list of words..."];
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

function listToArray(input) {
	var result = [];
	
	input.split("\n").forEach(element => {
		result.push(element);
	});

	return result;
}

function getJSON() {
	let url = 'https://random-word-api.herokuapp.com/word?key=4B4IXS2K&number=100000';

	fetch(url)
		.then(res => res.json())
		.then((out) => {
			isLoaded = true;
			document.getElementsByClassName('input')[0].disabled = false;
			displayList([]);
			dummyBranches(out);
		})
		.catch(err => { throw err });

}

function getText() {
	let url = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';
	
	function reqListener () {
		isLoaded = true;
		document.getElementsByClassName('input')[0].disabled = false;
		displayList([]);
		var array = listToArray(this.responseText);
		dummyBranches(array);
	}
	
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", url);
	oReq.send();
}