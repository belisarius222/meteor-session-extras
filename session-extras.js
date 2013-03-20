_.extend(Session,{
  isTrue: function(key) {
    return Session.equals(key, true);
  },
  // The closures are memoized so that they will create 
  // at most one function for each key.  This should 
  // prevent a memory leak if the function is called
  // repeatedly.
  truthTester: _.memoize(function(key) {
    return function() {
      return Session.isTrue(key);
    };
  }),
  getter: _.memoize(function (key) {
    return function() {
      return Session.get(key);
    };
  }),
  setter: _.memoize(function (key) {
    return function(value) {
      return Session.set(key, value);
    };
  }),
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