import { DoublyLinkedListImpl } from "./doubly-linked-list";
import { ListNode } from "./doubly-linked-list";

let logSpy: jest.SpyInstance;

beforeEach(() => {
    if (logSpy) {
        logSpy.mockClear();
    }
    logSpy = jest.spyOn(console, "log");
});

describe("Doubly Linked List", () => {
    describe("getHead", () => {
        it("returns undefined when head is undefined", () => {
            const ddl = new DoublyLinkedListImpl();
            expect(ddl.getHead()).toBeUndefined();
        });

        it("returns head for ddl with only one element", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);

            expect(ddl.getHead()!.data).toBe(100);
            expect(ddl.getHead()!.next).toBeUndefined();
        });

        it("returns head for ddl with multiple elements", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);
            ddl.append(200);
            ddl.prepend(1);

            expect(ddl.getHead()!.data).toBe(1);
            expect(ddl.getHead()!.next.data).toBe(100);
            expect(ddl.getHead()!.prev).toBeUndefined();
        });
    });

    describe("getTail", () => {
        it("returns undefined when tail is undefined", () => {
            const ddl = new DoublyLinkedListImpl();
            expect(ddl.getTail()).toBeUndefined();
        });

        it("returns tail for ddl with only one element", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);

            expect(ddl.getTail()!.data).toBe(100);
            expect(ddl.getTail()!.next).toBeUndefined();
        });

        it("returns head for ddl with multiple elements", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);
            ddl.append(200);
            ddl.prepend(2);
            ddl.prepend(1000);

            expect(ddl.getTail()!.data).toBe(200);
            expect(ddl.getTail()!.prev.data).toBe(100);
            expect(ddl.getTail()!.next).toBeUndefined();
        });
    });

    describe("getLength", () => {
        it("returns 0 when the ddl has no elements", () => {
            const ddl = new DoublyLinkedListImpl();
            expect(ddl.getLength()).toBe(0);
        });

        it("returns 1 when ddl contains only one element", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);

            expect(ddl.getLength()).toBe(1);
        });

        it("returns length properly when ddl contains more than one element", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);
            ddl.append(200);
            ddl.prepend(300);
            ddl.append(400);

            expect(ddl.getLength()).toBe(4);
        });
    });

    describe("append", () => {
        it("sets node as head and tail when ddl is empty", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(1);

            expect(ddl.getHead()!.data).toBe(1);
            expect(ddl.getTail()!.data).toBe(1);
            expect(ddl.getLength()).toBe(1);
        });

        it("appends in total 2 elements properly", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(1);
            ddl.append(2);

            expect(ddl.getHead()!.data).toBe(1);
            expect(ddl.getHead()!.next.data).toBe(2);
            expect(ddl.getTail()!.data).toBe(2);
            expect(ddl.getTail()!.prev.data).toBe(1);
            expect(ddl.getLength()).toBe(2);
        });

        it("appends more than 2 elements proplery", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(1);
            ddl.append(2);
            ddl.append(3);
            ddl.append(4);
            ddl.append(5);

            expect(ddl.getHead()!.data).toBe(1);
            expect(ddl.getHead()!.next.data).toBe(2);
            expect(ddl.getTail()!.data).toBe(5);
            expect(ddl.getTail()!.prev.data).toBe(4);
            expect(ddl.getLength()).toBe(5);
        });
    });

    describe("prepend", () => {
        it("sets node as head and tail when ddl is empty", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.prepend(1);

            expect(ddl.getHead()!.data).toBe(1);
            expect(ddl.getTail()!.data).toBe(1);
            expect(ddl.getLength()).toBe(1);
        });

        it("prepends properly to a ddl with a single element", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(1);
            ddl.prepend(2);

            expect(ddl.getHead()!.data).toBe(2);
            expect(ddl.getHead()!.next.data).toBe(1);
            expect(ddl.getTail()!.data).toBe(1);
            expect(ddl.getTail()!.prev.data).toBe(2);
            expect(ddl.getLength()).toBe(2);
        });

        it("prepends more than 2 elements proplery", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(1);
            ddl.append(2);
            ddl.prepend(5);
            ddl.append(4);
            ddl.prepend(100);

            expect(ddl.getHead()!.data).toBe(100);
            expect(ddl.getTail()!.data).toBe(4);
            expect(ddl.getHead()!.next.data).toBe(5);
            expect(ddl.getTail()!.prev.data).toBe(2);
            expect(ddl.getLength()).toBe(5);
        });
    });

    describe("print", () => {
        it("prints correct text when ddl is empty", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.print();

            expect(logSpy).toHaveBeenCalledTimes(1);
            expect(logSpy).toHaveBeenCalledWith("Doubly Linked List is empty");
        });

        it("prints correct text when ddl contains only one element", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(1);

            ddl.print();
            expect(logSpy).toHaveBeenCalledTimes(6);
            expect(logSpy).nthCalledWith(1, "Head: 1");
            expect(logSpy).nthCalledWith(2, "Tail: 1");
            expect(logSpy).nthCalledWith(3, "Length: 1");
            expect(logSpy).nthCalledWith(6, "1");
        });

        it("prints a ddl with 2 elements properly", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(1);
            ddl.append(2);

            ddl.print();

            expect(logSpy).toHaveBeenCalledTimes(7);
            expect(logSpy).nthCalledWith(1, "Head: 1");
            expect(logSpy).nthCalledWith(2, "Tail: 2");
            expect(logSpy).nthCalledWith(3, "Length: 2");
            expect(logSpy).nthCalledWith(6, "1");
            expect(logSpy).nthCalledWith(7, "2");
        });

        it("prints a ddl with more than 2 elements properly", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(1);
            ddl.append(2);
            ddl.append(3);
            ddl.append(4);
            ddl.append(5);

            ddl.print();

            expect(logSpy).toHaveBeenCalledTimes(10);
            expect(logSpy).nthCalledWith(1, "Head: 1");
            expect(logSpy).nthCalledWith(2, "Tail: 5");
            expect(logSpy).nthCalledWith(3, "Length: 5");
            expect(logSpy).nthCalledWith(6, "1");
            expect(logSpy).nthCalledWith(10, "5");
        });
    });

    describe("removeFirst", () => {
        it("throws an error when ddl is empty", () => {
            const ddl = new DoublyLinkedListImpl();
            expect(() => ddl.removeFirst()).toThrowError("Doubly Linked List is empty");
        });

        it("sets head and tail to undefined and length to zero when ddl contains only one element", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(1);
            ddl.removeFirst();

            expect(ddl.getHead()).toBeUndefined();
            expect(ddl.getTail()).toBeUndefined();
            expect(ddl.getLength()).toBe(0);
        });

        it("removes first and sets head properly and its prev reference to undefined", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);
            ddl.append(200);
            ddl.append(300);
            ddl.removeFirst();

            expect(ddl.getHead()?.data).toBe(200);
            expect(ddl.getHead()?.prev).toBeUndefined();
            expect(ddl.getHead()?.next!.data).toBe(300);
        });
    });

    describe("removeLast", () => {
        it("throws an error when ddl is empty", () => {
            const ddl = new DoublyLinkedListImpl();
            expect(() => ddl.removeLast()).toThrowError("Doubly Linked List is empty");
        });

        it("sets head and tail to undefined and length to zero when ddl contains only one element", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(1);
            ddl.removeLast();

            expect(ddl.getHead()).toBeUndefined();
            expect(ddl.getTail()).toBeUndefined();
            expect(ddl.getLength()).toBe(0);
        });

        it("removes last and sets tail properly and its next reference to undefined", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);
            ddl.append(200);
            ddl.append(300);
            ddl.removeLast();

            expect(ddl.getHead()?.data).toBe(100);
            expect(ddl.getTail()?.data).toBe(200);
            expect(ddl.getTail()?.next).toBeUndefined();
            expect(ddl.getTail()?.prev!.data).toBe(100);
        });
    });

    describe("get", () => {
        it("throws an error when ddl is empty", () => {
            const ddl = new DoublyLinkedListImpl();
            expect(() => ddl.get(0)).toThrowError("Doubly Linked List is empty");
        });

        it("throws an error when index is greater than length - 1", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);
            ddl.append(200);

            expect(() => ddl.get(1)).not.toThrowError();
            expect(() => ddl.get(2)).toThrowError("Index 2 does not exist. Length: 2");
        });

        it("throws an error when index is less than 0", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);
            expect(() => ddl.get(-1)).toThrowError("Negative index is not allowed");
        });

        it("returns the right element when ddl contains only one element", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);

            expect((ddl.get(0) as ListNode<number>).data).toBe(100);
        });

        it("it returns the right element when ddl contains more than one element", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);
            ddl.append(200);
            ddl.append(300);
            ddl.append(400);

            const firstItem = ddl.get(0) as ListNode<number>;
            const lastItem = ddl.get(ddl.getLength() - 1) as ListNode<number>;
            const randomItem = ddl.get(2) as ListNode<number>;

            expect(firstItem.data).toBe(100);
            expect(lastItem.data).toBe(400);
            expect(randomItem.data).toBe(300);
        });
    });

    describe("set", () => {
        it("throws an error when no node is found in the given index", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);

            expect(() => ddl.set(200, 1)).toThrowError("Index 1 does not exist. Length: 1");
        });

        it("sets the data properly when index exists", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);
            ddl.set(200, 0);

            expect(ddl.getHead()?.data).toBe(200);
        });
    });

    describe("insert", () => {
        it("gracefully handles input errors", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);

            expect(() => ddl.insert(100, -1)).toThrowError("Index can not be less than 0");
            expect(() => ddl.insert(200, 2)).toThrowError("Index is too high. Current length: 1. Allowed next index: 1");
        });

        it("calls the prepend method when the index is 0", () => {
            const ddl = new DoublyLinkedListImpl();
            const prependSpy = jest.spyOn(ddl, "prepend");

            ddl.insert(100, 0);
            expect(prependSpy).toBeCalledTimes(1);
            expect(prependSpy).toHaveBeenCalledWith(100);
            expect(ddl.getHead()?.data).toBe(100);
        });

        it("calls the prepend method when the index is length", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);
            ddl.append(200);

            const appendSpy = jest.spyOn(ddl, "append");

            ddl.insert(300, 2);
            expect(appendSpy).toBeCalledTimes(1);
            expect(appendSpy).toHaveBeenCalledWith(300);
            expect(ddl.getTail()?.data).toBe(300);
        });

        it("inserts and sets references properly", () => {
            const ddl = new DoublyLinkedListImpl();
            ddl.append(100);
            ddl.append(200);
            ddl.append(300);
            ddl.append(500);

            const getSpy = jest.spyOn(ddl, "get");

            ddl.insert(400, 3);

            expect(getSpy).toBeCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith(2);

            expect(ddl.getHead()?.data).toBe(100);
            expect((ddl.get(1) as ListNode<number>).data).toBe(200);
            expect((ddl.get(2) as ListNode<number>).data).toBe(300);
            expect((ddl.get(3) as ListNode<number>).data).toBe(400);
            expect((ddl.getTail() as ListNode<number>).data).toBe(500);
        });
    });

    describe("remove", () => {
        it("gracefully handles input errors", () => {
            const ddl = new DoublyLinkedListImpl();

            expect(() => ddl.remove(0)).toThrowError("Doubly Linked List is empty");

            ddl.append(1);
            expect(() => ddl.remove(-1)).toThrowError("index can not be negative");
            expect(() => ddl.remove(1)).toThrowError("Index 1 does not exist. Length: 1");
        });

        it("calls removeFirst when index is 0", () => {
            const ddl = new DoublyLinkedListImpl();
            const removeFirstSpy = jest.spyOn(ddl, "removeFirst");
            ddl.append(100);
            ddl.remove(0);

            expect(removeFirstSpy).toHaveBeenCalledTimes(1);

            expect(ddl.getLength()).toBe(0);
        });

        it("calls removeLast when index is length - 1", () => {
            const ddl = new DoublyLinkedListImpl();
            const removeLastSpy = jest.spyOn(ddl, "removeLast");
            ddl.append(100);
            ddl.append(200);
            ddl.remove(1);

            expect(removeLastSpy).toHaveBeenCalledTimes(1);

            expect(ddl.getLength()).toBe(1);
            expect(ddl.getHead()?.data).toBe(100);
            expect(ddl.getHead()).toEqual(ddl.getTail());
        });

        it("removes and sets references properly", () => {
            const ddl = new DoublyLinkedListImpl();

            ddl.append(100);
            ddl.append(200);
            ddl.append(300);
            ddl.append(1000);
            ddl.append(400);

            ddl.remove(3);

            expect(ddl.getLength()).toBe(4);
            expect(ddl.getHead()?.data).toBe(100);
            expect((ddl.get(1) as ListNode<number>).data).toBe(200);
            expect((ddl.get(2) as ListNode<number>).data).toBe(300);
            expect((ddl.get(3) as ListNode<number>).data).toBe(400);
        });
    });
});
