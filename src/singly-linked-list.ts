export class ListNode<T> {
    data: T;
    next: ListNode<T>;

    constructor(data: T) {
        this.data = data;
    }
}

export class LinkedList<T> {
    head: ListNode<T>;
    tail: ListNode<T>;

    append(data: T): void {
        const nodeToAppend = new ListNode(data);
        if (!this.head) {
            this.head = nodeToAppend;
            this.tail = nodeToAppend;
            return;
        }

        let currentNode = this.head;
        while (currentNode.next) {
            currentNode = currentNode.next;
        }

        currentNode.next = nodeToAppend;
        this.tail = nodeToAppend;
    }

    prepend(data: T): void {
        const nodeToPrepend = new ListNode(data);
        if (!this.head) {
            this.head = nodeToPrepend;
            this.tail = nodeToPrepend;
            return;
        }

        const currentHead = this.head;
        this.head = nodeToPrepend;
        this.head.next = currentHead;
    }

    print(): void {
        if (!this.head) {
            console.log("Linked List is empty");
            return;
        }

        let currentNode = this.head;
        while (currentNode) {
            console.log(currentNode.data);
            currentNode = currentNode.next;
        }
    }
}
