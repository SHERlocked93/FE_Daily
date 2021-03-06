# JavaScript 算法简单入门



## 排序算法

### 冒泡排序

冒泡排序是种简单的排序算法。 它重复地走访要排序的数列，依次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢"浮”到数列的顶端。

1. 假设有一个长度为 N 的数组 `arr` ，需要降序排列
2. 先比较 `arr[0]` 与 `arr[1]`，如果 `arr[0] < arr[1]` 就交换它们的位置；
3. 再比较 `arr[1]` 与 `arr[2]`，如果 `arr[1] < arr[2]` 就交换它们的位置；
4. 重复 2~3 ，直至对比完所有元素，此时最小值应该处于数组最后；
5. 重复 2~4，不过每次(第M次)只需要比较到 `arr[N-M]` 即可；
6. 最后数组完成降序排序；

