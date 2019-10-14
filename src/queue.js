const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		
		if (maxSize != null) {
			this.maxSize = maxSize;
		} else {
			this.maxSize = 30;
		}
		this.heap = new MaxHeap;
		this.currentSize=0;
	}

	push(data, priority) {

		if (this.currentSize == this.maxSize) {
			throw Error;
		} else {
			this.currentSize++;
			this.heap.push(data,priority);
		}

	}

	shift() {
		if (this.isEmpty()) { 
			throw Error;
		}
		let data=this.heap.pop();
		this.currentSize--
		return data;
	}

	size() {
		return this.currentSize;
	}

	isEmpty() {
		if (this.currentSize == 0) {
			return true;
		} else {
			return false;
		}

	}
}

module.exports = PriorityQueue;
