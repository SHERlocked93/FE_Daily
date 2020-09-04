function swap(array, left, right) {
    let rightValue = array[right]
    array[right] = array[left]
    array[left] = rightValue
}

function insertion(array) {
    for (let i = 1; i < array.length; i++) {
        for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--)
            swap(array, j, j + 1)
    }
    return array
}

/**************************/
debugger
console.log(
  insertion([3, 2, 6, 1, 9, 5, 7, 4, 8])
)
