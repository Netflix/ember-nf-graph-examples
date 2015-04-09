import Ember from 'ember';
import { dataGenerator } from '../services/data-generator';
import { min, max } from '../services/utility';

export default Ember.Component.extend({

  barHeight: 1,

  graphData: function() {
    return dataGenerator.simpleTimeSeries();
  }.property(),

  extent: function() {
    var data = this.get('graphData');

    return {
      xMin: min(data.map(d => d.start)),
      xMax: max(data.map(d => d.start)),
      yMin: min(data.map(d => d.index)),
      yMax: max(data.map(d => d.index)),
    };
  }.property('graphData'),

});
