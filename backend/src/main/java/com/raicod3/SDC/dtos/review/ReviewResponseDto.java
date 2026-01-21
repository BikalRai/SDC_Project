package com.raicod3.SDC.dtos.review;

import com.raicod3.SDC.models.Item;
import com.raicod3.SDC.models.Review;
import com.raicod3.SDC.models.UserModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReviewResponseDto {

    private int id;
    private String title;
    private int rating;
    private String comment;

    private UserModel user;

    private Item item;

    private LocalDateTime created;

    private LocalDateTime updated;

    public ReviewResponseDto(Review review) {
        this.id = review.getId();
        this.title = review.getTitle();
        this.rating = review.getRating();
        this.comment = review.getComment();
        this.user = review.getUser();
        this.item = review.getItem();
        this.created = review.getCreated();
        this.updated = review.getUpdated();
    }
}
