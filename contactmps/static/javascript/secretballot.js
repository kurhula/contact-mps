var daysRemaining=(function(){ 
    var oneDay = 24*60*60*1000;
    var decision = new Date(2017, 7, 8, 23, 59);
    return Math.floor(Math.abs((Date.now() - decision.getTime())/(oneDay)));
})();

$(".days-remaining-number").text(daysRemaining + " days");

$(".toggle-button-question .toggle-select").click(function() {
  $(".toggle-button-question .toggle-select").removeClass("selected");
  $(this).addClass("selected");
  $("#previewEmail").removeClass("disabled");
});


/* follow-up questions */

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function emailSent() {
  // prep follow up questions
  var questions = [
    {
      q: "Have you ever participated in a protest march?",
      a: ["YES, I have", "NO, I have not"],
    }, {
      q: "Is this your first time emailing a Member of Parliament?",
      a: ["YES, it is", "NO, it is not"],
    }, {
      q: "Do you know that all MPs are assigned a constituency, and represent those who live in it?",
      a: ["YES, I know about that", "NO, I did not know"],
    },
  ];
  var q = questions[getRandomInt(0, questions.length)];

  ga('send', 'event', 'follow-up', 'asked', q);
  $('.follow-up-question p').text(q.q);
  $('#follow-up-answer-1').text(q.a[0]);
  $('#follow-up-answer-2').text(q.a[1]);

  $("#secret-ballot-sent").show();
}

$(".follow-up-question-box .toggle-select-follow-up").click(function() {
  var $this = $(this);

  $(".follow-up-question-box .toggle-select-follow-up").removeClass("selected");
  $this.addClass("selected");

  var q = $('.follow-up-question').text();
  var a = $this.text();

  $('.follow-up-question p').text('Thanks!');
  $('.follow-up-answer-box').hide();

  ga('send', 'event', 'follow-up', 'answered', q);

  // TODO: submit to server
});



$("#secret-ballot-preview-message").hide();
$("#secret-ballot-sent").hide();

$("#previewEmail").click(function(e) {
  e.preventDefault();
  var senderName = $(".name-input").val();
  var senderEmail = $(".email-input").val();
  if ($("#comment").val() != "") {
    var emailContent = "<p>Other issues that concern me about the future of South Africa are:</p><p>" + ($("#comment").val().replace(/\n/g, '<br>'))
  } else {
    var emailContent = "";
  };
  if ($(".toggle-select.selected").attr("id") == "no") {
    var emailSubject = "I do not support a secret ballot in the vote of no confidence";
  }
  else if ($(".toggle-select.selected").attr("id") == "yes") {
    var emailSubject = "I support a secret ballot in the vote of no confidence";
  };
  $("#name").text(senderName);
  $("#email").text(senderEmail);
  $("#email-title").text(emailSubject);

  $("#comment-preview").html("<p>Dear Madam Speaker,</p><p>I am a citizen of South Africa and I want to let you know that <b>" + emailSubject + " in President Jacob Zuma</b>.</p>" + emailContent + "</p><p>You represent all South Africans, including me. Please choose in favour of good governance - a governance that is best suited to realising my hopes for our future.</p><p>Yours sincerely,</p><p>" + senderName + "</p>");
  $("#secret-ballot-build-message").hide();
  $("#secret-ballot-preview-message").show();
  location.hash = "#secret-ballot-preview-message";
});

$("#editEmail").click(function(e) {
  e.preventDefault();
  $("#secret-ballot-build-message").show();
  $("#secret-ballot-preview-message").hide();
  location.hash = "#email-secret";
});

function submitForm() {
  var senderName = $(".name-input").val();
  var senderEmail = $(".email-input").val();
  var emailSubject = $("#email-title").text();
  var emailContent = $("#comment-preview").text();

  jQuery.ajax('/api/v1/email/', {
    type: 'POST',
    data: {
      person: 7720,
      name: senderName,
      email: senderEmail,
      body: emailContent,
      subject: emailSubject,
      // gRecaptchaResponse: grecaptcha.getResponse();,
    },
    success: function(data) {
      console.info("success", data);
      emailSent();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error(jqXHR, textStatus, errorThrown, jqXHR.responseText);
    }
  });
};
