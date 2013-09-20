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
