var PageContentSpellChecker = function () {

  var API = {
    requestCorrections: function(textChunks) {
      return $.map(textChunks, function(p) { return p.toUpperCase(); });
    }
  };


  return {
    validatePage: function () {
      var pp = $("p");
      var chunks = $.map(pp, function(n) {
        return n.textContent;
      });
      var validated = API.requestCorrections(chunks);
      _.each(_.zip(pp, validated), function(t) {
        $(t[0]).html(t[1]);
      });
    }
  };
}

var result = PageContentSpellChecker().validatePage();
console.log(result);
