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

    private createHead(value: T) {
        const newNode = new DoubleListNode(value, null, this.head)

        if (this.getSize() === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            this.head.prev = newNode
            this.head = newNode
        }
        this.size++
    }

    private removeHead() {
        if (this.getSize() === 0) return
        if (this.getSize() === 1) {
            this.head = null
        } else {
            this.head.next.prev = null
            this.head = this.head.next
        }
        this.size--
    }

    private removeTail() {
        if (this.getSize() === 0) return
        if (this.getSize() === 1) {
            this.removeHead()
        } else {
            this.tail.prev.next = null
            this.tail = this.tail.prev
            this.size--
        }
    }

    private isValidRange(index?: number): boolean {
        return (index !== undefined && index !== null && index >= 0 && index < this.getSize())
    }

    isEmpty(): boolean {
        return this.size === 0
    }

    getSize(): number {
        return this.size
    }

    createNode(value: T) {
        if (this.getSize() === 0) {
            this.createHead(value)
        } else {
            const newNode = new DoubleListNode(value, this.tail, null)
            this.tail.next = newNode
            this.tail = newNode
            this.size++
        }
    }

    removeNode(index?: number) {
        if (!this.isValidRange(index)) return

        if (index === 0) {
            this.removeHead()
        } else if (index === this.getSize() - 1) {
            this.removeTail()
        } else {
            const currentNode = this.findAt(index)
            if (!currentNode) return

            currentNode.prev.next = currentNode.next
            currentNode.next.prev = currentNode.prev
            this.size--

        }
    }

    findAt(index: number): DoubleListNode<T> | null {
        if (!this.isValidRange(index)) return null

        const mid = Math.ceil(this.size / 2)
        if (index === 0) return this.head
        if (index === this.getSize() - 1) return this.tail
        if (index <= mid) {
            return seekFromHead(index, this.head)
        } else {
            return seekFromTail(index, this.getSize() - 1, this.tail)
        }

        function seekFromHead(index: number, head: DoubleListNode<T>): DoubleListNode<T> {
            let currentNode = head
            for (let i = 0; i <= index; i++) {
                currentNode = head.next
            }
            return currentNode
        }

        function seekFromTail(index: number, end: number, tail: DoubleListNode<T>): DoubleListNode<T> {
            let currentNode = tail
            for (let i = end; i >= index; i--) {
                currentNode = currentNode.prev
            }
            return currentNode
        }
    }

    insertAt(index: number, value: T) {
        if (!this.isValidRange(index)) return
        if (index === 0) {
            this.createHead(value)
        } else if (index === this.getSize() - 1) {
            this.createNode(value)
        } else {
            const currentNode = this.findAt(index)
            if (!currentNode) return

            const newNode = new DoubleListNode(value, currentNode.prev, currentNode)
            currentNode.prev.next = newNode
            currentNode.prev = newNode
            this.size++
        }
    }

    print(): string {
        if (this.getSize() === 0) return ''

        let currentNode = this.head
        let output = `(Head)${currentNode.value}`

        while (currentNode) {
            currentNode = currentNode.next
            if (currentNode) output += `<->${currentNode.value}`
        }
        output += '(Tail)'
        console.log(output)
        return output
    }
}

export default DoubleLinkedList