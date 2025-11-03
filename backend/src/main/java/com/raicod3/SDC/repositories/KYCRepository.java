package com.raicod3.SDC.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KYCRepository extends JpaRepository<KYCRepository, Integer> {
}
