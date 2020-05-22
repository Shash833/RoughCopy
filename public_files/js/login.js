$(function () {
  $("#submitForm").on("click", function (event) {
    event.preventDefault();
    alert("pressed submit mate....");

  });

  $("#registerSubmit").on("click", function (event) {
    event.preventDefault();
    alert("register submit mate....");
    // var firstName = $("#createFirstName").val().trim();
    // var lastName = $("#createLastName").val().trim();
    // var userName = $("#createUsername").val().trim();
    // var password = $("#createPassword").val().trim();
    var newUser = {
      username: $("#createUsername").val().trim(),
      password: $("#createPassword").val().trim(),
      firstname: $("#createFirstName").val().trim(),
      lastname: $("#createLastName").val().trim(),
    };
    // POST request.
    $.ajax("/api/order", {
      type: "POST",
      data: newUser,
    }).then(function () {
      location.reload("/");
    });
    // alert(firstName);
  });

  $("#submitLogin").on("click", function (event) {
    event.preventDefault();
    alert("login clicked");
    var User = {
      username: $("#loginUsername").val().trim(),
      password: $("#loginPassword").val().trim(),
    };
    // POST request.
    $.ajax("/api/login", {
      type: "POST",
      data: User,
    })
    // .then(function () {
    //   location.reload("/search");
    // });
    // alert(firstName);
  });

});
