package com.raicod3.SDC.repositories;

import com.raicod3.SDC.models.Item;
import com.raicod3.SDC.models.Rental;
import com.raicod3.SDC.models.UserModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Integer> {


    List<Rental> findByUser(UserModel user);

    @Transactional
    @Modifying
    @Query("DELETE FROM Rental r WHERE r.item = :item")
    void deleteByItem(@Param("item") Item item);
}
