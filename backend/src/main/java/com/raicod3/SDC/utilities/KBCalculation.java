package com.raicod3.SDC.utilities;

import com.raicod3.SDC.dtos.earning.EarningResponseDto;

import java.util.List;

public class KBCalculation {

    public static double  calculateEarnings(List<EarningResponseDto> earnings) {
        if(earnings == null || earnings.isEmpty()) {
            return 0.0;
        }
       return earnings.stream().mapToDouble(EarningResponseDto::getFee).sum();
    }
}
