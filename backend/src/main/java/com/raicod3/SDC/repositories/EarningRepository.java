package com.raicod3.SDC.repositories;

import com.raicod3.SDC.models.Earning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EarningRepository extends JpaRepository<Earning, Integer> {
}
