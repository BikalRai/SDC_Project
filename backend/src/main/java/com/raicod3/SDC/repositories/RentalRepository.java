package com.raicod3.SDC.repositories;

import com.raicod3.SDC.models.Rental;
import com.raicod3.SDC.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Integer> {


    List<Rental> findByUser(UserModel user);
}
