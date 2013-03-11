_.extend(Session,{
  whenTrue: function(keys,callback,repeat) {
    if (typeof repeat === 'undefined' || repeat == null) {
      repeat = false;
    }
    if (typeof keys === 'string') {
      keys = [keys];
    }
    Meteor.autorun(function(handle){
      var allTrue = _.all(keys,function(key){
        return Session.equals(key,true);
      });
      if (allTrue) {
        callback();
        !repeat && handle.stop();
      }
    });
  },
  whenFalse: function(keys,callback,repeat) {
    if (typeof repeat === 'undefined' || repeat == null) {
      repeat = false;
    }
    if (typeof keys === 'string') {
      keys = [keys];
    }
    Meteor.autorun(function(handle){
      var allFalse = _.all(keys,function(key){
        return ! Session.equals(key,true);
      });
      if (allFalse) {
        callback();
        !repeat && handle.stop();
      }
    });
  },
  whenEqual: function(keysAndValues,callback,repeat){
    if (typeof repeat === 'undefined' || repeat == null) {
      repeat = false;
    }
    Meteor.autorun(function(handle){
      var allEqual = _.all(_.keys(keysAndValues),function(key){
        return Session.equals(key,keysAndValues[key]);
      });
      if (allEqual) {
        callback();
        !repeat && handle.stop();
      }
    });
  },
});