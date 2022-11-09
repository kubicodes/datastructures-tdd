class QueueNode<T> {
    data: T;
    next: QueueNode<T> | undefined;

    constructor(data: T) {
        this.data = data;
    }
}

interface IQueue<T> {
    dequeue(): QueueNode<T>;
    enqueue(data: T): void;
    getLength(): number;
    getFirst(): QueueNode<T> | undefined;
    getLast(): QueueNode<T> | undefined;
    prtint(): void;
}

export class Queue<T> implements IQueue<T> {
    private length: number;
    private first: QueueNode<T> | undefined;
    private last: QueueNode<T> | undefined;

    constructor() {
        this.length = 0;
        this.first = undefined;
        this.last = undefined;
    }

    enqueue(data: T): void {
        const nodeToAdd = new QueueNode<T>(data);

        if (this.length === 0) {
            this.first = nodeToAdd;
            this.last = nodeToAdd;
            this.length = 1;

            return;
        }

        this.last!.next = nodeToAdd;
        this.last = nodeToAdd;
        this.length++;
    }

    dequeue(): QueueNode<T> {
        if (this.length === 0) {
            throw new Error("Queue is empty");
        }

        const temp = this.first;

        if (this.length === 1) {
            this.first = undefined;
            this.last = undefined;
        }

        this.first = this.first?.next;
        temp!.next = undefined;
        this.length--;

        return temp as QueueNode<T>;
    }

    getLength(): number {
        return this.length;
    }

    getFirst(): QueueNode<T> | undefined {
        return this.first;
    }

    getLast(): QueueNode<T> | undefined {
        return this.last;
    }

    prtint(): void {
        if (this.length === 0) {
            console.log("Queue is empty");
            return;
        }

        let currentNode = this.getFirst();
        while (currentNode) {
            console.log(currentNode.data);
            currentNode = currentNode.next;
        }
    }
}
