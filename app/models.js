var Cursor = Backbone.Model.extend({
  defaults: {
    screenPosition: [0, 0]
  },
  setScreenPosition: function(position) {
    console.log(position.slice(0));
    this.set('screenPosition', position.slice(0));
  }
});