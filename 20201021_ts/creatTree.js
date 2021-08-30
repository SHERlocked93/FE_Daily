"use strict";
const data = [
    { id: 8, parentId: 4, label: '8' },
    { id: 2, parentId: 1, label: '2' },
    { id: 9, parentId: 11, label: '9' },
    { id: 7, parentId: 2, label: '7' },
    { id: 6, parentId: 4, label: '6' },
    { id: 5, parentId: 7, label: '5' },
    { id: 1, parentId: null, label: '1' },
    { id: 4, parentId: 5, label: '4' },
    { id: 3, parentId: 1, label: '3' },
    { id: 11, parentId: 2, label: '11' },
];
console.log(JSON.stringify(convert2Tree(data), null, 2));
function convert2Tree(nodeList) {
    const parentIdMap = {};
    let root = null;
    nodeList
        .forEach(node => {
        var _a;
        if (!node.parentId) {
            const { id, label } = node;
            root = { id, label };
            return;
        }
        parentIdMap[node.parentId] = (_a = parentIdMap[node.parentId]) !== null && _a !== void 0 ? _a : [];
        const { id, label } = node;
        parentIdMap[node.parentId].push({ id, label });
    });
    const run = (currNode) => {
        const { id } = currNode;
        if (parentIdMap[id]) {
            currNode.children = parentIdMap[id];
            currNode.children.forEach(node => run(node));
        }
        return currNode;
    };
    return run(root);
}
