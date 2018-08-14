// 线段树

function SegementTree (arr, merge) {
  this.tree = []
  this.data = arr
  // 外部可通过业务场景自定义的融合逻辑（不局限于相加）
  this.merge = merge || function (l, r) { return l + r }
  generate(arr, 0, arr.length - 1)
}

SegementTree.prototype = {

  'generate': function (treeIndex, l, r) {

    var leftTreeIndex = this.leftChile(treeIndex)
    var rightTreeIndex = this.rightChile(treeIndex)

    var mid = l + (r - l) / 2

    this.generate(leftTreeIndex, l, mid)
    this.generate(rightTreeIndex, mid + 1, r)

    this.tree[treeIndex] = this.merge(
      this.tree[leftTreeIndex],
      this.tree[rightTreeIndex]
    )
  },
  
  'query': function (ql, qr) {
    return this.private_query(0, 0, this.data.length - 1, ql, qr)
  },
  
  'private_query': function (treeIndex, l, r, ql, qr) {
    if (l === ql && r === qr) {
      return tree[treeIndex]
    }
    
    // **
    var mid = l + (r - l) / 2
    
    var leftTreeIndex = this.leftChile(treeIndex)
    var rightTreeIndex = this.rightChile(treeIndex)
    
    // 查询区间完全在 左区间/右区间
    if (ql >= mid + 1) {
      return this.query(rightTreeIndex, mid + 1, r, ql, qr)
    } else if (qr <= mid) {
      return this.query(leftTreeIndex, l, mid, ql, qr)
    }
    
    // 没有在完全落在左右孩子中，只是部分
    // qr不再左侧，在右侧区间中
    var leftResult = this.private_query(leftTreeIndex, l, mid, ql, mid)
    var rightResult = this.private_query(rightTreeIndex, mid + 1, r, mid + 1, qr)
    
    this.merge(leftResult, rightResult)
  },
  
  'set': function (index, e) {
    this.private_set(0, 0, this.data.length - 1, index, e)
  },
  
  'private_set': function (treeIndex, l, r, index, e) {
    if (l == index) {
      return this.tree[treeIndex]
    }
    
    var mid = l + (r - l) / 2
    var leftTreeIndex = this.leftChile(treeIndex)
    var rightTreeIndex = this.rightChile(treeIndex)

    // 当个节点的set不会涉及到，分布在左右子树中
    if (index <= mid) {
      this.private_set(leftTreeIndex, l, mid, index, e)
    } else {
      this.private_set(rightTreeIndex, mid + 1, r, index, e)
    }
    
    // 当节点的值发生变化后，所有的父节点统计的线段值都会发生变动
    this.tree[treeIndex] = this.merge(
      this.tree[leftTreeIndex],
      this.tree[rightTreeIndex]
    )
  },

  // 0 * index + 1 = 1 => 数组中下标 1 的位置
  // 如果在数组表示法中，起始位置是 1，这里就可省略掉 “+1”
  'leftChild': function (index) {
    return 2 * index + 1
  },

  // 在完全二叉树的数组表示中，所表示的右孩子索引
  'rigthChild': function (index) {
    return 2 * index + 2
  },

  'toString': function () {
    let str = '['
    this.tree.forEach(function (r, i) {
      str += r ? r : 'null'
      if (i != this.tree.length) str += ','
    })
    str += ']'
    return str
  }
}
