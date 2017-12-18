import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';

export const CardsDB = new Mongo.Collection('cards');

if (Meteor.isServer) {
    //returns cards
    Meteor.publish('cards', function publishCards () {
        if (!this.userId) {
            return this.ready();
        }
        return CardsDB.find({owner: this.userId}, {sort: {createdAt: 1}, fields: {_id: 1, name: 1, createdAt: 1}});
    });
}

Meteor.methods({
    'cards.insert' (name) {
        check(name, String);
        // Make sure the user is logged in before inserting a card
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        CardsDB.insert({
            name,
            createdAt: new Date(),
            owner: Meteor.userId(),
        });
    },

    'cards.remove' (cardId) {
        check(cardId, String);
        CardsDB.remove(cardId);
    },
});
