# promise-polyfill
[![Build Status](https://travis-ci.org/xzzw9987/Promise-Polyfill.svg)](https://travis-ci.org/xzzw9987/Promise-Polyfill)  
Promise Polyfill
### How To Use ?
```javascript
  var promise = new P(function(resolve, reject){
    setTimeout(function() {
      resolve('a1');
    },1000);
  });
  promise
  .then(function(resolveValue) {
  // console.log('a1');
    console.log(resolveValue);
    return 'a2';
  })
  .then(function(resolveValue) {
    // console.log('a2');
    console.log(resolveValue);
  })
  .then(function() {
    return new P(function(resolve, reject){
      resolve('New Prmosie');
    })
  })
  .then(function(resolveValue) {
    // console.log('New Promise');
    console.log(resolveValue);
  })
  .catch(function(){
  /**
  Do something
  **/
  });
```
**Not implement Promise.defer() & Promise.defer().promise ,**
**Method like resolve, reject bind on P directly**
