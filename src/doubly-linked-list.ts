export class ListNode<T> {
    prev: T | undefined;
    data: T;
    next: T | undefined;

    constructor(data: T) {
        this.data = data;
    }
}

interface DoublyLinkedList {
    getHead(): ListNode<any> | undefined;
    getTail(): ListNode<any> | undefined;
    getLength(): number;
    append(data: any): void;
    prepend(data: any): void;
    removeFirst(): void;
    removeLast(): void;
    get(index: number): unknown;
    set(data: unknown, index: number): void;
    insert(data: unknown, index: number): void;
    remove(index: number): void;
    print(): void;
}

export class DoublyLinkedListImpl implements DoublyLinkedList {
    private head: ListNode<any> | undefined;
    private tail: ListNode<any> | undefined;
    private length: number = 0;

    public getHead(): ListNode<any> | undefined {
        return this.head;
    }

    public getTail(): ListNode<any> | undefined {
        return this.tail;
    }

    public getLength(): number {
        return this.length;
    }

    public append(data: any): void {
        const newNode = new ListNode<typeof data>(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.length++;

            return;
        }

        this.tail!.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
        this.length++;
    }

    public prepend(data: any): void {
        const newNode = new ListNode<typeof data>(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.length++;

            return;
        }

        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    }

    public removeFirst(): void {
        if (!this.length) {
            throw new Error("Doubly Linked List is empty");
        }

        if (this.length === 1) {
            this.head = undefined;
            this.tail = undefined;
            this.length = 0;

            return;
        }

        this.head = this.head?.next;
        this.head!.prev = undefined;

        this.length--;
    }

    public removeLast(): void {
        if (!this.length) {
            throw new Error("Doubly Linked List is empty");
        }

        if (this.length === 1) {
            this.head = undefined;
            this.tail = undefined;
            this.length = 0;

            return;
        }

        this.tail = this.tail?.prev;
        this.tail!.next = undefined;
        this.length--;
    }

    public get(index: number): unknown {
        if (!this.length) {
            throw new Error("Doubly Linked List is empty");
        }

        if (index > this.length - 1) {
            throw new Error(`Index ${index} does not exist. Length: ${this.length}`);
        }

        if (index < 0) {
            throw new Error("Negative index is not allowed");
        }

        let currentNode = this.head;
        for (let i = 1; i <= index; i++) {
            currentNode = currentNode?.next;
        }

        return currentNode;
    }

    public set(data: unknown, index: number): void {
        const tempNode = this.get(index) as ListNode<unknown>;

        tempNode.data = data;
    }

    public insert(data: unknown, index: number): void {
        if (index < 0) {
            throw new Error("Index can not be less than 0");
        }

        if (index > this.length) {
            throw new Error(`Index is too high. Current length: ${this.length}. Allowed next index: ${this.length}`);
        }

        if (index === 0) {
            this.prepend(data);
            return;
        }

        if (index === this.length) {
            this.append(data);
            return;
        }

        const nodeBefore = this.get(index - 1) as ListNode<unknown>;
        const nodeAfter = nodeBefore.next as ListNode<unknown>;
        const nodeToAdd = new ListNode(data);

        nodeBefore.next = nodeToAdd;
        nodeToAdd.prev = nodeBefore;
        nodeToAdd.next = nodeAfter;
        nodeAfter.prev = nodeToAdd;

        this.length++;
    }

    remove(index: number): void {
        if (!this.length) {
            throw new Error("Doubly Linked List is empty");
        }

        if (index < 0) {
            throw new Error("index can not be negative");
        }

        if (index > this.length - 1) {
            throw new Error(`Index ${index} does not exist. Length: ${this.length}`);
        }

        if (index === 0) {
            this.removeFirst();
            return;
        }

        if (index === this.length - 1) {
            this.removeLast();
            return;
        }

        const nodeBefore = this.get(index - 1) as ListNode<unknown>;
        const nodeNext = this.get(index + 1) as ListNode<unknown>;

        nodeBefore.next = nodeNext;
        nodeNext.prev = nodeBefore;
        this.length--;
    }

    public print(): void {
        if (!this.length) {
            console.log("Doubly Linked List is empty");
            return;
        }

        console.log(`Head: ${this.head?.data}`);
        console.log(`Tail: ${this.tail?.data}`);
        console.log(`Length: ${this.length}`);
        console.log("------------------");
        console.log("ELEMENTS: ");

        let currentNode = this.head as ListNode<unknown>;
        while (currentNode) {
            console.log(`${currentNode.data}`);
            currentNode = currentNode.next as ListNode<unknown>;
        }
    }
}
