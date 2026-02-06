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
import jakarta.transaction.Transactional;
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


    @Transactional
    public RentalResponseDto createRentalService(RentalRequestDto rentalRequestDto, CustomUserDetails customUserDetails) {
        Item item = itemRepository.findById(rentalRequestDto.getItemId()).orElseThrow(()-> new HttpNotFoundException("Item not found"));

        if(item.getUser().getId() == customUserDetails.getUser().getId()) {
            throw new HttpUnprocessableException("You are not allowed to rent this item: it belongs to you");
        }

        if(item.getStatus() != ItemStatus.AVAILABLE) {
            throw new HttpUnprocessableException("This item is currently unavailable.");
        }

        Rental rental = new Rental(rentalRequestDto, item, customUserDetails.getUser());

        if ("COD".equalsIgnoreCase(rentalRequestDto.getPaymentMethod())) {
            // For COD, we can move directly to a status that allows the rental to proceed,
            // but the item stays locked until returned.
            rental.setStatus(RentalStatus.WAITING_PAYMENT);
        } else {
            // For ESEWA, it MUST stay in WAITING_PAYMENT until the webhook hits
            rental.setStatus(RentalStatus.WAITING_PAYMENT);
        }

        rentalRepository.save(rental);

        item.setStatus(ItemStatus.UNAVAILABLE);

        itemRepository.save(item);

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
        itemRepository.save(item);

        return new ItemResponseDto(item);
    }

    @Transactional
    public RentalResponseDto confirmPaymentAndActivateRental(int rentalId) {
        // 1. Find the rental or throw an error if it doesn't exist
        Rental rental = rentalRepository.findById(rentalId)
                .orElseThrow(() -> new HttpNotFoundException("Rental record not found."));

        // 2. Update statuses
        rental.setStatus(RentalStatus.PAID); // Or RentalStatus.ACTIVE depending on your Enum

        Item item = rental.getItem();
        item.setStatus(ItemStatus.RENTED); // Make the item unavailable for others

        // 3. Save changes
        rentalRepository.save(rental);
        itemRepository.save(item);

        return new RentalResponseDto(rental); // Assuming your DTO has a constructor for the model
    }

    @Transactional
    public RentalResponseDto completeRentalByQr(String token, CustomUserDetails currentUser) {
        // 1. Find the rental by the unique UUID token
        Rental rental = (Rental) rentalRepository.findByReturnToken(token).orElseThrow(() -> new HttpNotFoundException("Invalid or expired QR code."));

        // 2. Security Check: Only the OWNER of the item should be able to confirm the return
        // We compare the ID of the logged-in user with the ownerId stored in the rental
        if (rental.getOwnerId() != currentUser.getUser().getId()) {
            throw new HttpForbiddenException("Security Alert: Only the item owner can scan this code to confirm return.");
        }

        // 3. Update the rental to finished
        rental.setStatus(RentalStatus.COMPLETED);

        // 4. Make the item available again for the next person
        Item item = rental.getItem();
        item.setStatus(ItemStatus.AVAILABLE);
        item.setTotalRented(item.getTotalRented() + 1); // Increase popularity count

        // 5. Save everything
        rentalRepository.save(rental);
        itemRepository.save(item);

        return new RentalResponseDto(rental);
    }

    public RentalResponseDto cancelRental (int id) {
        Rental rental = rentalRepository.findById(id).orElseThrow(() -> new HttpNotFoundException("Rental not found."));

        rental.setStatus(RentalStatus.CANCELLED);

        rentalRepository.save(rental);

        return new RentalResponseDto(rental);
    }
}
