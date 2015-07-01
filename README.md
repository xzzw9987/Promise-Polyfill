# promise-polyfill
Promise Polyfill
###How To Use ?
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
```
@todo <br>
Implement Fail Condition
