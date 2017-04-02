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
/*
var myCss = {
	"root": "1",
	"header": "panel-heading",
	"body": "panel-body",
	"footer": "panel-footer",
	"navigationButton": "button btn-lg",
	"navigation": {
		"complete": "1",
		"prev": "2",
		"next": "3"
	},
	"progress": "progress center-block",
	"progressBar": "progress-bar",
	"pageTitle": "ab",
	"row": "BlockOfQuestions",
	"question": {
		"root": "6",
		"title": "7",
		"comment": "form-control",
		"indent": 20
	},
	"error": {
		"root": "alert alert-danger",
		"icon": "glyphicon glyphicon-exclamation-sign",
		"item": "8"
	},
	"checkbox": {
		"root": "form-inline",
		"item": "checkbox",
		"other": "9"
	},
	"comment": "form-control",
	"dropdown": "form-control",
	"matrix": {
		"root": "table table-striped"
	},
	"matrixdropdown": {
		"root": "table"
	},
	"matrixdynamic": {
		"root": "table",
		"button": "button"
	},
	"multipletext": {
		"root": "table",
		"itemTitle": "10",
		"itemValue": "form-control"
	},
	"radiogroup": {
		"root": "form-inline",
		"item": "radio",
		"other": "11"
	},
	"rating": {
		"root": "btn-group",
		"item": "btn btn-default"
	},
	"text": "form-control",
	"window": {
		"root": "modal-content",
		"body": "modal-body",
		"header": {
			"root": "modal-header panel-title",
			"title": "pull-left",
			"button": "glyphicon pull-right",
			"buttonExpanded": "glyphicon pull-right glyphicon-chevron-up",
			"buttonCollapsed": "glyphicon pull-right glyphicon-chevron-down"
		}
	}
}
*/

var myCss = {
  row : 'BlockOfQuestions',
}

questions["title"]        = "Découvrez votre candidat 2017";
questions["requiredText"] = "";
questions["completedHtml"] = "Veuillez patienter, nous recherchons votre candidat 2017";
questions["locale"] = "fr";


var survey = new Survey.Model(questions);
survey.showProgressBar = "bottom";

var nameLastQuestion = questions["pages"][questions["pages"].length - 1]["questions"][0]["name"];

function surveyValidateQuestion(s, options) {
    if (options.name == nameLastQuestion) {
      if(Object.keys(survey.data).length < 5) {
        options.error = "Veuillez répondre à au moins 5 questions en tout";
      }
    }
}


$("#surveyContainer").Survey({
    model:survey,
    css: myCss,
    showQuestionNumbers:"off",
    onComplete:sendDataToServer,
    onValidateQuestion: surveyValidateQuestion
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
