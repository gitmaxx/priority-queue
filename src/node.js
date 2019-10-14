class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left == null) {
			this.left = node;
			node.parent =this;
		} else {
			if (this.right == null) {
				this.right = node;
				node.parent = this;
			}
		}

	}

	removeChild(node) {

		if (this.left == node) {
			this.left = null;
			node.parent = null;
		} else {
			if (this.right == node) {
				this.right = null;
				node.parent = null;
			} else {
				throw Error;
			}
		}
	}

	remove() {
		if (this.parent != null) {
			this.parent.removeChild (this);
		}
	}

	swapWithParent() {
		
		
		if (this.parent != null) {
			let temp = this.parent;
			if (this.parent.parent !=null) {
				if (this.parent.parent.left == this.parent) {
					this.parent.parent.left = this;
				} else {
					this.parent.parent.right = this;
				}
			}
			if (this.left !=null) {
				this.left.parent = this.parent;
			}
			if (this.right !=null) {
				this.right.parent = this.parent;
			}

			if (this.parent.left == this) {
				let temp1 = this.parent.right;
				this.parent.left = this.left;
				this.parent.right = this.right;
				this.left=this.parent;
				this.right=temp1;
				if (temp1 != null) { temp1.parent =this;}
				
				
			} else {
				let temp1 = this.parent.left;
				this.parent.left = this.left;
				this.parent.right = this.right;
				if (temp1 != null) { temp1.parent =this;}
				this.right=this.parent;
				this.left=temp1;
			}

			this.parent = this.parent.parent;
			temp.parent = this;

		}
	}
}

module.exports = Node;
