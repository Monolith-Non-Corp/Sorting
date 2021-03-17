import _ from 'lodash'

import {
    DurstenfeldShuffle,
    InsertionSort,
    SelectionSort,
    MergeSort,
    BubbleSort,
    Quicksort,
} from './sorts'

export const numbers = _.range(1, 100).map((value) => ({ value }))
export const sorts = [
    {
        name: 'Durstenfeld Shuffle',
        fn: DurstenfeldShuffle
    },
    {
        name: 'Insertion Sort',
        fn: InsertionSort
    },
    {
        name: 'Selection Sort',
        fn: SelectionSort
    },
    {
        name: 'MergeSort Sort',
        fn: MergeSort
    },
    {
        name: 'Bubble Sort',
        fn: BubbleSort
    },
    {
        name: 'Quick Sort',
        fn: Quicksort
    },
]