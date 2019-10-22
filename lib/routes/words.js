'use strict';

const Helpers = require('../helpers');
const Joi = require('@hapi/joi');
const Wreck = require('@hapi/wreck');
const Boom = require('@hapi/boom');

module.exports = Helpers.withDefaults({
    method: 'get',
    path: '/words/{word}',
    options: {
        validate: {
            params: Joi.object({
                word: Joi.string().required()
            })
        }
    },
    handler: async (request) => {

        const { word } = request.params;
        const { getWord } = request.server.methods;

        return await getWord(word);

        // const { User, Word } = request.server.app.models;
        //
        // const { word } = request.params;
        // const { res, payload } = await Wreck.get(
        //     `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}&lang=en`
        // ).catch(() => {
        //
        //     throw Boom.notFound();
        // });
        //
        // // console.log(JSON.parse(payload));
        // const w = JSON.parse(payload)[0];
        //
        // // try saving to Mongo
        // Word.create({
        //     word: w.word,
        //     phonetics: [{
        //         source: 'Google',
        //         value: w.phonetic
        //     }],
        //     meanings: w.meaning.noun.map((m) => {
        //
        //         return {
        //             source: 'Google',
        //             wordType: 'noun',
        //             definition: m.definition,
        //             examples: m.example ? [m.example] : [],
        //             synonyms: m.synonyms || [],
        //             note: '',
        //             order: 1
        //         };
        //     }),
        //     note: ''
        // }, (error) => console.error(error));

        // return payload;
    }
});
