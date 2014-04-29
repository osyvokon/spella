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


  return {
    validatePage: function () {
      var pp = _.filter($("p,h1,h2,h3,h4"), function (p) {
        return p && p.textContent && (p.textContent.trim() != "");
      });
      var chunks = $.map(pp, function(n) { return n.textContent; });
      API.requestCorrections(chunks, function (validated) {
        console.log("Got response")
        for (var chunkIndex = 0; chunkIndex < validated.length; chunkIndex++) {
          var p = pp[chunkIndex];
          var v = $($.parseXML(validated[chunkIndex]));
          var startIndex = {}, endIndex = {};
          var stopPoints = [];
          _.each(v.find("error"), function (error) {
            var from = Number(error.attributes['fromx'].value),
                to   = Number(error.attributes['tox'].value);
            stopPoints.push(from);
            stopPoints.push(to);
            startIndex[from] = error;
            endIndex[to] = error;
          });

          if (stopPoints.length > 0) {
            console.log("Found error in chunk: ", p.textContent);
          } else {
            continue;
          }

          var out = [];
          var i = 0;
          var s = p.textContent;
          _.each(stopPoints, function (j) {
            out.push(s.slice(i, j));
            if (endIndex[j]) out.push("</span>");
            if (startIndex[j]) out.push("<span class='spellingError' style='background-color: yellow'>");
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
