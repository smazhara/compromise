// Generated by CoffeeScript 1.6.3
var data, signals, suffix, want, words;

require("/Users/spencer/mountain/dirty");

data = require("./data").lexicon;

want = "JJ";

words = Object.keys(data).filter(function(k) {
  return data[k] === want;
});

suffix = function(str, k) {
  var len;
  if (str == null) {
    str = "";
  }
  if (k == null) {
    k = 4;
  }
  len = str.length || 0;
  return str.substr((len - k).atleast(0), len);
};

signals = words.map(function(w) {
  return suffix(w, 4);
});

signals = signals.topkp().filter(function(t) {
  return t.count > 15;
});

console.log(JSON.stringify(signals, null, 2));