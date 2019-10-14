const Node = require('./node');

class MaxHeap {
	constructor() {
		 this.root = null;
		 this.parentNodes = [];
		 this.currentSize=0;
	}

	push(data, priority) {
		
		let newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
	}

	pop() {
		if (!this.isEmpty()) {
			let detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			return detached.data;
		}
		}
		

	detachRoot() {
		let detachedNode = this.root
		this.root = null;
		if (detachedNode.left != null) {
			detachedNode.left.parent = null;
		}
		if (detachedNode.right != null) {
			detachedNode.right.parent = null;
		}
		if (this.parentNodes[0] == detachedNode ) {this.parentNodes.shift();}
		this.currentSize--;

		return  detachedNode;
	}

	restoreRootFromLastInsertedNode(detached) {

		function isEmpty(object) {
			for (let key in object) {
			  return false;
			}
			return true;
		  }

		if (isEmpty(detached) || detached == null || this.parentNodes.length==0)  {
			return;
		}
		
		let lastNode = this.parentNodes.pop();
		
		if (detached.left != lastNode) {
			lastNode.left=detached.left;
			detached.left.parent=lastNode;
		}
		if (detached.right != lastNode && detached.right !=null) {
			lastNode.right=detached.right;
			detached.right.parent=lastNode;
		}
		
		if (lastNode.parent != null && lastNode.parent.left == lastNode) {
			lastNode.parent.left = null;
		} 
		
		if (lastNode.parent != null && lastNode.parent.right == lastNode) {
			lastNode.parent.right = null;
			this.parentNodes.unshift(lastNode.parent);
		}
		
	

		this.root = lastNode;
		this.root.parent = null;
		if (this.root.right == null) {this.parentNodes.unshift(this.root);}

	}

	size() {
		return this.currentSize;
	}

	isEmpty() {
		return this.currentSize==0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.currentSize= 0;
	}

	insertNode(node) {
		
		if (this.root == null) {
			this.root =node;
			this.parentNodes[0] = node;
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right != null) {this.parentNodes.shift(); }
		}
		this.currentSize++;
	}

	shiftNodeUp(node) {
		
		while (node.parent != null && (node.priority > node.parent.priority)) {
			 

			let nodeIndex = this.parentNodes.indexOf(node);
			let parentIndex = this.parentNodes.indexOf(node.parent);
			if (nodeIndex != -1 && parentIndex != -1) {
				this.parentNodes[nodeIndex] = node.parent;
				this.parentNodes[parentIndex] = node;
			}
			if (nodeIndex != -1 && parentIndex == -1) {
				this.parentNodes[nodeIndex] = node.parent;
			}
			if (nodeIndex == -1 && parentIndex != -1) {
				this.parentNodes[parentIndex] = node;
			}

			if (node.parent == this.root) this.root = node; 

			node.swapWithParent();
			this.shiftNodeUp (node);

		}

	}

	shiftNodeDown(node) {
		if(node == null) { return ;}

		while ( (node.left != null && node.left.priority > node.priority) || (node.right != null && node.right.priority > node.priority)) {
			 

			let nodeIndex = this.parentNodes.indexOf(node);
			let childNode ={};
			let childIndex = 0;


			if (node.left != null && node.left.priority > node.priority && (node.right == null || node.left.priority >= node.right.priority)) {
				childIndex = this.parentNodes.indexOf(node.left);
				childNode = node.left;
			 } else {
				childIndex = this.parentNodes.indexOf(node.right);
				childNode = node.right;
			 }
			
			if (nodeIndex != -1 && childIndex != -1) {
				this.parentNodes[nodeIndex] = childNode;
				this.parentNodes[childIndex] = node;
			}
			if (nodeIndex != -1 && childIndex == -1) {
				this.parentNodes[nodeIndex] = childNode;
			}
			if (nodeIndex == -1 && childIndex != -1) {
				this.parentNodes[childIndex] = node;
			}

			if (node == this.root) {this.root = childNode; }

			childNode.swapWithParent();
			this.shiftNodeDown (node);

		}



	}
}

module.exports = MaxHeap;
