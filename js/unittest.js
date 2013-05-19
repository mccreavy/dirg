(function() {
  var log = window.dirg.debug ? window.dirg.debug.log : console.log;

  // date: 2013-05-19, author: mccreavy
  function test(tests) {
    for (var i = 0 ; i < tests.length ; i++) {
      log("Test " + i + " of " + tests.length + ": " + tests[i].name);
      log(" - " + (tests[i]() ? "PASSED" : "FAILED"));
    }
  }

  window.dirg.unittest = {
    'test': test
  }
}());