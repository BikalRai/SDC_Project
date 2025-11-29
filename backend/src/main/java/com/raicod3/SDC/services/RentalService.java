package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.item.ItemRequestDto;
import com.raicod3.SDC.dtos.item.ItemResponseDto;
import com.raicod3.SDC.dtos.rental.BookingResponseDto;
import com.raicod3.SDC.dtos.rental.CancelRentDto;
import com.raicod3.SDC.dtos.rental.RentalRequestDto;
import com.raicod3.SDC.dtos.rental.RentalResponseDto;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.enums.BookingStatus;
import com.raicod3.SDC.enums.ItemStatus;
import com.raicod3.SDC.enums.RentalStatus;
import com.raicod3.SDC.exceptions.*;
import com.raicod3.SDC.models.Booking;
import com.raicod3.SDC.models.Item;
import com.raicod3.SDC.models.Rental;
import com.raicod3.SDC.models.UserModel;
import com.raicod3.SDC.repositories.BookingRepository;
import com.raicod3.SDC.repositories.ItemRepository;
import com.raicod3.SDC.repositories.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemRepository itemsRepository;


    public RentalResponseDto createRentalService(RentalRequestDto rentalRequestDto, CustomUserDetails customUserDetails) {
        Item item = itemRepository.findById(rentalRequestDto.getItemId()).orElseThrow(()-> new HttpNotFoundException("Item not found"));

        if(item.getUser().getId() == customUserDetails.getUser().getId()) {
            throw new HttpUnprocessableException("You are not allowed to rent this item: it belongs to you");
        }

        Rental rental = new Rental(rentalRequestDto, item, customUserDetails.getUser());

        rentalRepository.save(rental);

        item.setStatus(ItemStatus.UNAVAILABLE);
        itemsRepository.save(item);

        return new RentalResponseDto(rental);
    }

    public List<RentalResponseDto> getOwnerRentals(CustomUserDetails customUserDetails) {

        List<Rental> rentals = rentalRepository.findAllByOwner(customUserDetails.getUser().getId());

        return rentals.stream().map( RentalResponseDto::new).collect(Collectors.toList());
    }

    public List<RentalResponseDto> getRenterRentals(CustomUserDetails customUserDetails) {
        List<Rental> rentals = rentalRepository.findAllByRenterId(customUserDetails.getUser().getId());

        return rentals.stream().map( RentalResponseDto::new).collect(Collectors.toList());
    }

    public RentalResponseDto getRentalById(int id) {
        Rental rental = rentalRepository.findById(id).orElseThrow(()-> new HttpNotFoundException("Rental not found"));

        return new RentalResponseDto(rental);
    }

    public ItemResponseDto cancelRent (CustomUserDetails customUserDetails, CancelRentDto cancelRentDto) {
        Rental rental = rentalRepository.findById(cancelRentDto.getRentalId()).orElseThrow(()-> new HttpNotFoundException("Rental not found"));

        if(customUserDetails.getUser().getId() != rental.getRenter().getId()) {
            throw new HttpForbiddenException("You are not allowed to cancel this rental");
        }

        Item item = itemRepository.findById(rental.getItem().getId()).orElseThrow(() -> new HttpNotFoundException("Item not found"));

        rentalRepository.delete(rental);

        item.setStatus(ItemStatus.AVAILABLE);
        itemsRepository.save(item);

        return new ItemResponseDto(item);
    }
}
