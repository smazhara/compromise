'use strict';
//check for "united" + "kingdom" in lexicon, and combine + tag it
const combine = require('./combine');
const p = require('../paths');
const log = p.log;
const lexicon = p.lexicon;
const path = 'tagger/multiple';

const lexicon_lump = function(s) {
  log.here(path);
  let userLex = s.context.lexicon || {};
  for (let i = 0; i < s.terms.length - 1; i++) {
    //try 'A'+'B'
    let str = s.terms[i].normal + ' ' + s.terms[i + 1].normal;
    if (lexicon[str] || userLex[str]) {
      combine(s, i);
      s.terms[i].tagAs(lexicon[str], 'multiples-lexicon');
    }
  }

  return s;
};

module.exports = lexicon_lump;