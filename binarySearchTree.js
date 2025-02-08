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
