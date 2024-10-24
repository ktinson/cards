package com.jbsr.cards;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "jsbrdbcol")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LargeCard {
    @Id
    private ObjectId id;
    private String name;
    private String description;
    private String image;
    private String large;
}
