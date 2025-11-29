package com.raicod3.SDC.repositories;

import com.raicod3.SDC.custom.CustomUserDetails;
import com.raicod3.SDC.models.Rental;
import com.raicod3.SDC.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Integer> {


    @Query(value = "SELECT * FROM rental WHERE owner_id = :ownerId", nativeQuery = true)
    List<Rental> findAllByOwner(@Param("ownerId") int ownerId);

    @Query(value = "SELECT * FROM rental WHERE renter_id = :renterId", nativeQuery = true)
    List<Rental> findAllByRenterId(@Param("renterId") int id);
}
