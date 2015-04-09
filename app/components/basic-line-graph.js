import Ember from 'ember';
import { dataGenerator } from '../services/data-generator';

export default Ember.Component.extend({

  graphData: function() {
    return dataGenerator.simpleTimeSeries();
  }.property()

});
