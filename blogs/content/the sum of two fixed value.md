the sum of two fixed value

description

Input an array and an integer, fina a pair of number in the array so that the sum is equals to the inputed integer. If there are several pairs, you can output any pair. For example, if the input array is [1,2,4,5,7,11,15] and an integer 15, because 4 + 11 = 15, hence output 4 and 11.

analysis and solution

We try to figure out this problem step by step. (we should notice the difference of ordered and unordered.)

The simle method is to list all the conditions.  Namely select two numbers from the array to judge whether equals to the two numbers. The time complexity is O(n^2). Obviously, we need find a more efficient method.

method1: hash map

If the problem has a serious requrement for the time complexity, we may consider "exchange time with room". Namely, for the given number, we can whether the other number exists in the array. The time complexity is O(1) and need to query n times, hence the total time complexity is O(n). But the preqeruirement is that we need an O(n) room to construct the hash map.



method2:  sorting and move to the middle

If the array is unordered, we should make it ordered firstly. For example, for each a[i], find whether sum - a[i] exists in the original array, and we can use binary search to find sum - arr[i], and it needs long time. Hence, added with the sorting time complexity, the total complexity is O(nlogn + nlogn) = O(nlogn), and the room complexity is O(1).

If the array is ordered, let two pointers begin and end to point to the begin and end of the array. Let begin = 0, end = n -1, and begin++, end—, and judge if a[begin]+a[end] equals to the given sum.
- When a[begin] + a[end] > sum, we need to let the value of a[begin] + a[end] decrease. Hence begin will not change, and end—.
- When a[begin] + a[end]sum, we need to increase the value of a[begin] + a[end]. Hence end will not change, and begin++.

    function twoSum(a, sum) {
      var begin = 0;
      var len = a.length;
      var end = len - 1;
      while (begin < end) {
        var curSum = a[begin] + a[end];
        if (curSum === sum) {
          console.log(a[begin] + ' ' + a[end]);
          break;
        } else {
          if (curSum < sum) {
            begin ++;
          } else {
            end --;
          }
        }
      }
    }




