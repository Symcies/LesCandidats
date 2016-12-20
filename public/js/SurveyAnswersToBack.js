function sendDataToServer(survey) {
  var resultAsString = JSON.stringify(survey.data);



  $.ajax({
    type: "POST",
    url: '/answers',
    data: resultAsString,
    success: function(html){
       $('body').html(html); // place the html wherever you like
    },
    error: function(err){ alert('error'); },
    contentType: "application/json"
  });

};


var survey = new Survey.Survey(questions, "surveyContainer");
//Use onComplete event to save the data
survey.onComplete.add(sendDataToServer);
