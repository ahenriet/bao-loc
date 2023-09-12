package com.example.baoloc.helper;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.example.baoloc.model.Result;

public class ResultHelperTest {

    @Test
    public void testAllResultsSolveEquality() {
        List<Result> results = ResultHelper.computeAllResults();

        results.forEach(result -> {
            double leftSum = result.getFirst() + 13 * result.getSecond() / (double) result.getThird()
                    + result.getFourth()
                    + 12 * result.getFifth() - result.getSixth()
                    + result.getSeventh() * result.getEighth() / (double) result.getNinth();
            assertEquals(87, leftSum);
        });
    }
}
