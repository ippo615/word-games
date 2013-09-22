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