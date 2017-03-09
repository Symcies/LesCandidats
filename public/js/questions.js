////////////////////////////////////////////////////////////////////////////////
/// Display the survey
////////////////////////////////////////////////////////////////////////////////

Survey.Survey.cssType = "bootstrap"

var myCss = {
  "navigationButton": "button btn-lg"
};

//var survey = new Survey.Survey(questions, "surveyContainer");
//survey.showProgressBar = "bottom";
questions["title"]        = "Découvrez votre candidat 2017";
questions["requiredText"] = "";
questions["completedHtml"] = "Veuillez patienter, nous recherchons votre candidat 2017";
questions["locale"] = "fr";


var survey = new Survey.Model(questions);
survey.showProgressBar = "bottom";

$("#surveyContainer").Survey({
    model:survey,
    css:myCss,
    showQuestionNumbers:"off",
    onComplete:sendDataToServer
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
