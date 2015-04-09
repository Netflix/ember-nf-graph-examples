import Ember from 'ember';
import { dataGenerator } from '../services/data-generator';

export default Ember.Component.extend({
  classNames: ['bars-with-line'],

  barData: function() {
    return dataGenerator.simpleOrdinalData();
  }.property(),

  lineData: function() {
    return dataGenerator.simpleOrdinalData();
  }.property(),

});
