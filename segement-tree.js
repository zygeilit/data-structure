
function SegementTree (arr, merge) {
  this.tree = []
  this.merge = merge
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
