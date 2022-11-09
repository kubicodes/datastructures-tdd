export class StackNode<T> {
    data: T;
    next: StackNode<T> | undefined;

    constructor(data: T) {
        this.data = data;
    }
}

interface IStack<T> {
    push(data: T): void;
    pop(): StackNode<T> | undefined;
    getTop(): StackNode<T> | undefined;
    getHeight(): number;
    print(): void;
}

export class Stack<T> implements IStack<T> {
    private top: StackNode<T> | undefined;
    private height: number;

    push(data: T): void {
        const nodeToAdd = new StackNode<T>(data);

        if (this.height === 0) {
            this.top = nodeToAdd;
            this.height++;

            return;
        }

        nodeToAdd.next = this.top;
        this.top = nodeToAdd;
    }

    pop(): StackNode<T> | undefined {
        if (!this.height) {
            return undefined;
        }

        const nodeToPop = this.top as StackNode<T>;
        this.top = nodeToPop.next;
        nodeToPop.next = undefined;
        this.height--;

        return nodeToPop;
    }

    getTop(): StackNode<T> | undefined {
        return this.top;
    }

    getHeight(): number {
        return this.height;
    }

    print(): void {
        if (!this.height) {
            console.log("Stack is empty!");
        }

        console.log(`Height: ${this.height}`);
        console.log(`Top: ${this.top}`);

        let currentNode = this.getTop();
        while (currentNode) {
            console.log(currentNode.data);
            currentNode = currentNode.next;
        }
    }
}
