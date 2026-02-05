package com.raicod3.SDC.services;


import com.raicod3.SDC.dtos.earning.EarningResponseDto;
import com.raicod3.SDC.enums.ItemStatus;
import com.raicod3.SDC.enums.RentalStatus;
import com.raicod3.SDC.models.Item;
import com.raicod3.SDC.models.Rental;
import com.raicod3.SDC.repositories.EarningRepository;
import com.raicod3.SDC.repositories.ItemRepository;
import com.raicod3.SDC.repositories.RentalRepository;
import com.raicod3.SDC.utilities.KBCalculation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private EarningRepository earningRepository;

    public Map<String, Object> getAdminDashboardStatsService (){
        List<Item> allItems = itemRepository.findAll();
        List<Rental> allRents = rentalRepository.findAll();

        List<EarningResponseDto> allEarnings = earningRepository.findAll().stream().map(EarningResponseDto::new).toList();

        long activeRents = allItems.stream().filter(item -> item.getStatus() == ItemStatus.UNAVAILABLE).count();
        System.out.println(activeRents + "!!!");

        long completedRents = allRents.stream().filter((rent -> rent.getStatus() == RentalStatus.COMPLETED)).count();

        long totalRents = allRents.size();

        long totalCancelled = allRents.stream().filter(rent -> rent.getStatus() == RentalStatus.CANCELLED).count();

        double totalEarnings = KBCalculation.calculateEarnings(allEarnings);

        Map<String, Object> stats = new HashMap<>();

        stats.put("totalItems", allItems.size());
        stats.put("totalRents", totalRents);
        stats.put("activeRents", activeRents);
        stats.put("completedRents", completedRents);
        stats.put("cancelledRents", totalCancelled);
        stats.put("totalEarnings", totalEarnings);

        return  stats;
    }


}
