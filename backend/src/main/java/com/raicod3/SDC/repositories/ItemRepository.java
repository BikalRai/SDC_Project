package com.raicod3.SDC.repositories;

import com.raicod3.SDC.dtos.item.ItemResponseDto;
import com.raicod3.SDC.models.Item;
import com.raicod3.SDC.models.UserModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findAllByOwner(UserModel owner);



}
