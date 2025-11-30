package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.kyc.KYCProcessStatusRequest;
import com.raicod3.SDC.dtos.kyc.KYCRequestDto;
import com.raicod3.SDC.dtos.kyc.KYCResponseDto;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.enums.KYCStatus;
import com.raicod3.SDC.exceptions.HttpForbiddenException;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.exceptions.HttpUnprocessableException;
import com.raicod3.SDC.models.KYCModel;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.KYCRepository;
import com.raicod3.SDC.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.time.LocalDateTime;
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

        UserModel user = userRepo.findById(customUserDetails.getUser().getId()).orElseThrow(() -> new HttpNotFoundException("User does not exist"));

        Optional<KYCModel> existing = kycRepo.findByUser(customUserDetails.getUser());

        if(existing.isPresent()) {
            throw new HttpUnprocessableException("You already have a KYC");
        }

        KYCModel kyc = new KYCModel(kycRequestDto, user);
        kyc.setSubmittedDate(LocalDate.now());

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

    public KYCResponseDto updateKYC(int id, KYCRequestDto kycRequestDto, CustomUserDetails customUserDetails) {
        KYCModel existingKYC = kycRepo.findById(id).orElseThrow(() -> new HttpNotFoundException("KYC does not exist"));

        if(existingKYC.getUser().getId() != customUserDetails.getUser().getId()) {
            throw new HttpUnprocessableException("You are not allowed to update a KYC");
        }

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

    public KYCResponseDto updateKYCStatus(int id, KYCProcessStatusRequest kycStatus, CustomUserDetails customUserDetails) {
        KYCModel existingKYC = kycRepo.findById(id).orElseThrow(() -> new HttpNotFoundException("KYC does not exist"));

        if(!customUserDetails.getUser().getRole().equals("ADMIN")) {
            throw new HttpForbiddenException("You are not allowed to update KYC status.");
        }

        existingKYC.setStatus(kycStatus.getStatus());
        existingKYC.setVerifiedDate(LocalDate.now());

        return new KYCResponseDto(existingKYC.getUser(), existingKYC);
    }

    public String deleteKYC(int id, CustomUserDetails customUserDetails) {
        KYCModel existingKYC = kycRepo.findById(id).orElseThrow(() -> new HttpNotFoundException("KYC does not exist"));

        if(existingKYC.getUser().getId() != customUserDetails.getUser().getId()) {
            throw new HttpForbiddenException("You are not allowed to delete this KYC");
        }

        kycRepo.deleteById(existingKYC.getId());

        return "KYC has been deleted";
    }
}
