package com.raicod3.SDC.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

//    @Column(unique = true, nullable = false)
    private String name;

//    private String description;
//    private String iconUrl;
//    private boolean isActive;

//    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
//    private List<Item> items;


    public Category(String name) {
        this.name = name;
    }
}
