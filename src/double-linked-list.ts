import { DoubleListNode } from './linked-list-nodes'

class DoubleLinkedList<T> {
    private head: DoubleListNode<T> | null
    private tail: DoubleListNode<T> | null
    private size: number

    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    private addHead(value: T) {
        const newNode = new DoubleListNode(value, this.head, null)
        if (this.isEmpty()) {
            this.head = this.tail = newNode
        } else {
            this.head.prev = newNode
            this.head = newNode
        }
        this.size++
    }

    private removeHead() {
        if (this.isEmpty()) return

        this.head.next.prev = null
        this.head = this.head.next
        this.size--
    }

    getSize(): number {
        return this.size
    }

    isEmpty(): boolean {
        return this.size === 0
    }

    addNode(value: T) {
        if (this.isEmpty()) {
            this.addHead(value)
        } else {
            const newNode = new DoubleListNode(value, null, this.tail)
            this.tail.next = newNode
            this.tail = newNode
            this.size++
        }
    }

    removeNode() {
        if (this.isEmpty()) return
        if (this.size === 1) {
            this.head = this.tail = null
        } else {
            this.tail.prev.next = null
            this.tail = this.tail.prev
        }
        this.size--
    }

    getByIndex(index: number): DoubleListNode<T> | null {
        if (index < 0 || index > this.size - 1) return null
        if (index === 0) return this.head
        if (index === this.size - 1) return this.tail

        const mid = Math.ceil(this.size / 2)
        if (index <= mid) {
            return seekFromHead(this.head)
        } else {
            return seekFromTail(this.size - 1, this.tail)
        }

        function seekFromHead(head: DoubleListNode<T>): DoubleListNode<T> | null {
            let currentNode = head
            for (let i = 0; i < index; i++) {
                currentNode = currentNode.next
            }
            return currentNode
        }

        function seekFromTail(end: number, tail: DoubleListNode<T>): DoubleListNode<T> | null {
            let currentNode = tail
            for (let i = end; i > index; i--) {
                currentNode = currentNode.prev
            }
            return currentNode
        }
    }

    insertAt(index: number, value: T) {
        if (index < 0 || index > this.size - 1) return
        if (index === 0) {
            this.addHead(value)
        } else if (index === this.size - 1) {
            this.addNode(value)
        } else {
            const currentNode = this.getByIndex(index)

            if (currentNode) {
                const newNode = new DoubleListNode(value, currentNode, currentNode.prev)
                currentNode.prev.next = newNode
                currentNode.prev = newNode
                this.size++
            }
        }
    }

    removeAt(index: number) {
        if (index < 0 || index > this.size - 1) return
        if (index === 0) {
            this.removeHead()
        } else if (index === this.size - 1) {
            this.removeNode()
        } else {
            const currentNode = this.getByIndex(index)

            if (currentNode) {
                currentNode.prev.next = currentNode.next
                currentNode.next.prev = currentNode.prev
                this.size--
            }
        }
    }

    print() {
        let currentNode = this.head
        let output = '<->'
        while (currentNode) {
            output += `${currentNode.value}<->`
            currentNode = currentNode.next
        }
        console.log(output)
    }
}

export default DoubleLinkedList