class SingleListNode<T> {
    value: T
    next: SingleListNode<T> | null

    constructor(value: T, next: SingleListNode<T> | null) {
        this.value = value
        this.next = next
    }
}

class DoubleListNode<T> {
    value: T
    next: DoubleListNode<T> | null
    prev: DoubleListNode<T> | null

    constructor(value: T, next: DoubleListNode<T> | null, prev: DoubleListNode<T> | null) {
        this.value = value
        this.next = next
        this.prev = prev
    }
}

export { SingleListNode, DoubleListNode }