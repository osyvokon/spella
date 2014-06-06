var API = {

    baseUrl: "http://spellchecker.com.ua",

    requestCorrections: function(textChunks, callback) {
      $.ajax(this.baseUrl + "/api/check", {
        data : JSON.stringify({"text": textChunks}),
        contentType : 'application/json',
        type : 'POST',
        success: function (response) {
          callback(response.checked);
        }
      });
    }
};

var init = function () {
    $("#btnCheck").click(function() {
        var chunks = [$("#checktext").val()];
        console.log(chunks);
        API.requestCorrections(chunks, function (validated) {
            console.log(validated);
        });
    });
};

document.addEventListener('DOMContentLoaded', init, false);

