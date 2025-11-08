package com.raicod3.SDC.repositories;

import com.raicod3.SDC.models.Booking;
import com.raicod3.SDC.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    Booking findBookingByUser(UserModel user);

    List<Booking> findBookingsByUser(UserModel user);
}
