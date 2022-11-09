class BstNode {
    value: number;
    left: BstNode;
    right: BstNode;

    constructor(value: number) {
        this.value = value;
    }
}

interface IBinarySearchTree {
    insert(value: number): boolean;
    contains(value: number): boolean;
}

export class BinarySearchTree implements IBinarySearchTree {
    private root: BstNode | undefined;

    constructor() {
        this.root = undefined;
    }

    public insert(value: number): boolean {
        const node = new BstNode(value);

        if (this.root === undefined) {
            this.root = node;
            return true;
        }

        let currentNode = this.root;
        while (true) {
            if (currentNode.value === node.value) {
                return false;
            }

            if (node.value < currentNode.value) {
                if (currentNode.left === undefined) {
                    currentNode.left = node;
                    return true;
                }

                currentNode = currentNode.left;
            } else {
                if (currentNode.right === undefined) {
                    currentNode.right = node;
                    return true;
                }

                currentNode = currentNode.right;
            }
        }
    }

    contains(value: number): boolean {
        if (this.root === undefined) {
            return false;
        }

        let currentNode = this.root;
        while (true) {
            if (currentNode.value === value) {
                return true;
            }

            if (value < currentNode.value) {
                if (currentNode.left === undefined) {
                    return false;
                }

                currentNode = currentNode.left;
                continue;
            }

            if (value > currentNode.value) {
                if (currentNode.right === undefined) {
                    return false;
                }

                currentNode = currentNode.right;
            }
        }
    }
}
