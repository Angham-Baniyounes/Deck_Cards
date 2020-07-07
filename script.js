"use strict";
class CardEngine {
    deck = [];
    p1Cards = [];
    p2Cards = [];
    gCards = [];
    gImg = null;
    tP1 = null;
    tP2 = null;
    constructor() { 
        this.gImg = document.getElementById("groundImg");
        this.tP1 = document.getElementById("tP1");
        this.tP2 = document.getElementById("tP2");
        this.init();
        this.draw();
    }
    buildDeck() {
        var type = ["heart", "spade", "diamond", "club"];
        var number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        for (var i = 0; i < type.length; i++) {
            for (var j = 0; j < number.length; j++) {
                this.deck.push({
                    type: type[i],
                    number: number[j]
                });
            }
        }
    }
    shuffleDeck() {
        for (var i = 0; i < this.deck.length; i++) {
            var randomIndex = Math.floor(Math.random() * this.deck.length);
            var newCards = this.deck[i];
            this.deck[i] = this.deck[randomIndex];
            this.deck[randomIndex] = newCards;
        }
    }
    deal() {
        this.p1Cards = this.deck.slice(0, 26);
        this.p2Cards = this.deck.slice(26, 52);
    }
    draw() {
        var btnP1 = document.getElementById("btnP1");
        var btnP2 = document.getElementById("btnP2");
        btnP1.addEventListener("click", function () {
            cardEng.playerTurn(cardEng.p1Cards, "One");
            cardEng.tP1.innerHTML = "Player One : \t" + cardEng.p1Cards.length;
            btnP1.disabled = true;  
            btnP2.disabled = false;  
        });
        btnP2.addEventListener("click", function () {
            cardEng.playerTurn(cardEng.p2Cards, "Two"),
            cardEng.tP2.innerHTML = "Player Two : \t" + cardEng.p2Cards.length;
            btnP2.disabled = true;  
            btnP1.disabled = false;
        });
    }
    drawGoundCard(card) {
        cardEng.gImg.setAttribute("src", "images/" + card.type + card.number + ".png");
    }
    emptyGround(pCards) {
        var me = cardEng;
        for (var i = me.gCards.length - 1; i >= 0; i--) {
            pCards.unshift(me.gCards[i]);
            me.gCards.pop();
        }
    }
    checkLastGroundCardsEqual() { 
        var me = cardEng;
        if (me.gCards.length >= 2) {
            if (me.gCards[me.gCards.length - 2].number == me.gCards[me.gCards.length - 1].number) {
                return true;
            } else {
                return false;
            }
        } 
        return false;
    }
    checkWin(pCards,name) {
        if (pCards.length == 0) {
            alert("Congratulations!, The Player " + name + " won");
            if (confirm("Do You Want To Play Again?")) {
                this.clearData();
                this.init();
            }
        }
    }
    playerTurn(pCards, name) {
        var me = cardEng;
        var lastCard = pCards.pop();
        me.drawGoundCard(lastCard);
        me.gCards.push(lastCard);
        if (me.checkLastGroundCardsEqual() == true) {
            me.emptyGround(pCards);
        }
        me.checkWin(pCards, name);
    }
    clearData() { 
        this.deck = [];
        this.p1Cards = [];
        this.p2Cards = [];
        this.gCards = [];
        this.gImg.removeAttribute("src");
    }
    init() {
        this.buildDeck();
        this.shuffleDeck();
        this.deal();
        this.tP1.innerHTML = "Player One : \t" + this.p1Cards.length;
        this.tP2.innerHTML = "Player Two : \t" + this.p2Cards.length;
    }
}
var cardEng = new CardEngine();