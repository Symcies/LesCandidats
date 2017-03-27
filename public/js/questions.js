////////////////////////////////////////////////////////////////////////////////
/// Display the survey
////////////////////////////////////////////////////////////////////////////////

Survey.Survey.cssType = "bootstrap"
Survey.JsonObject.metaData.addProperty("checkbox", {name: "renderAs", default: "standard", choices: ["standard", "icheck"]});
Survey.JsonObject.metaData.addProperty("radiogroup", {name: "renderAs", default: "standard", choices: ["standard", "icheck"]});

Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";

var widget = {
    name: "icheck",
    isFit : function(question) { return question["renderAs"] === 'icheck'; },
    isDefaultRender: true,
    afterRender: function(question, el) {
        var $el = $(el);
        var select = function() {
          $el.find("input[value=" + question.value + "]").iCheck('check');
        }
        $el.find('input').data({"iCheck": undefined});
        $el.find('input').iCheck({
          checkboxClass: 'icheckbox_square-blue',
          radioClass: 'iradio_square-blue',
        });
        $el.find('input').on('ifChecked', function(event){
          question.value = event.target.value;
        });
        question.valueChangedCallback = select;
        select();

    }
};

//Survey.CustomWidgetCollection.Instance.addCustomWidget(widget);


questions["title"]        = "Découvrez votre candidat 2017";
questions["requiredText"] = "";
questions["completedHtml"] = "Veuillez patienter, nous recherchons votre candidat 2017";
questions["locale"] = "fr";


var survey = new Survey.Model(questions);
survey.showProgressBar = "bottom";



$("#surveyContainer").Survey({
    model:survey,
    showQuestionNumbers:"off",
    onComplete:sendDataToServer
});

$(".panel-footer").click(function() {
  $(this).addClass("text-center");
});




////////////////////////////////////////////////////////////////////////////////
/// Send the data to the surver
////////////////////////////////////////////////////////////////////////////////

function sendDataToServer(survey) {
  var resultAsString = JSON.stringify(survey.data);

  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "answers")

  for(var key in survey.data) {
    if(survey.data.hasOwnProperty(key)) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", survey.data[key]);

      form.appendChild(hiddenField);
    }
  }

  var userPref = document.createElement("input");
  userPref.setAttribute("type", "hidden");
  userPref.setAttribute("name", "userPreferences");
  userPref.setAttribute("value", JSON.stringify(userPreferences));
  form.appendChild(userPref);


  document.body.appendChild(form);
  form.submit();

};



survey.onComplete.add(sendDataToServer);
