// -------------------------------------------- [ Module: Random Numbers  ] -
var RANDOM = (function () {
  var Seed = Math.floor(Math.random() * 4294967296);
  var Current = Seed;

  function setSeed(aSeed) {
    Seed = aSeed;
    Current = aSeed;
  }

  function getSeed() {
    return Seed;
  }

  function getCurrent() {
    return Current;
  }

  function betweenInt(aMin, aMax) {
    Current = (Current * 1664525 + 1013904223) % 4294967296;
    return aMin + Math.floor((Current / 4294967296) * aMax);
  }

  function betweenFloat(aMin, aMax) {
    Current = (Current * 1664525 + 1013904223) % 4294967296;
    return aMin + (Current / 4294967296) * aMax;
  }

  function random() {
    Current = ((Current * 1664525 + 1013904223) % 4294967296);
    return Current / 4294967296;
  }

  // Randomly orders the elements of arr (returns the new arrangement)
  function shuffle(arr) {
    var l = arr.length,
      i = Math.ceil(l / 2) + 1,
      r1, r2, swap;
    while (i--) {
      r1 = Math.floor(l * RANDOM.random());
      r2 = Math.floor(l * RANDOM.random());
      swap = arr[r1];
      arr[r1] = arr[r2];
      arr[r2] = swap;
    }
    return arr;
  }

  return {
    setSeed: setSeed,
    getSeed: getSeed,
    getCurrent: getCurrent,
    betweenInt: betweenInt,
    betweenFloat: betweenFloat,
    random: random,
    shuffle: shuffle
  };
})();
