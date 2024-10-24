package com.jbsr.cards;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/cards")
public class CardsController {
    @GetMapping
    public ResponseEntity<String> allCards(){
        return new ResponseEntity<String>("All Cards", HttpStatus.OK);
    }
}
