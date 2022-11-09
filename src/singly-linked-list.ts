export class ListNode<T> {
    data: T;
    next: ListNode<T> | undefined;

    constructor(data: T) {
        this.data = data;
    }
}

export class LinkedList<T> {
    head: ListNode<T> | undefined;
    tail: ListNode<T> | undefined;
    length: number;

    append(data: T): void {
        const nodeToAppend = new ListNode(data);
        if (!this.head) {
            this.head = nodeToAppend;
            this.tail = nodeToAppend;
            this.length++;

            return;
        }

        let currentNode = this.head;
        while (currentNode.next) {
            currentNode = currentNode.next;
        }

        currentNode.next = nodeToAppend;
        this.tail = nodeToAppend;
        this.length++;
    }

    prepend(data: T): void {
        const nodeToPrepend = new ListNode(data);
        if (!this.head) {
            this.head = nodeToPrepend;
            this.tail = nodeToPrepend;
            this.length++;

            return;
        }

        const currentHead = this.head;

        this.head = nodeToPrepend;
        this.head.next = currentHead;
        this.length++;
    }

    reverse(): void {
        // swap head and tail
        const tmpHead = this.head;
        this.head = this.tail;
        this.tail = tmpHead;

        let prev = undefined;
        let curr = this.head;

        for (let i = 0; i < this.length; i++) {
            const next = curr?.next;
            curr!.next = prev;
            prev = curr;
            curr = next;
        }
    }

    print(): void {
        if (!this.head) {
            console.log("Linked List is empty");
            return;
        }

        let currentNode = this.head;
        while (currentNode) {
            console.log(currentNode.data);
            currentNode = currentNode.next as ListNode<T>;
        }
    }
}
