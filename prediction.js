function readBranchBackwards(leaf) {
	var result = "";
	if (leaf.getValue() != undefined) {
		result = readBranchBackwards(leaf.getParent()) + leaf.getValue();
	}
	return result;
}

function predictBranch(startFrom, predictions) {
	if (!startFrom) {
		return;
	}
	if (startFrom.isTerminal()) {
		predictions.push(readBranchBackwards(startFrom));
	}

	var test = startFrom.getAllChilds();

	for (var child of Object.keys(test)) {
		predictBranch(startFrom.getChild(child), predictions);
	}
}

function getPredictions() {
	var input = document.getElementById('inputField').value.toString();
	var predictions = [];
	if (input && input.length > 1) {
		var leaf = root;
		input.split("").forEach(element => {
			if (leaf && leaf.getChild(element)) {
				leaf = leaf.getChild(element);
			} else {
				leaf = undefined;
			}
		});

		predictBranch(leaf, predictions);


		if (document.getElementById('startFromMiddle').checked) {
			tableGetByValue(input.substring(0, 1)).forEach(leaf => {
				if (leaf != undefined && leaf != root.getChild(input.substring(0, 1))) {
					var letters = input.substring(1).split("");
					for (let index = 0; index < letters.length; index++) {
						var element = letters[index];
						if (element != undefined && leaf.getChild(element)) {
							leaf = leaf.getChild(element);
						} else {
							leaf = undefined;
							break;
						}
					}
					predictBranch(leaf, predictions);
				}
			});
		}
	}

	document.getElementById('labelCounter').innerText = predictions.length+" words"
	return predictions;
}
