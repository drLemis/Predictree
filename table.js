var table = {};

function tableAddLeaf(leaf) {
	if (table[leaf.getValue()]) {
		table[leaf.getValue()].push(leaf);
	} else {
		table[leaf.getValue()] = [leaf];
	}
}

function tableRemoveLeaf(leaf) {
	delete table[leaf.getValue()][leaf];
}

function tableGetByValue(value) {
	return table[value];
}
