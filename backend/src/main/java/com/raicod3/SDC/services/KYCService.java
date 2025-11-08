package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.kyc.KYCRequestDto;
import com.raicod3.SDC.dtos.kyc.KYCResponseDto;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.enums.KYCStatus;
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

        kycRepo.save(kyc);

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

    public KYCResponseDto getKYCById(int id) {
        KYCModel existingKYC = kycRepo.findById(id).orElseThrow(() -> new HttpNotFoundException("KYC does not exist"));

        return new KYCResponseDto(existingKYC.getUser(), existingKYC);
    }

    public KYCResponseDto updateKYC(int id, KYCRequestDto kycRequestDto) {
        KYCModel existingKYC = kycRepo.findById(id).orElseThrow(() -> new HttpNotFoundException("KYC does not exist"));

        existingKYC.setFullName(kycRequestDto.getFullName());
        existingKYC.setFatherName(kycRequestDto.getFatherName());
        existingKYC.setBirthDate(kycRequestDto.getBirthDate());
        existingKYC.setGender(kycRequestDto.getGender());
        existingKYC.setEmail(kycRequestDto.getEmail());
        existingKYC.setPhone(kycRequestDto.getPhone());
        existingKYC.setProvince(kycRequestDto.getProvince());
        existingKYC.setDistrict(kycRequestDto.getDistrict());
        existingKYC.setMunicipality(kycRequestDto.getMunicipality());
        existingKYC.setWardNumber(kycRequestDto.getWardNumber());
        existingKYC.setStreet(kycRequestDto.getStreet());
        existingKYC.setCitizenshipId(kycRequestDto.getCitizenshipId());
        existingKYC.setIssuedDate(kycRequestDto.getIssuedDate());
        existingKYC.setIssuedDistrict(kycRequestDto.getIssuedDistrict());
        existingKYC.setCitizenshipFrontImageUrl(kycRequestDto.getCitizenshipFrontImageUrl());
        existingKYC.setCitizenshipBackImageUrl(kycRequestDto.getCitizenshipBackImageUrl());

        kycRepo.save(existingKYC);


        return new KYCResponseDto(existingKYC.getUser(), existingKYC);
    }

    public KYCResponseDto updateKYCStatus(int id, KYCStatus kycStatus) {
        KYCModel existingKYC = kycRepo.findById(id).orElseThrow(() -> new HttpNotFoundException("KYC does not exist"));
        existingKYC.setStatus(kycStatus);

        return new KYCResponseDto(existingKYC.getUser(), existingKYC);
    }

    public String deleteKYC(int id) {
        KYCModel existingKYC = kycRepo.findById(id).orElseThrow(() -> new HttpNotFoundException("KYC does not exist"));

        kycRepo.deleteById(existingKYC.getId());

        return "KYC has been deleted";
    }
}
