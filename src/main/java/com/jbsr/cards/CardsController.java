package com.jbsr.cards;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<LargeCard>> getSingleCard(@PathVariable ObjectId id){
        return new ResponseEntity<Optional<LargeCard>>(cardService.singleCard(id), HttpStatus.OK);
    }
    @RequestMapping(value = "/name/{name}", method = RequestMethod.GET)
    public ResponseEntity<Optional<LargeCard>> getSingleCardName(@PathVariable String name){
        return new ResponseEntity<Optional<LargeCard>>(cardService.cardName(name), HttpStatus.OK);
    }
}
