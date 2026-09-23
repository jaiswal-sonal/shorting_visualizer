const Compare = {

    LESS_THAN: -1,

    BIGGER_THAN: 1

};


const defaultCompare = (a, b) => {

    if (a === b) {
        return 0;
    }

    return a < b
        ? Compare.LESS_THAN
        : Compare.BIGGER_THAN;
};


/* =====================================
   SORTING ALGORITHMS CLASS
===================================== */

class SortingAlgorithms {


    /* =================================
       BUBBLE SORT
    ================================= */

    bubbleSort(array) {

        const operations = [];

        const n = array.length;


        for (let i = 0; i < n; i++) {

            let swapped = false;


            for (
                let j = 0;
                j < n - i - 1;
                j++
            ) {

                if (
                    array[j] >
                    array[j + 1]
                ) {

                    const temp =
                        array[j];

                    array[j] =
                        array[j + 1];

                    array[j + 1] =
                        temp;

                    swapped = true;


                    operations.push({

                        firstPosition: j,

                        lastPosition: j + 1,

                        sortedPositions: []

                    });

                }
            }


            /*
                The largest element has reached
                its final position.
            */

            operations.push({

                firstPosition: -1,

                lastPosition: -1,

                sortedPositions: [
                    n - i - 1
                ]

            });


            if (!swapped) {

                break;
            }
        }


        return operations;
    }


    /* =================================
       SELECTION SORT
    ================================= */

    selectionSort(array) {

        const operations = [];

        const n = array.length;


        for (
            let i = 0;
            i < n - 1;
            i++
        ) {

            let min = i;


            for (
                let j = i + 1;
                j < n;
                j++
            ) {

                if (
                    array[j] <
                    array[min]
                ) {

                    min = j;
                }
            }


            if (min !== i) {

                const temp =
                    array[i];

                array[i] =
                    array[min];

                array[min] =
                    temp;


                operations.push({

                    firstPosition: i,

                    lastPosition: min,

                    sortedPositions: []

                });

            }


            /*
                The minimum element is now
                permanently placed.
            */

            operations.push({

                firstPosition: -1,

                lastPosition: -1,

                sortedPositions: [
                    i
                ]

            });

        }


        /*
            Last element is automatically sorted.
        */

        operations.push({

            firstPosition: -1,

            lastPosition: -1,

            sortedPositions: [
                n - 1
            ]

        });


        return operations;
    }


    /* =================================
       INSERTION SORT
    ================================= */

    insertionSort(array) {

        const operations = [];

        const n = array.length;


        for (
            let i = 1;
            i < n;
            i++
        ) {

            let j = i;


            while (
                j > 0 &&
                array[j] <
                array[j - 1]
            ) {

                const temp =
                    array[j];

                array[j] =
                    array[j - 1];

                array[j - 1] =
                    temp;


                operations.push({

                    firstPosition: j - 1,

                    lastPosition: j,

                    sortedPositions: []

                });


                j--;
            }


            /*
                The prefix is sorted relative
                to itself.

                We highlight the current
                inserted position.
            */

            operations.push({

                firstPosition: -1,

                lastPosition: -1,

                sortedPositions:
                    Array.from(
                        {
                            length: i + 1
                        },
                        (_, index) => index
                    )

            });

        }


        return operations;
    }


    /* =================================
       MERGE SORT
    ================================= */

    mergeSort(array) {

        const operations = [];


        const merge = (
            left,
            mid,
            right
        ) => {

            const temp = [];

            let i = left;

            let j = mid + 1;


            while (
                i <= mid &&
                j <= right
            ) {

                if (
                    array[i] <=
                    array[j]
                ) {

                    temp.push(
                        array[i++]
                    );

                } else {

                    temp.push(
                        array[j++]
                    );

                }
            }


            while (i <= mid) {

                temp.push(
                    array[i++]
                );

            }


            while (j <= right) {

                temp.push(
                    array[j++]
                );

            }


            /*
                Put merged values back.
            */

            for (
                let k = 0;
                k < temp.length;
                k++
            ) {

                array[left + k] =
                    temp[k];

            }


            /*
                Since merge sort has no simple
                single swap operation, create
                visual operations by swapping
                the required positions.
            */

            for (
                let k = left;
                k <= right;
                k++
            ) {

                let correctIndex = k;

                for (
                    let x = k;
                    x <= right;
                    x++
                ) {

                    if (
                        array[x] ===
                        temp[k - left]
                    ) {

                        correctIndex = x;

                        break;
                    }
                }


                if (
                    correctIndex !== k
                ) {

                    const value =
                        array[k];

                    array[k] =
                        array[correctIndex];

                    array[correctIndex] =
                        value;


                    operations.push({

                        firstPosition: k,

                        lastPosition:
                            correctIndex,

                        sortedPositions: []

                    });

                }

            }


            /*
                The merged section is now sorted.
            */

            operations.push({

                firstPosition: -1,

                lastPosition: -1,

                sortedPositions:
                    Array.from(
                        {
                            length:
                                right - left + 1
                        },
                        (_, index) =>
                            left + index
                    )

            });

        };


        const mergeSortRecursive = (
            left,
            right
        ) => {

            if (left >= right) {

                return;
            }


            const mid =
                Math.floor(
                    (left + right) / 2
                );


            mergeSortRecursive(
                left,
                mid
            );


            mergeSortRecursive(
                mid + 1,
                right
            );


            merge(
                left,
                mid,
                right
            );
        };


        mergeSortRecursive(
            0,
            array.length - 1
        );


        return operations;
    }


    /* =================================
       HEAP SORT
    ================================= */

    heapSort(array) {

        const operations = [];

        const n = array.length;


        const heapify = (
            size,
            root
        ) => {

            let largest = root;

            const left =
                2 * root + 1;

            const right =
                2 * root + 2;


            if (
                left < size &&
                array[left] >
                array[largest]
            ) {

                largest = left;
            }


            if (
                right < size &&
                array[right] >
                array[largest]
            ) {

                largest = right;
            }


            if (
                largest !== root
            ) {

                const temp =
                    array[root];

                array[root] =
                    array[largest];

                array[largest] =
                    temp;


                operations.push({

                    firstPosition:
                        root,

                    lastPosition:
                        largest,

                    sortedPositions: []

                });


                heapify(
                    size,
                    largest
                );
            }
        };


        /*
            Build max heap.
        */

        for (
            let i =
                Math.floor(n / 2) - 1;

            i >= 0;

            i--
        ) {

            heapify(
                n,
                i
            );
        }


        /*
            Extract elements.
        */

        for (
            let i = n - 1;
            i > 0;
            i--
        ) {

            const temp =
                array[0];

            array[0] =
                array[i];

            array[i] =
                temp;


            operations.push({

                firstPosition: 0,

                lastPosition: i,

                sortedPositions: [
                    i
                ]

            });


            heapify(
                i,
                0
            );

        }


        /*
            First element is also sorted.
        */

        operations.push({

            firstPosition: -1,

            lastPosition: -1,

            sortedPositions: [0]

        });


        return operations;
    }


    /* =================================
       QUICK SORT
    ================================= */

    quicksort(
        array,
        compareFn = defaultCompare
    ) {

        const operations = [];


        const partition = (
            left,
            right
        ) => {

            const pivot =
                array[
                    Math.floor(
                        (left + right) / 2
                    )
                ];


            let i = left;

            let j = right;


            while (i <= j) {

                while (
                    compareFn(
                        array[i],
                        pivot
                    ) ===
                    Compare.LESS_THAN
                ) {

                    i++;
                }


                while (
                    compareFn(
                        array[j],
                        pivot
                    ) ===
                    Compare.BIGGER_THAN
                ) {

                    j--;
                }


                if (i <= j) {

                    if (i !== j) {

                        const temp =
                            array[i];

                        array[i] =
                            array[j];

                        array[j] =
                            temp;


                        operations.push({

                            firstPosition: i,

                            lastPosition: j,

                            sortedPositions: []

                        });

                    }


                    i++;

                    j--;
                }
            }


            return i;
        };


        const quickSortRecursive = (
            left,
            right
        ) => {

            if (left >= right) {

                /*
                    A single element is
                    automatically sorted.
                */

                if (left === right) {

                    operations.push({

                        firstPosition: -1,

                        lastPosition: -1,

                        sortedPositions: [
                            left
                        ]

                    });

                }

                return;
            }


            const index =
                partition(
                    left,
                    right
                );


            /*
                The pivot is now in its
                correct final position.
            */

            if (
                index - 1 >= left
            ) {

                operations.push({

                    firstPosition: -1,

                    lastPosition: -1,

                    sortedPositions: [
                        index - 1
                    ]

                });

            }


            if (left < index - 1) {

                quickSortRecursive(
                    left,
                    index - 1
                );

            }


            if (index < right) {

                quickSortRecursive(
                    index,
                    right
                );

            }

        };


        quickSortRecursive(
            0,
            array.length - 1
        );


        return operations;
    }

}


export {
    SortingAlgorithms
};