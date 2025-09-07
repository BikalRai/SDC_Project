package com.raicod3.SDC.repositories;

import com.raicod3.SDC.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Integer> {
    Optional<UserModel> findByEmail(String username);

    Optional<UserModel> findByPhone(String username);

    Optional<UserModel> findByEmailOrPhone(String email, String phone);
}
