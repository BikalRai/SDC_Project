package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.kyc.KYCRequestDto;
import com.raicod3.SDC.dtos.kyc.KYCResponseDto;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.models.KYCModel;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.KYCRepository;
import com.raicod3.SDC.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class KYCService {
    @Autowired
    private KYCRepository kycRepo;

    @Autowired
    private UserRepository userRepo;

    public KYCResponseDto createKYC(CustomUserDetails customUserDetails, KYCRequestDto kycRequestDto) {

        KYCModel kyc = new KYCModel(kycRequestDto);

        UserModel user = userRepo.findById(customUserDetails.getUser().getId()).orElseThrow(() -> new HttpNotFoundException("User does not exist"));

        return new KYCResponseDto(user, kyc);
    }

    public  KYCResponseDto getKYC(CustomUserDetails customUserDetails) {
        UserModel user = userRepo.findById(customUserDetails.getUser().getId()).orElseThrow(() -> new HttpNotFoundException("User does not exist"));

        Optional<KYCModel> existingKyc = kycRepo.findByUser(customUserDetails.getUser());

        if (existingKyc.isEmpty()) {
            throw new HttpNotFoundException("User with KYC does not exist");
        }

        return new KYCResponseDto(user, existingKyc.get());
    }

    public List<KYCResponseDto> getAllKYCs() {
        List<KYCModel> kycs = kycRepo.findAll();
        return  kycs.stream().map(kyc -> new KYCResponseDto(kyc.getUser(), kyc)).collect(Collectors.toList());
    }
}
