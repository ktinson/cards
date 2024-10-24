package com.jbsr.cards;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {
    @Autowired
    private CardRepo cardRepo;
    public List<LargeCard> getAllCards(){
        return cardRepo.findAll();
    }

    public Optional<LargeCard> singleCard(ObjectId id){
        return  cardRepo.findById(id);
    }
}
