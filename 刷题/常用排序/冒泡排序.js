function swap(array, left, right) {
    let rightValue = array[right]
    array[right] = array[left]
    array[left] = rightValue
}

function bubble(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) swap(array, i, j)
        }
    }
    return array
}

/**************************/

console.log(
  bubble([3, 2, 6, 1, 9, 5, 7, 4, 8])
)
