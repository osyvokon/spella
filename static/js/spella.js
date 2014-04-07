var init = function() {
  tinyMCE.init({
     mode : "textareas",
     plugins : "AtD,paste",
     paste_text_sticky : true,
     setup : function(ed) {
         ed.onInit.add(function(ed) {
             ed.pasteAsPlainText = true;
         });
     },  
     languagetool_i18n_no_errors : { "uk-UA": "Помилок не знайдено" },
     languagetool_i18n_explain : { "uk-UA": "Більше..." },
     languagetool_i18n_ignore_once : { "uk-UA": "Пропустити помилку" },
     languagetool_i18n_ignore_all : { "uk-UA": "Пропустити всі подібні помилки" },
     languagetool_i18n_current_lang : function() { return "en-US"; },
     languagetool_rpc_url : "/proxy?",
     languagetool_css_url :
         "/js/" +
         "tiny_mce/plugins/atd-tinymce/css/content.css",
     theme                              : "advanced",
     theme_advanced_buttons1            : "",
     theme_advanced_buttons2            : "",
     theme_advanced_buttons3            : "",
     theme_advanced_toolbar_location    : "none",
     theme_advanced_toolbar_align       : "left",
     theme_advanced_statusbar_location  : "bottom",
     theme_advanced_path                : false,
     theme_advanced_resizing            : true,
     theme_advanced_resizing_use_cookie : false,
     gecko_spellcheck                   : false
  });
}

function doit() {
  var langCode = "uk";
  tinyMCE.activeEditor.execCommand("mceWritingImprovementTool", langCode);
  woodoo();
}

function woodoo() {
  var x = Math.floor(Math.random() * 8);
  var img = "img/" + x + ".jpg";
  $("#sprite").attr("src", img);
  $("#sprite").animate({left: "+=1000"}, 200, "swing", function() {
    setTimeout(function() {
      $("#sprite").animate({left: "-=1000"}, 200, "swing");
    }, 1500);
  });
}


document.addEventListener('DOMContentLoaded', init, false);
