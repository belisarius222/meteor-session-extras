_.extend(Session,{
  whenTrue: function(keys,callback,repeat) {
    if (typeof repeat === 'undefined' || repeat == null) {
      repeat = false;
    }
    if (typeof keys === 'string') {
      keys = [keys];
    }
    Deps.autorun(function(computation){
      var allTrue = _.all(keys,function(key){
        return Session.equals(key,true);
      });
      if (allTrue) {
        callback();
        !repeat && computation.stop();
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
    Deps.autorun(function(computation){
      var allFalse = _.all(keys,function(key){
        return ! Session.equals(key,true);
      });
      if (allFalse) {
        callback();
        !repeat && computation.stop();
      }
    });
  },
  whenEqual: function(keysAndValues,callback,repeat){
    if (typeof repeat === 'undefined' || repeat == null) {
      repeat = false;
    }
    Deps.autorun(function(computation){
      var allEqual = _.all(_.keys(keysAndValues),function(key){
        return Session.equals(key,keysAndValues[key]);
      });
      if (allEqual) {
        callback();
        !repeat && computation.stop();
      }
    });
  },
});