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
    public Optional<LargeCard> cardName(String name){
        return  cardRepo.findLargeCardByName(name);
    }
    public LargeCard saveCard(LargeCard largeCard){
        return cardRepo.save(largeCard);
    }
    public LargeCard updateCard(String id, LargeCard updatedCard){
        ObjectId objectId = new ObjectId(id);
        Optional<LargeCard> cardExist = cardRepo.findById(objectId);
        if (cardExist.isPresent()){
            updatedCard.setId(objectId);
            return cardRepo.save(updatedCard);
        }
        return null;
    }
    public boolean deleteCardById(String id){
        ObjectId objectId = new ObjectId(id);
        Optional<LargeCard> cardExist = cardRepo.findById(objectId);
        if (cardExist.isPresent()){
            cardRepo.deleteById(objectId);
            return true;
        }
        return false;
    }
}
