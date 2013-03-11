meteor-session-extras
=====================

a few useful helpers for Meteor's Session

#### Overview

Adds `Session.whenTrue`, `Session.whenFalse`, and `Session.whenEqual` functions.  Their primary use is for preventing race conditions:
say you're waiting for an external script to load and you're also waiting for the user accounts to load (using the facebook JS SDK is a good use-case).
This library allows you to easily specify a callback function for once both of those things have happened:

```javascript

// I know this isn't a real function, just trying to show the idea.
Accounts.onLoad(function(){
  Session.set('accountsLoaded',true);
});

$.get('https://...fb-script.js', function(response){
  Session.set('loadedFacebook',true);
});

Session.whenTrue(['accountsLoaded','loadedFacebook'],function(){
  // run the facebook initialization code now that we're sure all the dependencies are there...
  FB.init();
});
```

`Session.whenTrue` and `Session.whenFalse` take as their first argument either a string representing a Session key, or a list of Session keys. `Session.whenEqual` takes as its first argument an object of key-value pairs, where the keys represent Session keys, and the values are the desired values for the respective keys.  The supplied callback function will run when the values of all the supplied Session keys reach their desired values.

The functions all take an optional `repeat` parameter as the final argument.  Pass in a true value if you want the callback to be called more than once.  Specifically, the callback will be called the first time that all of the supplied Session keys are the desired value (all true, all false, or all equal to the values supplied to `whenEqual`), and if `repeat` is truthy, then the callback will run again every time the values of the Session keys change back to their desired values.  If the keys reach the desired values and never change, then the callback will only be called once even if `repeat` is true.  


