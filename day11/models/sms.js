/*Powered By: Manaknightdigital Inc. https://manaknightdigital.com/ Year: 2021*/
/**
 * sms Model
 * @copyright 2021 Manaknightdigital Inc.
 * @link https://manaknightdigital.com
 * @license Proprietary Software licensing
 * @author Ryan Wong
 *
 */

const moment = require("moment");
;
const { Op } = require("sequelize");
const { intersection } = require('lodash');
const coreModel = require('./../core/models');

module.exports = (sequelize, DataTypes) => {
  const Sms = sequelize.define(
    "sms",
    {
      slug: { type: DataTypes.STRING, validate: {} },
      tag: DataTypes.TEXT,
      content: DataTypes.TEXT,
      status: DataTypes.INTEGER,
      created_at: DataTypes.DATEONLY,
      updated_at: DataTypes.DATE,
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "sms",
    },
    {
      underscoredAll: false,
      underscored: false,
    }
  );

  coreModel.call(this, Sms);

  Sms._preCreateProcessing = function (data) {
    data.status = 1;
    return data;
  };
  Sms._postCreateProcessing = function (data) {

    return data;
  };
  Sms._customCountingConditions = function (data) {

    return data;
  };

  Sms._filterAllowKeys = function (data) {
    let cleanData = {};
    let allowedFields = Sms.allowFields();
    allowedFields.push(Sms._primaryKey());

    for (const key in data) {
      if (allowedFields.includes(key)) {
        cleanData[key] = data[key];
      }
    }
    return cleanData;
  };

  Sms.timeDefaultMapping = function () {
    let results = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j++) {
        let hour = i < 10 ? "0".i : i;
        let min = j < 10 ? "0".j : j;
        results[i * 60 + j] = `${hour}:${min}`;
      }
    }
    return results;
  };

  Sms.associate = function (models) { };


  Sms.status_mapping = function (status) {
    const mapping = { "0": "Inactive", "1": "Active" }

    if (arguments.length === 0) return mapping;
    else return mapping[status];
  };


  Sms.allowFields = function () {
    return ['slug', 'tag', 'content', 'status',];
  };

  Sms.labels = function () {
    return ['SMS Slug', 'Replacement Tags', 'SMS Body', 'Status',];
  };

  Sms.validationRules = function () {
    return [
      ['slug', 'SMS Slug', 'required|is_unique[sms.slug]'],
      ['tag', 'Replacement Tags', 'required'],
      ['content', 'SMS Body', 'required'],
      ['status', 'Status', 'required|integer'],
    ];
  };

  Sms.validationEditRules = function () {
    return [
      ['slug', 'SMS Slug', ''],
      ['tag', 'Replacement Tags', ''],
      ['content', 'SMS Body', 'required'],
      ['status', 'Status', 'required|integer'],
    ];
  };






  // ex
  Sms.intersection = function (fields) {
    if (fields) {
      return intersection(
        [
          'slug', 'tag', 'content', 'status', 'created_at', 'updated_at',
        ],
        Object.keys(fields),
      );
    } else return [];
  };


  return Sms;
};
