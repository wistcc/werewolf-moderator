import brain from 'werewolf-brain';

export default new class werewolfService {
    getDecks() {
        return brain.getDecks();
    }

    getCards() {
        const cards = brain.getCards();
        return Object.keys(cards).map(key => { return { key, value: cards[key] } });
    }

    getCard(cardKey) {
        return this.getCards().find(c => c.key === cardKey);
    }

    getCardsInDeck(deck) {
        const cards = brain.getDeck(deck);
        return Object.keys(cards).map(key => { return { key, value: cards[key] } })
    }

    isInDeck(card, deck) {
        return !!brain.getDeck(deck)[card];
    }

    createGame(players, mode, cardsArray, deckName) {
        let options = {};
        options.mode = mode;

        if (deckName === "custom") //TODO: standardize?
            options.deck = cardsArray.reduce((t, i) => { t[i.key] = i.amount; return t; }, {});
        else
            options.deckName = deckName;

        const game = brain.getGame(players, options);

        const script = brain.getScriptFromDeck(game.deck);

        return Object.assign({}, game, { script });
    }

    getScript(deck, lang = 'en') { //TODO: better defaults
        return brain.getScriptFromDeck(deck, lang);
    }

    mode = brain.getModes;
}
