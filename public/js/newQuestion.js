Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
Survey.Survey.cssType = "bootstrap";
Survey.JsonObject.metaData.addProperty("checkbox", {name: "renderAs", default: "standard", choices: ["standard", "icheck"]});
Survey.JsonObject.metaData.addProperty("radiogroup", {name: "renderAs", default: "standard", choices: ["standard", "icheck"]});


var survey = new Survey.Model({
 pages: [
  {
   name: "page1",
   questions: [
    {
     type: "radiogroup",
     renderAs: "icheck",
     choices: [
      {
       value: "1",
       text: "first item"
      },
      {
       value: "2",
       text: "second item"
      },
      {
       value: "3",
       text: "third item"
      }
     ],
     name: "question1"
    }
   ]
  },
  {
   name: "page2",
   questions: [
    {
     type: "checkbox",
     renderAs: "icheck",
     choices: [
      {
       value: "1",
       text: "first item"
      },
      {
       value: "2",
       text: "second item"
      },
      {
       value: "3",
       text: "third item"
      }
     ],
     name: "question2"
    }
   ]
  }
 ]
});
survey.data = {position:"2"};


var widget = {
    name: "icheck",
    isFit : function(question) { return question["renderAs"] === 'icheck'; },
    isDefaultRender: true,
    afterRender: function(question, el) {
        var $el = $(el);
        var select = function() {
          $el.find("input[value=" + question.value + "]").iCheck('check');
        };

        $el.find('input').data({"iCheck": undefined});
        $el.find('input').iCheck({
          checkboxClass: 'icheckbox_square-blue',
          radioClass: 'iradio_square-blue',
        });
        $el.find('input').on('ifChecked', function(event){
          console.log(1, event.target);
          console.log(2, question);
          question.value = event.target.value;
        });
        question.valueChangedCallback = select;
        select();

    }
}
Survey.CustomWidgetCollection.Instance.addCustomWidget(widget);


$("#surveyContainer").Survey({
    model: survey
});
