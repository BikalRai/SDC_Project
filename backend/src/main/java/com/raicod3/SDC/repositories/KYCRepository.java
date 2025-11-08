package com.raicod3.SDC.repositories;

import com.raicod3.SDC.models.KYCModel;
import com.raicod3.SDC.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KYCRepository extends JpaRepository<KYCModel, Integer> {
       Optional<KYCModel> findByUser(UserModel user);
}
