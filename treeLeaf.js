function treeLeaf() {
	this.childs = [];
	this.value = "";
	this.parent = "";
	this.weight = 1;
	this.terminal = false;

	this.setValue = function (newValue) {
		this.value = newValue;
	};
	this.getValue = function () {
		return this.value;
	};

	this.setParent = function (newParent) {
		this.parent = newParent;
	};
	this.getParent = function (newParent) {
		return this.parent;
	};

	this.getWeight = function () {
		return this.weight;
	};
	this.incrementWeight = function () {
		this.weight++;
	};
	this.decrementWeight = function () {
		this.weight--;
	};

	this.setTerminal = function (isTerminal) {
		this.terminal = isTerminal;
	};
	this.isTerminal = function () {
		return this.terminal;
	};

	this.addChild = function (newChild) {
		this.childs[newChild.getValue()] = newChild;
		newChild.setParent(this);
	};
	this.removeChild = function (child) {
		this.childs[child.getValue()] = undefined;
		child.setParent(undefined);
	};
	this.getChild = function (value) {
		return this.childs[value];
	};
	this.getAllChilds = function () {
		return this.childs;
	};
}

function createLeaf(value, parent = undefined) {
	var leaf = new treeLeaf();
	leaf.setValue(value);
	if (parent) {
		parent.addChild(leaf);
		leaf.setParent(parent);
	}
	if (parent) {
		tableAddLeaf(leaf);
	}
	return leaf;
}

function createBranch(input) {
	if (input.length > 0) {
		var inputArray = input.split("");
		var lastLeaf;
		if (root.getChild(inputArray[0])) {
			lastLeaf = root.getChild(inputArray[0]);
			lastLeaf.incrementWeight();
		} else {
			lastLeaf = createLeaf(inputArray[0], root);
		}

		for (var index = 1; index < inputArray.length; index++) {
			if (lastLeaf.getChild(inputArray[index])) {
				lastLeaf = lastLeaf.getChild(inputArray[index]);
				lastLeaf.incrementWeight();
			} else {
				lastLeaf = createLeaf(inputArray[index], lastLeaf);
			}
		}

		lastLeaf.setTerminal(true);
	}
}

var root = createLeaf();
var isLoaded = false;
// getText();

function dummyBranches(data) {
	data.forEach(element => {
		createBranch(element.toString());
	});
}
