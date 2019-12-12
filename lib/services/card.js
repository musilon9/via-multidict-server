'use strict';

const Schmervice = require('schmervice');
const Boom = require('@hapi/boom');

const Cards = require('./utils/cards');

module.exports = class CardService extends Schmervice.Service {

    saveWordCard(card, user) {

        const existingCards = user.stored.cards || [];

        if (existingCards.findIndex(Cards.cardEquals(card.word, card.source)) > -1) {
            throw Boom.conflict();
        }

        user.stored.cards = [
            ...existingCards,
            card
        ];
        return user.save();
    }

    updateWordCard(id, cardUpdate, user) {

        const updatedCard = user.stored.cards.find((card) => card.id === id);
        Object.assign(updatedCard, cardUpdate);

        return user.save();
    }

    removeWordCard(id, user) {

        user.stored.cards = user.stored.cards.filter((card) => card.id !== id);
        return user.save();
    }
};
