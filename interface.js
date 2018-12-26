function displayList(array) {
	if (array.length < 1 && isLoaded) {
		array = ["Ready to use! Input any two lowercase letters!"];
	} else if (array.length < 1 && !isLoaded) {
		array = [""];
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

function getText(type = "extrashort") {
	let url = "";
	switch (type) {
		case "long":
			url = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';
			displayList(["Loading 370k dictionary..."]);
			break;
		case "short":
		url = 'https://raw.githubusercontent.com/ciamkr/English-words-list/master/OfficialCrosswords';
		displayList(["Loading 114k dictionary..."]);
			break;
		default:
			url = 'https://raw.githubusercontent.com/ciamkr/English-words-list/master/OfficialCrosswordsDelta';
			displayList(["Loading 4k dictionary..."]);
			break;
	}

	function reqListener () {
		isLoaded = true;
		document.getElementById('blockTop').style = "";
		displayList([]);
		var array = listToArray(this.responseText);
		console.log(array.length)
		dummyBranches(array);
	}

	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", url);
	oReq.send();
}