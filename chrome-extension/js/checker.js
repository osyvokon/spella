var PageContentSpellChecker = function () {

  var API = {

    baseUrl: "http://localhost:8080",

    requestCorrections: function(textChunks, callback) {
      $.ajax(this.baseUrl + "/api/check", {
        data : JSON.stringify({"text": textChunks}),
        contentType : 'application/json',
        type : 'POST',
        success: function (response) {
          callback(response.checked);
        }
      });

      //return $.map(textChunks, function(p) { return p.toUpperCase(); });
    }
  };

  var lineoffset = function (str, lineno) {
    var offset = 0;
    for (var i = 0; i < lineno; i++) {
      offset = str.indexOf('\n', offset) + 1;
    }
    return offset;
  }


  return {
    validatePage: function () {
      var pp = _.filter($("p,h1,h2,h3,h4"), function (p) {
        return p && p.textContent && (p.textContent.trim() != "");
      });
      var chunks = $.map(pp, function(n) { return n.innerHTML; });
      API.requestCorrections(chunks, function (validated) {
        console.log("Got response")
        for (var chunkIndex = 0; chunkIndex < validated.length; chunkIndex++) {
          var p = pp[chunkIndex];
          var s = p.textContent;
          var v = $($.parseXML(validated[chunkIndex]));
          var startIndex = {}, endIndex = {};
          var stopPoints = [];
          var errors = v.find("error");
          if (errors.length == 0) continue;

          _.each(errors, function (error) {
            var from = Number(error.attributes['fromx'].value) + lineoffset(s, Number(error.attributes['fromy'].value)),
                to   = Number(error.attributes['tox'].value) + lineoffset(s, Number(error.attributes['toy'].value));
            stopPoints.push(from);
            stopPoints.push(to);
            startIndex[from] = error;
            endIndex[to] = error;
          });

          console.log("Found error in chunk: ", p.textContent);

          var out = [];
          var i = 0;
          stopPoints.sort();
          _.each(stopPoints, function (j) {
            out.push(s.slice(i, j));
            if (endIndex[j]) out.push("</span>");
            if (startIndex[j]) {
              var e = startIndex[j];
              var msg = e.attributes['msg'].value; // TODO: quote "
              out.push('<span class="spellingError" title="' + msg + '" style="background-color: yellow">');
            }
            i = j;
          });
          out.push(s.slice(i, s.length));
          console.log(out.join(''));

          $(p).html(out.join(''));
          //$(p).html(p.textContent.toUpperCase());
        }
      });
    }
  }
}

$(function() {
  var result = PageContentSpellChecker().validatePage();
  console.log("Plugin started");
});
