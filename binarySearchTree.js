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

function deleteNode(root, key) {
    let curr = root;
    let prev = null;

    while (curr !== null && curr.data !== key) {
        prev = curr;
        if (key < curr.data) {
            curr = curr.leftNode;
        } else {
            curr = curr.rightNode;
        }
    }

    if (curr === null) {
        return root;
    }

    if (curr.leftNode === null || curr.rightNode === null) {
        let newCurr = (curr.leftNode === null) ? curr.rightNode : curr.leftNode;

        if (prev === null) {
            return newCurr;
        }

        if (curr === prev.leftNode) {
            prev.leftNode = newCurr;
        } else {
            prev.rightNode = newCurr;
        }
        
    } else {
        let p = null;
        let temp = curr.rightNode;
        while (temp.leftNode !== null) {
            p = temp;
            temp = temp.leftNode;
        }

        if (p !== null) {
            p.leftNode = temp.rightNode;
        } else {
            curr.rightNode = temp.rightNode;
        }

        curr.data = temp.data;
    }

    return root;
}

function findNode(tree, data){
    let currentNode = tree;
    if (currentNode.data === data) {
        return currentNode;
    } else {
        while (true) {
            if (data < currentNode.data) {
                if (currentNode.leftNode) {
                    currentNode = currentNode.leftNode;
                    if (currentNode.data === data) {
                        return currentNode;
                    }
                } else {
                    return null;
                }
            } else {
                if (currentNode.rightNode) {
                    currentNode = currentNode.rightNode;
                    if (currentNode.data === data) {
                        return currentNode;
                    }
                } else {
                    return null;
                }
            }
        }
    }
}

function depth(tree, data){
    let currentNode = tree;
    let depth = 0;
    if (tree) {
        if (currentNode.data === data) {
            return depth;
        } else {
            while (true) {
                if (data < currentNode.data) {
                    if (currentNode.leftNode) {
                        currentNode = currentNode.leftNode;
                        depth+=1;
                        if (currentNode.data === data) {
                            return depth;
                        }
                    } else {
                        return null;
                    }
                } else {
                    if (currentNode.rightNode) {
                        currentNode = currentNode.rightNode;
                        depth+=1;
                        if (currentNode.data === data) {
                            return depth;
                        }
                    } else {
                        return null;
                    }
                }
            }
        }
    }
}

function height(node){
    if (!node) {
        return -1;
    }

    if (!node.leftNode && !node.rightNode) {
        return 0;
    }

    let leftSubtreeHeight = height(node.leftNode);
    let rightSubtreeHeight = height(node.rightNode);

    return 1 + Math.max(leftSubtreeHeight, rightSubtreeHeight);
}

function nodeHeight(tree, data){
    let node = findNode(tree, data);

    if(!node){
        return -1;
    }

    return height(node);
}

function levelOrder(tree){
    if (tree === null) {
        return;
    }
    let queue = [];
    let marked = [];
    let visited = [];
    queue.push(tree);
    while (queue.length>0) {
        let currentNode = queue.shift();
        if (!marked.includes(currentNode)) {
            visited.push(currentNode);
            marked.push(currentNode);
            let currentNodeNeighbors = [currentNode.leftNode, currentNode.rightNode].filter(node => node !== null);
            for (let i=0; i<currentNodeNeighbors.length;i++) {
                if (!marked.includes(currentNodeNeighbors[i])) {
                    queue.push(currentNodeNeighbors[i]);
                }
            }
        }
    }
    return visited;
}

function checkHeight(node){
    if (!node) {
        return -1;
    }

    if (!node.leftNode && !node.rightNode) {
        return 0;
    }

    let leftSubtreeHeight = checkHeight(node.leftNode);
    let rightSubtreeHeight = checkHeight(node.rightNode);

    if(rightSubtreeHeight===-1){
        return -1;
    }

    if(leftSubtreeHeight===-1){
        return -1;
    }

    if (Math.abs(leftSubtreeHeight-rightSubtreeHeight)>1) {
        return -1;
    }

    return 1 + Math.max(leftSubtreeHeight, rightSubtreeHeight);
}

function isBalanced(tree){
    return checkHeight(tree) !== -1;
}

function balance(tree){
    let nodes = inOrder(tree);
    if (!tree){
        return null;
    }

    if (!nodes){
        return null;
    }

    return createTree(nodes.nodeData);
}

function preOrder(tree){
    let visited = [];
    let nodeData = [];
    if (tree !== null) {
        visited.push(tree);
        data.push(tree.data)
        if (tree.leftNode !== null && !visited.includes(tree.leftNode)) {
            visited = visited.concat(preOrder(tree.leftNode));
        }
        if (tree.rightNode !== null && !visited.includes(tree.rightNode)) {
            visited = visited.concat(preOrder(tree.rightNode));
        }
    }
    return {visited: visited, nodeData: nodeData};
}

function postOrder(tree){
    let visited = [];
    let nodeData = [];
    if (tree !== null) {
        if (tree.leftNode !== null && !visited.includes(tree.leftNode)) {
            visited = visited.concat(postOrder(tree.leftNode));
            nodeData = nodeData.concat(postOrder(tree.leftNode.data));
        }
        if (tree.rightNode !== null && !visited.includes(tree.rightNode)) {
            visited = visited.concat(postOrder(tree.rightNode));
            nodeData = nodeData.concat(postOrder(tree.rightNode.data));
        }
        visited.push(tree);
        nodeData.push(tree.data);
    }
    return {visited: visited, nodeData: nodeData};
}

function inOrder(tree){
    let visited = [];
    if (tree !== null) {
        if (tree.leftNode !== null && !visited.includes(tree.leftNode)) {
            visited = visited.concat(inOrder(tree.leftNode));
            nodeData = nodeData.concat(postOrder(tree.leftNode.data));
        }
        visited.push(tree);
        nodeData.push(tree.data);
        if (tree.rightNode !== null && !visited.includes(tree.rightNode)) {
            visited = visited.concat(inOrder(tree.rightNode));
            nodeData = nodeData.concat(postOrder(tree.rightNode.data));
        }
    }
    return {visited: visited, nodeData: nodeData};
}