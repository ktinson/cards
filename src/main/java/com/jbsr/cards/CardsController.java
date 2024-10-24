package com.jbsr.cards;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/cards")
public class CardsController {
    @Autowired
    private CardService cardService;
    @GetMapping
    public ResponseEntity<List<LargeCard>> allCards(){
        return new ResponseEntity<List<LargeCard>>(cardService.getAllCards(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<LargeCard>> getSingleCard(@PathVariable
    ObjectId id){
        return new ResponseEntity<Optional<LargeCard>>(cardService.singleCard(id), HttpStatus.OK);
    }
}
