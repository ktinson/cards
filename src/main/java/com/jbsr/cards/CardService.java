package com.jbsr.cards;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {
    @Autowired
    private CardRepo cardRepo;
    public List<LargeCard> getAllCards(){
        return cardRepo.findAll();
    }
}
