"use strict";
/*Powered By: Manaknightdigital Inc. https://manaknightdigital.com/ Year: 2021*/
/**
 * note Resolve Delete
 * @copyright 2021 Manaknightdigital Inc.
 * @link https://manaknightdigital.com
 * @license Proprietary Software licensing
 * @author Ryan Wong
 *
 */

const { ApolloError } = require('apollo-server-express');

module.exports = async (parent, args, {db}, info) => {
  //Check Auth if user allowed
    try {
      
      return await db.note.realDelete(args.id);
    } catch (error) {
      console.log('delete_note -> error', error);
      return new ApolloError('InternalServerError');
    }
}