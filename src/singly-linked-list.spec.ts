import { LinkedList } from "./singly-linked-list";

let logSpy: jest.SpyInstance;

beforeEach(() => {
    if (logSpy) {
        logSpy.mockClear();
    }
    logSpy = jest.spyOn(console, "log");
});

describe("Singly Linked List", () => {
    describe("print", () => {
        it("prints a propper message when linked list is empty", () => {
            const linkedList = new LinkedList();

            linkedList.print();

            expect(logSpy).toHaveBeenCalledWith("Linked List is empty");
        });

        it("prints properly when the linked contains only one node", () => {
            const linkedList = new LinkedList();

            linkedList.append(1);
            linkedList.print();

            expect(logSpy).toHaveBeenCalledWith(1);
        });

        it("prints properly when the linked list contains two nodes", () => {
            const linkedList = new LinkedList();

            linkedList.append(1);
            linkedList.append(2);
            linkedList.print();

            expect(logSpy).toHaveBeenCalledTimes(2);
            expect(logSpy).nthCalledWith(1, 1);
            expect(logSpy).nthCalledWith(2, 2);
        });

        it("prints properly when linked list contains more than 2 nodes", () => {
            const linkedList = new LinkedList();
            linkedList.append(4);
            linkedList.append(8);
            linkedList.append(12);
            linkedList.append(1);
            linkedList.append(3);

            linkedList.print();

            expect(logSpy).toHaveBeenCalledTimes(5);
            expect(logSpy).nthCalledWith(1, 4);
            expect(logSpy).nthCalledWith(2, 8);
            expect(logSpy).nthCalledWith(3, 12);
            expect(logSpy).nthCalledWith(4, 1);
            expect(logSpy).nthCalledWith(5, 3);
        });

        it("prepends and appends properly in a mixed way", () => {
            const linkedList = new LinkedList();
            linkedList.append(4);
            linkedList.append(8);
            linkedList.prepend(12);
            linkedList.prepend(1);
            linkedList.append(3);
            linkedList.prepend(4);
            linkedList.append(99);
            linkedList.append(94);
            linkedList.prepend(100);

            linkedList.print();

            expect(logSpy).toHaveBeenCalledTimes(9);
            expect(logSpy).nthCalledWith(1, 100);
            expect(logSpy).nthCalledWith(2, 4);
            expect(logSpy).nthCalledWith(3, 1);
            expect(logSpy).nthCalledWith(4, 12);
            expect(logSpy).nthCalledWith(5, 4);
            expect(logSpy).nthCalledWith(6, 8);
            expect(logSpy).nthCalledWith(7, 3);
            expect(logSpy).nthCalledWith(8, 99);
            expect(logSpy).nthCalledWith(9, 94);
        });
    });

    describe("append", () => {
        it("appens data properly to an empty linked list and sets it as head and tail", () => {
            const linkedList = new LinkedList();
            linkedList.append(1);

            expect(linkedList.head.data).toBe(1);
            expect(linkedList.tail.data).toBe(1);
        });

        it("appends properly to a linked list with a single value and sets tail properly", () => {
            const linkedList = new LinkedList();
            linkedList.append(1);
            linkedList.append(2);

            expect(linkedList.head.data).toBe(1);
            expect(linkedList.tail.data).toBe(2);
        });

        it("appends properly to linked list with more than 2 values and sets head and tail", () => {
            const linkedList = new LinkedList();
            linkedList.append(4);
            linkedList.append(8);
            linkedList.append(12);
            linkedList.append(1);
            linkedList.append(3);

            expect(linkedList.head.data).toBe(4);
            expect(linkedList.tail.data).toBe(3);
        });
    });

    describe("prepend", () => {
        it("prepends properly to an empty linked list and sets it as head and tail", () => {
            const linkedList = new LinkedList();
            linkedList.prepend(1);

            expect(linkedList.head.data).toBe(1);
            expect(linkedList.tail.data).toBe(1);
        });

        it("prepends properly to a linked list with a single node and sets it as head", () => {
            const linkedList = new LinkedList();
            linkedList.prepend(1);
            linkedList.prepend(2);

            expect(linkedList.head.data).toBe(2);
            expect(linkedList.tail.data).toBe(1);
        });

        it("prepends properly to a linked list with multiple nodes and sets it as head", () => {
            const linkedList = new LinkedList();
            linkedList.append(1);
            linkedList.append(3);
            linkedList.append(5);
            linkedList.prepend(10);

            expect(linkedList.head.data).toBe(10);
            expect(linkedList.head.next.data).toBe(1);
            expect(linkedList.head.next.next.data).toBe(3);
            expect(linkedList.tail.data).toBe(5);
        });
    });
});
