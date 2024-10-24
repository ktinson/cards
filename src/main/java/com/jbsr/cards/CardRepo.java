package com.jbsr.cards;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepo extends MongoRepository<LargeCard, ObjectId> {
}
