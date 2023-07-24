import { SingleListNode } from './linked-list-nodes'

class SingleLinkedList<T> {
    private head: SingleListNode<T> | null
    private size: number

    constructor() {
        this.head = null
        this.size = 0
    }

    private createHead(value: T) {
        this.head = new SingleListNode(value, this.head)
        this.size++
    }

    private removeHead() {
        if (this.isEmpty()) return

        this.head = this.head.next
        this.size--
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
        if (this.isEmpty()) {
            this.createHead(value)
        } else {
            let currentNode = this.head
            while (currentNode.next) {
                currentNode = currentNode.next
            }
            currentNode.next = new SingleListNode(value, null)
            this.size++
        }
    }

    removeNode(index?: number) {
        if (!this.isValidRange(index)) return
        if (index === 0) {
            this.removeHead()
        } else {
            let currentNode = this.head
            for (let i = 0; i < index - 1; i++) {
                currentNode = currentNode.next
            }
            currentNode.next = currentNode.next.next
            this.size--
        }
    }

    findAt(index: number): SingleListNode<T> | null {
        if (!this.isValidRange(index)) return null

        let currentNode = this.head
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next
        }
        return currentNode
    }

    insertAt(index: number, value: T) {
        if (!this.isValidRange(index)) return
        if (index === 0) {
            this.createHead(value)
        } else {
            let currentNode = this.head
            for (let i = 0; i < index - 1; i++) {
                currentNode = currentNode.next
            }
            const newNode = new SingleListNode(value, currentNode.next)
            currentNode.next = newNode
            this.size++
        }
    }

    print(): string {
        let currentNode = this.head
        let output = `(Head)[${currentNode.value}]->`
        while (currentNode.next) {
            currentNode = currentNode.next
            output += `[${currentNode.value}]->`
        }
        console.log(output)
        return output
    }
}

export default SingleLinkedList
