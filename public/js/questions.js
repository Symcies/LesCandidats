////////////////////////////////////////////////////////////////////////////////
/// Display the survey
////////////////////////////////////////////////////////////////////////////////

Survey.Survey.cssType = "bootstrap"

//var survey = new Survey.Survey(questions, "surveyContainer");
//survey.showProgressBar = "bottom";

var survey = new Survey.Model(questions);
$("#surveyContainer").Survey({
    model:survey,
    onComplete:sendDataToServer
});
survey.showProgressBar = "bottom";

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
