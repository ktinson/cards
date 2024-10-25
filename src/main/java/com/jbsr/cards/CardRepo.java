package com.jbsr.cards;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CardRepo extends MongoRepository<LargeCard, ObjectId> {
    Optional<LargeCard> findLargeCardByName(String name);
//    Optional<LargeCard> findById(ObjectId id);

}
