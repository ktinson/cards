package com.jbsr.cards;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3001", "https://cards-145m.onrender.com"})
@RequestMapping("api/v1/cards")
public class CardsController {
    @Autowired
    private CardService cardService;
    @Autowired
    private CardRepo cardRepo;

    @GetMapping
    public ResponseEntity<List<LargeCard>> allCards(){
        return new ResponseEntity<List<LargeCard>>(cardService.getAllCards(), HttpStatus.OK);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<LargeCard>> getSingleCard(@PathVariable ObjectId id){
        return new ResponseEntity<Optional<LargeCard>>(cardService.singleCard(id), HttpStatus.OK);
    }
    @GetMapping("/id/")
    public ResponseEntity<List<LargeCard>> getAllCardIds(){
        return new ResponseEntity<List<LargeCard>>(cardService.getAllCards(), HttpStatus.OK);
    }
    @RequestMapping(value = "/name/{name}", method = RequestMethod.GET)
    public ResponseEntity<Optional<LargeCard>> getSingleCardName(@PathVariable String name){
        return new ResponseEntity<Optional<LargeCard>>(cardService.cardName(name), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<LargeCard> createCard(@RequestBody LargeCard largeCard){
        LargeCard savedCard = cardService.saveCard(largeCard);
        return new ResponseEntity<>(savedCard, HttpStatus.CREATED);
    }
    
    @PutMapping("/id/{id}")
    public  ResponseEntity<LargeCard> updateCardByName(@PathVariable String id, @RequestBody LargeCard largeCard){
        LargeCard updatedCard = cardService.updateCard(id, largeCard);
        return  updatedCard != null ? new ResponseEntity<>(updatedCard, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @CrossOrigin(origins = "http://localhost:3001")
    @DeleteMapping("/id/{id}")
    public  ResponseEntity<LargeCard> deleteCardByName(@PathVariable String id){
        boolean deletedCard = cardService.deleteCardById(id);
        return  deletedCard ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                            : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
