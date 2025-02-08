class Node{
    constructor(data){
        this.data = data;
        this.rightNode = null;
        this.leftNode = null
    }

    setLeft(node){
        if(node instanceof Node){
            this.leftNode = node;
        }
    }

    
    setRight(node){
        if(node instanceof Node){
            this.rightNode = node;
        }
    }
}

function createTree(array, start, end){
    if (start > end) {
        return null;
    }

    let middle = Math.floor((start+end)/2);
    let rootNode = new Node(array[middle]);
    rootNode.setLeft(createTree(array, start, middle-1));
    rootNode.setRight(createTree(array, middle+1, end));
    return rootNode;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function insertNode(tree, node){
    if (!tree) {
        return node;
    }

        if (node.data < tree.data) {
            tree.leftNode = insertNode(tree.leftNode, node);
        } else {
            tree.rightNode = insertNode(tree.rightNode, node);
        }
        return tree;
}