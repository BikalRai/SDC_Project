package com.raicod3.SDC.services;

import com.raicod3.SDC.enums.ItemStatus;
import com.raicod3.SDC.enums.RentalStatus;
import com.raicod3.SDC.models.Item;
import com.raicod3.SDC.models.Rental;
import com.raicod3.SDC.repositories.ItemRepository;
import com.raicod3.SDC.repositories.PaymentRepository;
import com.raicod3.SDC.repositories.RentalRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private PaymentRepository paymentRepository;
    private RentalRepository rentalRepository;
    private ItemRepository itemRepository;

    @Transactional
    public void confirmPaymentAndActivateRental(int rentalId) {
        Rental rental = rentalRepository.findById(rentalId)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        // 1. Update Rental Status
        rental.setStatus(RentalStatus.PAID);

        // 2. Make the Item unavailable
        Item item = rental.getItem();
        item.setStatus(ItemStatus.RENTED);

        rentalRepository.save(rental);
        itemRepository.save(item);
    }

    @Transactional
    public String completeRentalByQr(String token) {
        // 1. Find the rental using the unique UUID from the QR
        Rental rental = (Rental) rentalRepository.findByReturnToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid QR Code"));

        // 2. Security Check: Is it already returned?
        if (rental.getStatus() == RentalStatus.COMPLETED) {
            return "Item already returned!";
        }

        // 3. Complete the Rental
        rental.setStatus(RentalStatus.COMPLETED);

        // 4. Make the Item available again
        Item item = rental.getItem();
        item.setStatus(ItemStatus.AVAILABLE);

        // 5. Increment total rented count for analytics
        item.setTotalRented(item.getTotalRented() + 1);

        rentalRepository.save(rental);
        itemRepository.save(item);

        return "Return successful! Item " + item.getName() + " is now available.";
    }
}
