import { sleep } from "./helpers/util.js";
import { SortingAlgorithms } from "./helpers/sortingAlgorithms.js";

let nBars = 10;

const numberBars = document.getElementById("numberBars");
const stage = document.getElementById("stage");
const selectAlgorithm = document.getElementById("selectAlgorithm");
const generateBtn = document.getElementById("generateBtn");
const solveBtn = document.getElementById("solveBtn");

let bars = [];
let barsDivs = [];
let isSorting = false;

const sortingAlgorithms = new SortingAlgorithms({});


/* =====================================
   GET BAR POSITION
===================================== */

const getBarPosition = (index) => {

    const stageWidth = stage.clientWidth;

    const padding = 20;
    const gap = 8;

    const availableWidth =
        stageWidth - padding * 2;

    const barWidth = Math.min(
        35,
        (availableWidth - (nBars - 1) * gap) / nBars
    );

    const totalBarsWidth =
        barWidth * nBars +
        gap * (nBars - 1);

    const startPosition =
        (stageWidth - totalBarsWidth) / 2;

    return {
        left:
            startPosition +
            index * (barWidth + gap),

        width: barWidth
    };
};


/* =====================================
   CREATE ARRAY
===================================== */

const start = () => {

    stage.innerHTML = "";

    bars = Array(nBars)
        .fill(0)
        .map(() => {

            return {
                height:
                    Math.floor(
                        Math.random() * 280
                    ) + 20
            };

        });

    barsDivs = [];

    for (let i = 0; i < bars.length; i++) {

        const bar =
            document.createElement("div");

        const position =
            getBarPosition(i);

        bar.style.width =
            `${position.width}px`;

        bar.style.height =
            `${bars[i].height}px`;

        bar.style.left =
            `${position.left}px`;

        bar.classList.add("bar");

        bars[i] = {
            ...bars[i],
            position: i
        };

        barsDivs.push(bar);

        stage.appendChild(bar);
    }
};


/* =====================================
   INITIAL ARRAY
===================================== */

start();


/* =====================================
   RESET COLORS
===================================== */

const resetColors = () => {

    barsDivs.forEach(bar => {

        bar.classList.remove(
            "comparing",
            "sorted"
        );

    });
};


/* =====================================
   MARK SORTED POSITION
===================================== */

const markSorted = (index) => {

    if (
        index >= 0 &&
        index < barsDivs.length
    ) {

        barsDivs[index].classList.remove(
            "comparing"
        );

        barsDivs[index].classList.add(
            "sorted"
        );
    }
};


/* =====================================
   MARK MULTIPLE SORTED POSITIONS
===================================== */

const markSortedPositions = (positions) => {

    if (!positions) {
        return;
    }

    positions.forEach(index => {
        markSorted(index);
    });
};


/* =====================================
   SWAP BARS
===================================== */

async function swapBars(i, j) {

    if (i === j) {
        return;
    }

    /*
        Remove sorted status while
        these two bars are moving.
    */

    barsDivs[i].classList.remove("sorted");
    barsDivs[j].classList.remove("sorted");

    /*
        Red = currently comparing
    */

    barsDivs[i].classList.add("comparing");
    barsDivs[j].classList.add("comparing");

    const positionI =
        getBarPosition(j);

    const positionJ =
        getBarPosition(i);

    barsDivs[i].style.left =
        `${positionI.left}px`;

    barsDivs[j].style.left =
        `${positionJ.left}px`;

    await sleep(250);

    barsDivs[i].classList.remove(
        "comparing"
    );

    barsDivs[j].classList.remove(
        "comparing"
    );

    /*
        Swap the DOM elements
        inside barsDivs.
    */

    const temp = barsDivs[i];

    barsDivs[i] = barsDivs[j];

    barsDivs[j] = temp;
}


/* =====================================
   ALGORITHMS
===================================== */

const algorithms = [

    sortingAlgorithms.bubbleSort,

    sortingAlgorithms.selectionSort,

    sortingAlgorithms.insertionSort,

    sortingAlgorithms.mergeSort,

    sortingAlgorithms.heapSort,

    sortingAlgorithms.quicksort

];


/* =====================================
   SOLVE
===================================== */

const solve = async () => {

    if (isSorting) {
        return;
    }

    isSorting = true;

    solveBtn.disabled = true;
    generateBtn.disabled = true;

    resetColors();

    const array =
        structuredClone(
            bars.map(el => el.height)
        );

    const selectedAlgorithm =
        algorithms[
            selectAlgorithm.selectedIndex
        ];

    const operations =
        selectedAlgorithm(array);


    /*
        Play every sorting operation
    */

    for (
        let i = 0;
        i < operations.length;
        i++
    ) {

        const operation =
            operations[i];

        /*
            Perform swap
        */

        if (
            operation.firstPosition !==
            operation.lastPosition
        ) {

            await swapBars(
                operation.firstPosition,
                operation.lastPosition
            );
        }

        /*
            Mark positions which are
            definitely sorted.
        */

        markSortedPositions(
            operation.sortedPositions
        );

        await sleep(80);
    }


    /*
        Small delay before final state
    */

    await sleep(300);


    /*
        Make sure everything is green
        after sorting is complete.
    */

    barsDivs.forEach(bar => {

        bar.classList.remove(
            "comparing"
        );

        bar.classList.add(
            "sorted"
        );

    });


    isSorting = false;

    solveBtn.disabled = false;
    generateBtn.disabled = false;
};


/* =====================================
   NEW ARRAY
===================================== */

generateBtn.addEventListener(
    "click",
    () => {

        if (isSorting) {
            return;
        }

        nBars =
            parseInt(
                numberBars.value,
                10
            );

        if (
            isNaN(nBars) ||
            nBars < 2
        ) {

            nBars = 2;
        }

        if (nBars > 20) {

            nBars = 20;
        }

        numberBars.value = nBars;

        start();
    }
);


/* =====================================
   SOLVE BUTTON
===================================== */

solveBtn.addEventListener(
    "click",
    solve
);


/* =====================================
   RESIZE
===================================== */

window.addEventListener(
    "resize",
    () => {

        for (
            let i = 0;
            i < barsDivs.length;
            i++
        ) {

            const position =
                getBarPosition(i);

            barsDivs[i].style.width =
                `${position.width}px`;

            barsDivs[i].style.left =
                `${position.left}px`;
        }
    }
);