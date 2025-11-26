package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.item.ItemResponseDto;
import com.raicod3.SDC.dtos.rental.BookingResponseDto;
import com.raicod3.SDC.dtos.rental.RentalRequestDto;
import com.raicod3.SDC.dtos.rental.RentalResponseDto;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.enums.BookingStatus;
import com.raicod3.SDC.enums.ItemStatus;
import com.raicod3.SDC.enums.RentalStatus;
import com.raicod3.SDC.exceptions.HttpBadRequestException;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.exceptions.HttpUnauthorizedException;
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
    private BookingRepository bookingRepository;

    public BookingResponseDto requestRental(RentalRequestDto rentalRequestDto, CustomUserDetails userDetails) {
        Item item = itemRepository.findById(rentalRequestDto.getItemId()).orElseThrow(() -> new HttpNotFoundException("Item not found"));

        UserModel user = userDetails.getUser();

        Booking booking = new Booking(rentalRequestDto, user, item);
        bookingRepository.save(booking);

        return new BookingResponseDto(booking);
    }


    public BookingResponseDto approveRental(String bookingId, CustomUserDetails userDetails) {

        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new HttpNotFoundException("Booking not found"));

        UserModel user = userDetails.getUser();

        Item item = booking.getItem();

        if(item.getOwner().getId() != user.getId()) {
            throw new HttpUnauthorizedException("You are not owner of this booking");
        }

        if(item.getStatus() == "unavailable") {
            throw new HttpBadRequestException("Item is unavailable");
        }

        Rental rental = new Rental();
        rental.setItem(item);
        rental.setUser(user);
        rental.setStartDate(booking.getStartDate());
        rental.setEndDate(booking.getEndDate());
        rental.setTotalAmount(booking.getTotalAmount());
        rental.setSecurityDeposit(booking.getSecurityDeposit());
        rental.setStatus(RentalStatus.ACTIVE);
        rental.setCreatedAt(LocalDate.now());

        rentalRepository.save(rental);

        item.setStatus("unavailable");
        itemRepository.save(item);

        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);

        return new BookingResponseDto(booking);

    }

    public List<BookingResponseDto> getAllRentals() {
        return bookingRepository.findAll().stream().map(BookingResponseDto::new).collect(Collectors.toList());
    }

    public List<BookingResponseDto> getRentalsByUser(CustomUserDetails userDetails) {
        UserModel user = userDetails.getUser();
    List<Booking> rentals = bookingRepository.findBookingsByUser(user);

    return rentals.stream().map(BookingResponseDto::new).collect(Collectors.toList());


    }

    public BookingResponseDto getRentalById(String id) {
        Booking booking =bookingRepository.findById(id).orElseThrow(() -> new HttpNotFoundException("booking not found"));
        return new BookingResponseDto(booking);
    }

    public String deleteRental(String id) {
        bookingRepository.deleteById(id);
        return "Booking deleted successfully";
    }
}
