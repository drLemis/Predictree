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

	for (var s of Object.keys(test)) {
		predictBranch(startFrom.getChild(s), predictions);
	}
}

function getPredictions(input) {
	var predictions = [];
	if (input) {
		var leaf = root;
		input.split("").forEach(element => {
			if (leaf && leaf.getChild(element)) {
				leaf = leaf.getChild(element);
			} else {
				leaf = undefined;
			}
		});

		predictBranch(leaf, predictions);
	}

	return predictions;
}

// console.log(getPredictions("1".toString()));