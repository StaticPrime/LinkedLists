import { SingleListNode } from './linked-list-nodes'

class SingleLinkedList<T> {
    private head: SingleListNode<T> | null
    private size: number

    constructor() {
        this.head = null
        this.size = 0
    }

    private addHead(value: T) {
        this.head = new SingleListNode(value, this.head)
        this.size++
    }

    private removeHead() {
        if (this.isEmpty()) return

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
            let currentNode = this.head
            while (currentNode.next) {
                currentNode = currentNode.next
            }
            currentNode.next = new SingleListNode(value, null)
            this.size++
        }
    }

    removeNode() {
        if (this.isEmpty()) return

        let currentNode = this.head
        while (currentNode) {
            if (currentNode.next && !currentNode.next.next) {
                currentNode.next = null
                this.size--
            }
            currentNode = currentNode.next
        }
    }

    getByIndex(index: number): SingleListNode<T> | null {
        if (index < 0 || index > this.size - 1) return null
        if (index === 0) return this.head

        let current = this.head
        for (let i = 0; i < index; i++) {
            current = current.next
        }
        return current
    }

    insertAt(index: number, value: T) {
        if (index < 0 || index > this.size - 1) return
        if (index === 0) {
            this.addHead(value)
        } else {
            const currentIndexNode = this.getByIndex(index)

            if (currentIndexNode) {
                currentIndexNode.next = new SingleListNode(value, currentIndexNode.next)
                this.size++
            }
        }
    }

    removeAt(index: number) {
        if (index < 0 || index > this.size) return
        if (index === 0) {
            this.removeHead()
        } else {
            const currentIndexNode = this.getByIndex(index)

            if (currentIndexNode) {
                currentIndexNode.next = currentIndexNode.next.next
                this.size--
            }
        }
    }
}

export default SingleLinkedList
