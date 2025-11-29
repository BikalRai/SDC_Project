package com.raicod3.SDC.dtos.rental;

import com.raicod3.SDC.dtos.item.ItemResponseDto;
import com.raicod3.SDC.dtos.user.UserResponseDto;
import com.raicod3.SDC.enums.BookingStatus;
import com.raicod3.SDC.models.Booking;
import com.raicod3.SDC.models.Item;
import com.raicod3.SDC.models.UserModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDto {
    private String bookingId;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate createdAt;
    private String totalAmount;
    private BookingStatus status;
//    private int userId;
//    private long itemId;
    private UserResponseDto user;
    private ItemResponseDto item;

    public BookingResponseDto(Booking booking) {
        this.bookingId = booking.getBookingId();
        this.startDate = booking.getStartDate();
        this.endDate = booking.getEndDate();
        this.createdAt = booking.getCreatedAt();
        this.totalAmount = booking.getTotalAmount();
        this.status = booking.getStatus();
        this.user = new UserResponseDto(booking.getUser());
        this.item = new ItemResponseDto(booking.getItem());
    }
}
