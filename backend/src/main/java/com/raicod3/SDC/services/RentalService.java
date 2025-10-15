package com.raicod3.SDC.services;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.dtos.rental.RentalRequestDto;
import com.raicod3.SDC.enums.ItemStatus;
import com.raicod3.SDC.enums.RentalStatus;
import com.raicod3.SDC.exceptions.HttpNotFoundException;
import com.raicod3.SDC.models.Item;
import com.raicod3.SDC.models.Rental;
import com.raicod3.SDC.repositories.ItemRepository;
import com.raicod3.SDC.repositories.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private ItemRepository itemRepository;

    public Rental createRental(RentalRequestDto req, CustomUserDetails userDetails) {

        Item item = itemRepository.findById(req.getItemId()).orElseThrow(() -> new HttpNotFoundException("Item not found"));

        if(item.getItemStatus() == ItemStatus.UNAVAILABLE) {
            throw new IllegalArgumentException("Item is unavailable");
        }

        Rental rental = new Rental();

        rental.setItem(item);
        rental.setUser(userDetails.getUser());
        rental.setStartDate(req.getStartDate());
        rental.setEndDate(req.getEndDate());
        rental.setTotalAmount(req.getTotalAmount());
        rental.setSecurityDeposit(req.getSecurityDeposit());
        rental.setStatus(RentalStatus.ACTIVE);
        rental.setCreatedAt(LocalDate.now());

        rentalRepository.save(rental);

        item.setItemStatus(ItemStatus.UNAVAILABLE);
        itemRepository.save(item);

        return rental;

    }
}
