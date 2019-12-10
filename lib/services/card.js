'use strict';

const Schmervice = require('schmervice');
const Boom = require('@hapi/boom');

const Cards = require('./utils/cards');

module.exports = class CardService extends Schmervice.Service {

    saveWordCard(card, user) {

        if (user.stored.cards.findIndex(Cards.cardEquals(card.word, card.source)) > -1) {
            throw Boom.conflict();
        }

        user.stored.cards = [
            ...user.stored.cards,
            card
        ];
        user.save();
    }

    updateWordCard(_id, cardUpdate, user) {

        const updatedCard = user.stored.cards.find((card) => card._id === _id);
        Object.assign(updatedCard, cardUpdate);

        // user.stored.cards = [
        //     ...user.stored.cards.filter((card) => card._id !== _id),
        //     updatedCard];
        user.save();
    }

    removeWordCard(_id, user) {

        user.stored.cards = user.stored.cards.filter((card) => card._id !== _id);
        user.save();
    }
};
