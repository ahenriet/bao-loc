package com.example.baoloc.helper;

import java.util.ArrayList;
import java.util.List;

import com.example.baoloc.model.Result;

public class ResultHelper {
    /**
     * We want to solve: a + 13*b/c + d + 12*e - f - 11 + g*h/i -10 = 66
     * This is equivalent to solving: a + 13*b/c + d + 12*e - f + g*h/i = 87
     * 
     * @return all solutions of the equality
     */
    public static List<Result> computeAllResults() {
        List<Result> results = new ArrayList<Result>();
        int[] startingSequence = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
        permuteAndCheckEquality(startingSequence, 0, results);
        return results;
    }

    /**
     * @return true if the array is a solution of the equality
     */
    public static boolean isASolution(int[] array) {
        // use a double to avoid rounding issues when dividing integers that are not
        // dividable
        return array.length == 9 && array[0] + 13 * array[1] / (double) array[2] + array[3] + 12 * array[4] - array[5]
                + array[6] * array[7] / (double) array[8] == 87;
    }

    /*
     * Compute the sum for each permutation of numbers in array
     * Return the first one that solves the equality
     */
    private static void permuteAndCheckEquality(int[] array, int index, List<Result> results) {
        if (index == array.length - 1 && isASolution(array)) {
            results.add(new Result(array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7],
                    array[8]));
        } else {
            for (int i = index; i < array.length; i++) {
                swap(array, index, i);
                permuteAndCheckEquality(array, index + 1, results);
                swap(array, index, i);
            }
        }
    }

    /*
     * Swap elements at indices a and b in array
     */
    private static void swap(int[] array, int a, int b) {
        int temp = array[a];
        array[a] = array[b];
        array[b] = temp;
    }
}
