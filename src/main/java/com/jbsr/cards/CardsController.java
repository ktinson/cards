package com.jbsr.cards;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/cards")
public class CardsController {
    @Autowired
    private CardService cardService;
    @GetMapping
    public ResponseEntity<List<LargeCard>> allCards(){
        return new ResponseEntity<List<LargeCard>>(cardService.getAllCards(), HttpStatus.OK);
    }
}
