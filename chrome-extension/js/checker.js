var PageContentSpellChecker = function () {

  function requestCorrections(textChunks) {
  }

  return {
    validatePage: function () {
      return $.map($("p"), function(n) {
        return n.textContent;
      });
    }
  };
}

var result = PageContentSpellChecker().validatePage();
console.log(result);
