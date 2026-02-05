package com.raicod3.SDC.services;

import com.raicod3.SDC.dtos.earning.EarningResponseDto;
import com.raicod3.SDC.models.Earning;
import com.raicod3.SDC.repositories.EarningRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EarningService {

    private EarningRepository earningRepository;

    public List<EarningResponseDto> allEarnings () {
        List<Earning> earnings = earningRepository.findAll();
        return earnings.stream().map(EarningResponseDto::new).collect(Collectors.toList());
    }
}
