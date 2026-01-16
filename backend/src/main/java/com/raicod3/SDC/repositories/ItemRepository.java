package com.raicod3.SDC.repositories;

import com.raicod3.SDC.enums.Category;
import com.raicod3.SDC.models.Item;
import com.raicod3.SDC.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findAllByUser(UserModel user);

//    @Query("""
//SELECT i FROM Item i WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(i.brand) LIKE LOWER(CONCAT('%', :search, '%'))
//""")
//    List<Item> findAllItemBySearch(@Param("search") String search);

    @Query("""
    SELECT i FROM Item i
    WHERE (:search IS NULL OR LOWER(i.name) LIKE LOWER(CONCAT('%', :search, '%'))
                           OR LOWER(i.brand) LIKE LOWER(CONCAT('%', :search, '%')))
      AND (:category IS NULL OR i.category = :category)
      AND (
         (:minPrice IS NULL AND :maxPrice IS NULL)
         OR (:minPrice IS NOT NULL AND :maxPrice IS NULL AND i.dailyRate >= :minPrice)
         OR (:minPrice IS NOT NULL AND :maxPrice IS NOT NULL AND i.dailyRate BETWEEN :minPrice AND :maxPrice)
       )
""")
    List<Item> filterItems(
            @Param("search") String search,
            @Param("category") Category category,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice
    );
}
