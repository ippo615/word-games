// ------------------------------------------- [ Function: Get Url Parms  ] -
// Parses the URL for parameters and returns an array of key-value pairs
function GetUrlParms() {
  // URL parameters begin after the '?' in the URL.
  var startLocation = window.location.href.indexOf('?');

  // We may not have any URL parameters.
  if (startLocation == -1) {
    return null;
  }

  // We do not care about the location part of the URL.
  var parmString = window.location.href.slice(startLocation + 1);

  // Some browsers put a '/' at the end of some urls
  parmString = parmString.replace(/\/$/, '');

  // Each key/value pair is separated by an '&'.
  var varStrings = parmString.split('&');

  var l = varStrings.length;
  var variables = {};
  for (var i = 0; i < l; i += 1) {
    // Key/value strings have the form: key=value
    var tmp = varStrings[i].split('=');
    // We need to unescape the strings because they be encoded as follows:
    // "hello world" -> hello+world
    // or certain charactes are encoded as their ascii value: %20 %da
    // We also convert the key to lower case so the program can always
    // access via the lower case key.
    variables[unescape(tmp[0]).toLowerCase()] = unescape(tmp[1]);
  }
  return variables;
}

// ------------------------------------ [ Module: jQuery.elementFromPoint ] -
// Enable jQuery to get elements by a point within them
(function ($) {
  var doCheck = true;
  var isRelative = true;

  $.elementFromPoint = function (x, y) {
    if (!document.elementFromPoint) {
      return null;
    }

    var $doc = $(document);
    var $window = $(window);
    if ( doCheck ) {
      var scrollTop = $doc.scrollTop();
      var scrollLeft = $doc.scrollLeft();
      if (scrollTop > 0) {
        isRelative = (document.elementFromPoint(0, scrollTop + $window.height() - 1) === null);
        doCheck = false;
      } else if (scrollLeft > 0) {
        isRelative = (document.elementFromPoint(scrollLeft + $window.width() - 1, 0) === null);
        doCheck = false;
      }
    }

    if (!isRelative) {
      x += $doc.scrollLeft();
      y += $doc.scrollTop();
    }

    return document.elementFromPoint(x, y);
  }

})(jQuery);

// ------------------------------------ [ Module: jQuery.changeStyleSheet ] -
// Changes the innerHTML of a style sheet (fixes IE<9 errors)
(function ($) {

   $.fn.styleSheet = function(cssCode){
     // note: this - is actually a jQuery object NOT a dom node
     var ie;
     try {
       this.html(cssCode)
     }catch(ie){
       // Internet explorer < 9 does not let me set the innerHTML
       // of a style tag, so I need to do the following instead
       // (note: other browsers don't like this)
       this[0].styleSheet.cssText = cssCode;
     }

     return this;
   }
  
})(jQuery);

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

  // Returns a random element from arr
  function from(arr){
    return arr[betweenInt(0,arr.length)];
  }

  return {
    setSeed: setSeed,
    getSeed: getSeed,
    getCurrent: getCurrent,
    betweenInt: betweenInt,
    betweenFloat: betweenFloat,
    random: random,
    shuffle: shuffle,
    from: from
  };
})();