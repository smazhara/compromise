const addMethod = function(Doc) {
  //pull it apart..
  const parse = function(doc) {
    let things = doc.splitAfter('@hasComma').not('(and|or) not?')
    let beforeLast = doc.match('[.] (and|or)')
    return {
      things: things,
      conjunction: doc.match('(and|or) not?'),
      beforeLast: beforeLast,
      hasOxford: beforeLast.has('@hasComma'),
    }
  }

  /** cool, fun, and nice */
  class Lists extends Doc {
    /** coordinating conjunction */
    conjunctions() {
      return this.match('(and|or)')
    }
    /** split-up by list object */
    parts() {
      return this.splitAfter('(@hasComma|#Conjunction)')
    }
    /** remove the conjunction */
    items() {
      return this.parts().notIf('#Conjunction')
    }
    /** add a new unit to the list */
    add(str) {
      this.forEach(p => {
        let beforeLast = parse(p).beforeLast
        beforeLast.append(str)
        //add a comma to it
        beforeLast.termList(0).addPunctuation(',')
      })
      return this
    }
    /** remove any matching unit from the list */
    remove() {
      return this
    }

    /** return only lists that use a serial comma */
    hasOxfordComma() {
      return this.filter(doc => parse(doc).hasOxford)
    }
    addOxfordComma() {
      return this
    }
    removeOxfordComma() {
      return this
    }
  }
  // aliases
  Lists.prototype.things = Lists.prototype.items

  Doc.prototype.lists = function(n) {
    let m = this.if('@hasComma+ .? (and|or) not? .')

    // person-list
    let nounList = m.match('(#Noun|#Adjective)+ #Conjunction not? #Adjective? #Noun+')
    let adjList = m.match('(#Adjective|#Adverb)+ #Conjunction not? #Adverb? #Adjective+')
    let verbList = m.match('(#Verb|#Adverb)+ #Conjunction not? #Adverb? #Verb+')
    let result = nounList.concat(adjList)
    result = result.concat(verbList)
    result = result.if('@hasComma')

    if (typeof n === 'number') {
      result = m.get(n)
    }
    return new Lists(result.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
