// n
export function DurstenfeldShuffle({ array, steps }) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        steps.push([...array])
    }
}

// n^2
export function InsertionSort({ array, steps }) {
    for (let i = 0; i < array.length; i++) {
        const x = array[i]
        let lastI = i
        for (let j = lastI - 1; j >= 0; j--) {
            const y = array[j]
            if (x.value < y.value) {
                [array[lastI], array[j]] = [array[j], array[lastI]];
                lastI = j
                steps.push([...array])
            }
        }
    }
}

// n^2
export function SelectionSort({ array, steps }) {
    for (let i = 0, smallest = 0, cursor = 0; i < array.length; i++) {
        smallest = array[i].value
        cursor = i
        for (let j = i + 1; j < array.length; j++) {
            const y = array[j].value
            if (y < smallest) {
                smallest = y
                cursor = j
            }
        }
        [array[i], array[cursor]] = [array[cursor], array[i]];
        steps.push([...array])
    }
}

// n log n
export function MergeSort({ array, steps }) {
    let temp = []
    for (let width = 1; width < array.length; width *= 2) {
        for (let i = 0; i < array.length; i += width * 2) {
            let l = i
            let r = Math.min(i + width, array.length)
            let e = Math.min(i + width * 2, array.length)
            for (let j = l, ll = l, rr = r; j < e; j++) {
                if (ll < r && (rr >= e || array[ll].value <= array[rr].value)) {
                    temp[j] = array[ll]
                        const arr = [...array];
                        [arr[j], arr[ll]] = [arr[ll], arr[j]];
                        steps.push(arr)
                    ll++
                } else {
                    temp[j] = array[rr]
                        const arr = [...array];
                        [arr[j], arr[rr]] = [arr[rr], arr[j]];
                        steps.push(arr)
                    rr++
                }
            }
        }
        [temp, array] = [array, temp]
    }
    steps.push([...array])
}

// n^2
export function BubbleSort({ array, steps }) {
    let swapped = false, n = array.length
    do {
        swapped = false
        for (let i = 1; i < n; i++) {
            if (array[i - 1].value > array[i].value) {
                [array[i], array[i - 1]] = [array[i - 1], array[i]]
                swapped = true
            }
        }
        n -= 1
        steps.push([...array])
    } while (swapped)
}

// n log n
export function Quicksort({ array, steps }) {
    function A(lo, hi) {
        const pivot = array[hi]
        let i = lo
        for (let j = lo; j < hi; j++) {
            if (array[j].value < pivot.value) {
                [array[i], array[j]] = [array[j], array[i]]
                steps.push([...array])
                i++
            }
        }
        [array[i], array[hi]] = [array[hi], array[i]]
        steps.push([...array])
        return i
    }
    function B(lo, hi) {
        if (lo < hi) {
            const p = A(lo, hi)
            B(lo, p - 1)
            B(p + 1, hi)
        }
    }
    B(0, array.length - 1)
}