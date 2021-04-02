// Given an array of integers, find the first missing positive integer in linear time and constant space. In other words, find the lowest positive integer that does not exist in the array. The array can contain duplicates and negative numbers as well.

// For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.

// You can modify the input array in-place.

// https://www.geeksforgeeks.org/find-the-smallest-positive-number-missing-from-an-unsorted-array/

const justinLinearTimeAndSpace = arr => {

  const max = arr.reduce((i, m) => i>m ? i : m, 0);

  const valueAtIndex = new Array(max+1);

  arr.forEach(i => {
    if (i <= 0) return;
    valueAtIndex[i] = i;
  });

  console.log(valueAtIndex);
  for (let i=1; i<valueAtIndex.length; i++) {
    if (!valueAtIndex[i]) {
      return i;
    }
  }

  return 1;
}

// console.log(justinLinearTimeAndSpace([3, 4, -1, 1]));
// console.log(justinLinearTimeAndSpace([5, 3, 1, 2, 0, 2, -3, 3, 5]));

const justin = arr => {
  let minSeen = null;
  let maxSeen = null;
  let emptyInRange = null;
  let count = 0;
  let dupes = 0;

  let i = 0;

  let current;
  let swappingWith;
  while ((count+dupes) < arr.length) {
    console.log(arr);
    current = arr[i];
    swappingWith = arr[current];

    if (current < 0) {
      i++;
      continue;
    } else if (swappingWith === current) {
      dupes++;
      i = count;
      continue;
    } else {
      maxSeen = Math.max(current, maxSeen);
      minSeen = Math.min(current, minSeen);
      count++;
      arr[current] = current;
      i = current;
      current = swappingWith;
    }
  }
  return arr;
}

// console.log(justin([3, 4, -1, 1]));
console.log(justin([5, 3, 1, 2, 0, 2, -3, 3, 5]));

/**
 *  0  1  2  3  4  5  6   7  8
 * ----------------------------------------------------------
 * [5, 3, 1, 2, 0, 2, -3, 3, 5] range (5, 5) count 1 dupes 0
 * ->              *
 * [_, 3, 1, 2, 0, 5, -3, 3, 5] range (2, 5) count 2 dupes 0
 *        *      <-2
 * [_, 3, 2, 2, 0, 5, -3, 3, 5] range (1,5) count 3 dupes 0
 *     *<-1
 * [_, 1, 2, 2, 0, 5, -3, 3, 5] range (1,5) count 4 dupes 0
 *     3 ->  *
 * [_, 1, 2, 3, 0, 5, -3, 3, 5] range (1,5) count 4 dupes 1
 *        *<-2
 * [_, 1, 2, 3, _, 5, -3, 3, 5] range (0,5) count 4 dupes 1 emptyInRange 4
 *  *         <-0
 * [0, 1, 2, 3, _, 5, _, 3, 5] range (0,5) count 5 dupes 1 emptyInRange 4
 * [0, 1, 2, 3, _, 5, _, 3, 5] range (0,5) count 5 dupes 1 emptyInRange 4
 *           *         <-3
 * [0, 1, 2, 3, _, 5, _, _, 5] range (0,5) count 5 dupes 2 emptyInRange 4
 *                 *      <-5
 * [0, 1, 2, 3, _, 5, _, _, _] range (0,5) count 5 dupes 3 emptyInRange 4
 * 
 * emptyInRange 4
 */