// Any variable that is initialized inside a function using the var 
// keyword will have a local scope. If a variable is initialized inside 
// a function without var, it will have a global scope. 
// A local variable can have the same name as a global variable.

document.getElementById("name").focus();
// var num = '';
$(document).keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13' ){   // If enter key is pressed
	  checkErrors();    
	event.preventDefault();
	}
});

$('button').click(function() {   // If submit button is clicked
  checkErrors();
});

$("#mail").on('change', function() {
  $('label[for="mail"]').removeClass('error scroll').text('Email:');
});

$("#title").on('change', function() {
  $('#titleBox').removeClass('titleBright'); // Remove bright (field empty) styling
  $('#titleBox').addClass('title');          // Normal styling   
  
  $('select[id="title"]').removeClass('titleSelectBright'); // Bright styling with white background
  
  if($('#title option[value]:selected').text() === 'Other') { //Other Box is only displayed
    $('#labelTitleOther').removeClass('displayNone');         //  when title selected is "other"
    $('#labelTitleOther').addClass('labelTitleOther');
    $('#titleOther').removeClass('displayNone');
    $('#titleOther').addClass('titleOther');
  }
  
  $('label[for="title"]').removeClass('error focusBright scroll').text('Job Role:'); //Remove error styling
  $('#title').removeClass('focusBright scroll');   // Remove focus and scroll
  $('label[for="titleOther"]').removeClass('error').text('Other Job Role:'); //Error Label for titleOther is removed
  $("#titleOther").removeClass('focusBright scroll');  // Remove error styling for titleOther label
  
  var labelReturn = checkInputs();     //Look for next field that is empty so we can give it a white background
  labelReturn.addClass('focusBright scroll');  // Add the white background and scroll to first field that is empty
  focusScrollClick();      // focus on first empty field 
});

$("#titleOther").on('change', function() {
  $('label[for="titleOther"]').removeClass('error').text('Other Job Role:');
  $("#titleOther").removeClass('focusBright scroll');
  var labelReturn = checkInputs();
  labelReturn.addClass('focusBright scroll');
  focusScrollClick();
});

$("#size").on('change', function() {
  $('#sizeBox').removeClass('sizeBright');
  $('#sizeBox').addClass('size');
  
  $('select[id="size"]').removeClass('sizeSelectBright');
  
  $('label[for="size"]').removeClass('error scroll').text('Size:');
  $('#size').removeClass('focusBright scroll');
  var labelReturn = checkInputs();
  labelReturn.addClass('focusBright scroll');
  focusScrollClick();
});

$("#design").on('change', function() {
  $('#designBox').removeClass('designBright');
  $('#designBox').addClass('design');
  
  $('select[id="design"]').removeClass('designSelectBright');
  
  $('label[for="design"]').removeClass('error scroll').text('Design:');
  $('#design').removeClass('focusBright scroll');
  hideColors();  // Only display the colors that this design is available in
  var labelReturn = checkInputs();
  labelReturn.addClass('focusBright scroll');
  focusScrollClick();
});

$("#color").on('change', function() {
  $('#colorBox').removeClass('colorBright');
  $('#colorBox').addClass('color');
  $('select[id="color"]').removeClass('colorSelectBright');
  
  $('label[for="color"]').removeClass('error scroll').text('Color:');
  $('#color').removeClass('focusBright scroll');
  var labelReturn = checkInputs();
  labelReturn.addClass('focusBright scroll');
  focusScrollClick();
});

$('.activities input[type="checkbox"]').on('change', function() {
  console.log('activity was clicked');
  var act = $(this);
  checkActivity2(act);
  computeTotalCost();
  $("#activities").removeClass('focusBright scroll'); // Remove activity brighten/scroll on first activity select
  var labelReturn = checkInputs();   // activity check boxes keep scroll on shirt above
  labelReturn.addClass('focusBright'); 
  $("#color").addClass('scroll'); // Keep scroll on shirt field above
});

$("#payment").on('change', function() {
  checkPayment(); // Credit Card fields are only shown if credit card is selected
  $('#paymentBox').removeClass('paymentBright');
  $('#paymentBox').addClass('paymentBox');
  $('select[id="payment"]').removeClass('paymentSelectBright');
  
  $('label[for="payment"]').removeClass('error scroll').text('Select a Payment Method:');
  $('#payment').removeClass('focusBright scroll');
  $('#cc-num').removeClass('focusBright');
  $('#zip').removeClass('focusBright');
  $('#cvv').removeClass('focusBright');
  $('#expMonthBox').removeClass('expMonthBright');
  $('#expYearBox').removeClass('expYearBright');
  
  var labelReturn = checkInputs();
  labelReturn.addClass('focusBright scroll');
  focusScrollClick();
});

$("#cc-num").on('change', function() {
  $('label[for="cc-num"]').removeClass('error').text("Card Number:"); //We should remove label errors when clicked
  
  $("#color").removeClass('scroll'); // After activities have been clicked we can scroll down
  $('#cc-num').removeClass('focusBright');
  var labelReturn = checkInputs();
  labelReturn.addClass('focusBright scroll');
  focusScrollClick();
});

$("#zip").on('change', function() {
  $('label[for="zip"]').removeClass('error').text("Zip:"); 
  $('#zip').removeClass('focusBright');
  var labelReturn = checkInputs();
  labelReturn.addClass('focusBright scroll');
  focusScrollClick();
});

$("#cvv").on('change', function() {
  $('label[for="cvv"]').removeClass('error').text("CVV:");
  $('#cvv').removeClass('focusBright');
  var labelReturn = checkInputs();
  labelReturn.addClass('focusBright scroll');
  focusScrollClick();
});

$("#expMonth").on('change', function() {
  $('#expMonthBox').removeClass('expMonthBright');
  $('#expMonthBox').addClass('expMonth');
  $('select[id="expMonth"]').removeClass('expMonthSelectBright');
  
  $('label[for="expMonth"]').removeClass('error scroll').text('Expiration Month:');
  $('#expMonth').removeClass('focusBright scroll');
  var labelReturn = checkInputs();
  labelReturn.addClass('focusBright scroll');
  focusScrollClick();
});

$("#expYear").on('change', function() {
  $('#expYearBox').removeClass('expYearBright');
  $('#expYearBox').addClass('expYear');
  $('select[id="expYear"]').removeClass('expYearSelectBright');
  
  $('label[for="expYear"]').removeClass('error scroll').text('Expiration Year:');
  $('#expYear').removeClass('focusBright scroll');
  var labelReturn = checkInputs();
  labelReturn.addClass('focusBright scroll');
  focusScrollClick();
});

function checkInputs() {            // Check for next empty field
  
  var nameInput = $("#name").val(); // val is value of what user enters in this field
  var label;
  if (nameInput === '') {           // If the field is empty
    label = $('#name');         // Return and change the styling to a white background
    return label;
  } 

  var emailInput = $("#mail").val();
  if (emailInput === '') {
    label = $('#mail');
    return label;
  }
  
  if($('#title option[value]:selected').text() === '') {
    $('#titleBox').removeClass('title');  // Remove normal styling
    $('#titleBox').addClass('titleBright');  // Add white background for empty field
    $('select[id="title"]').addClass('titleSelectBright');
    label = $('#title');
    return label;
  } 
  
  if($('#title option[value]:selected').text() === 'Other') {
    nameInput = $("#titleOther").val();
    if (nameInput === '') {
      label = $('#titleOther');
      return label;
    }  
  } 
  
  if($('#size option[value]:selected').text() === '') {
    $('#sizeBox').removeClass('size');
    $('#sizeBox').addClass('sizeBright');
    $('select[id="size"]').addClass('sizeSelectBright');
    label = $('#size');
    return label;
  } 
  
  if($('#design option[value]:selected').text() === '') {
    $('#designBox').removeClass('design');
    $('#designBox').addClass('designBright');
    $('select[id="design"]').addClass('designSelectBright');
    label = $('#design');
    return label;
  } 
  
  if($('#color option[value]:selected').text() === '') {
    $('#colorBox').removeClass('color');
    $('#colorBox').addClass('colorBright');
    $('select[id="color"]').addClass('colorSelectBright');
    label = $('#color');
    return label;
  } 
  
  if (!$('.activities input[type="checkbox"]').is(':checked')) {
    label = $('#activities');
    return label;
  } 
  
  if($('#payment option[value]:selected').text() === 'Credit Card') {
    label = checkCardInputs(); // Check for empty card fields
    return label;              // Return next empty field or submit button field
  }

  label = $('button');
  return label;
  }

function checkCardInputs() {  //Check for empty card fields
  var cardInput = $("#cc-num").val();
  var label;
  if (cardInput === '') {
    label = $('#cc-num');
    return label;
  } 
  
  cardInput = $("#zip").val();
  if (cardInput === '') {
    label = $('#zip');
    return label;
  } 
  
  cardInput = $("#cvv").val();
  if (cardInput === '') {
    label = $('#cvv');
    return label;
  } 
  if($('#expMonth option[value]:selected').text() === '') {
    $('#expMonthBox').removeClass('expMonth');
    $('#expMonthBox').addClass('expMonthBright');
    $('select[id="expMonth"]').addClass('expMonthSelectBright');
    label = $('#expMonth');
    return label;
  } 

  if($('#expYear option[value]:selected').text() === '') {
    $('#expYearBox').removeClass('expYear');
    $('#expYearBox').addClass('expYearBright');
    $('select[id="expYear"]').addClass('expYearSelectBright');
    label = $('#expYear');
    return label;
  } 
  
  label = $('button');  // No fields are blank - brighten the submit button to check for errors
  return label;
}

function checkErrors() {  // This function runs when enter key is pressed or submit button is clicked
  var nameInput = $("#name").val();  // These errors change the field label to a red message
  if (nameInput === '') {
    $('label[for="name"]').addClass('error scroll').text("Enter Your Name");
  } else {
    $('label[for="name"]').removeClass('error scroll').text('Name:');
  }
  
  var emailInput = $("#mail").val();  // The filter below checks to see if the email is in a valid format
  var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailInput === '' || !filter.test(emailInput)) {
    $('label[for="mail"]').addClass('error scroll').text("Enter a Valid Email Address");
  } else{
    $('label[for="mail"]').removeClass('error scroll').text('Email:');
  }
  
  if($('#title option[value]:selected').text() === '') {
    $('label[for="title"]').addClass('error scroll').text("Select Your Job Role");
  } else {
    $('label[for="title"]').removeClass('error scroll').text('Job Role:');
  }

  if($('#title option[value]:selected').text() === 'Other') {
    nameInput = $("#titleOther").val();
    if (nameInput === '') {
      $('label[for="titleOther"]').addClass('error scroll').text("Enter Other Job Role");
    } else {
    $('label[for="titleOther"]').removeClass('error scroll').text('Job Role:');
    }
  }
  
  if($('#size option[value]:selected').text() === '') {
    $('label[for="size"]').addClass('error scroll').text("Select Shirt Size");
  } else {
    $('label[for="size"]').removeClass('error scroll').text('Size:');
  }
  
  if($('#design option[value]:selected').text() === '') {
    $('label[for="design"]').addClass('error scroll').text("Select Shirt Design");
  } else {
    $('label[for="design"]').removeClass('error scroll').text('Design:');
  }
  
  if($('#color option[value]:selected').text() === '') {
    $('label[for="color"]').addClass('error scroll').text("Select Shirt Color");
  } else {
    $('label[for="color"]').removeClass('error scroll').text('Color:');
  }
  
  if (!$('.activities input[type="checkbox"]').is(':checked')) {
    $('legend[id="activities"]').addClass('error scroll').text("Register For Activities");
  } else {
    $('legend[id="activities"]').removeClass('error').text("Register For Activities");
    // $('.activities input[type="checkbox"]').focus(); // Focus on the first legend error which relates to activities
  }
  
  if($('#payment option[value]:selected').text() === '') {
    $('label[for="payment"]').addClass('error scroll').text("Select Payment Method");
    $('label[for="expYear"]').addClass('scroll');
  } else {
    $('label[for="payment"]').removeClass('error').text('Payment Method:');
    $('legend[for="activities"]').removeClass('scroll').text("Activities"); // Remove scroll after all activities have been added
    // $('label[for="payment"]').addClass('scroll').text("Payment Method"); //Scroll after all activities have been added
  }
  
  if($('#expMonth option[value]:selected').text() === '') {
    $('label[for="expMonth"]').addClass('error').text("Select Card Expiration Month:");
  } else {
    $('label[for="expMonth"]').removeClass('error').text('Expiration Date:');
  }
  
  if($('#expYear option[value]:selected').text() === '') {
    $('label[for="expYear"]').addClass('error script').text("Select Expiration Year:");
  } else {
    $('label[for="expYear"]').removeClass('error').text('Expiration Year:');
    $('label[for="expYear"]').addClass('script');
  }
  
  checkCCNum(); // Check for valid credit card number format
  checkZip();   // Check for valid zip code format
  checkCvv();   // Check for valid CVV format
  focusScroll(); // This is the focus scroll when enter or submit button is clicked
} // end checkErrors

  function checkCCNum(){
    var cardInput = $("#cc-num").val();
    var numericReg = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/;  //Checks for a valid format for card number
    var cardValid = true;
    var num;
    if (cardInput === '') {  // If card input is blank
      cardValid = false;
      num = '1';           // If num is '1', '2', or '3' a specific prompt will be displayed
      errorCCNum(num);     // Pass num to function to change the label field to correct prompt
    } else if (!numericReg.test(cardInput)) {  //If card input is not in correct format
      cardValid = false;
      num = '2';
      errorCCNum(num);     // Pass num to function to change the label field to correct prompt
    } else if (cardInput.length > 16 ||    //If card input is not enough or too many numbers
               cardInput.length < 14) {
      cardValid = false;
      num = '3';
      errorCCNum(num);   // Pass num to function to change the label field to correct prompt
    }
    
    if (cardValid)  {  //If card format is valid
        $('label[for="cc-num"]').removeClass('error').text("Card Number:"); 
    }
  }

function checkZip(){
  var cardInput = $("#zip").val();
  var numericReg = /(^\d{5}$)|(^\d{5}-\d{4}$)/; // Checks for valid zip format
  var cardValid = true;
  var num;
  if (cardInput === '') {
    cardValid = false;
    num = '1';
    errorZip(num);
  } else if (!numericReg.test(cardInput)) {
    cardValid = false;
    num = '2';
    errorZip(num); 
  } 
  
  if (cardValid)  {
      $('label[for="zip"]').removeClass('error').text("Zip:"); 
    }
  }
  
function checkCvv(){
  var cardInput = $("#cvv").val();
  var numericReg = /^[0-9]{3,4}$/;
  var cardValid = true;
  var num;
  if (cardInput === '') {
    cardValid = false;
    num = '1';           // If num is '1', or '2' a specific prompt will be applied
    errorCvv(num);
  } else if (!numericReg.test(cardInput)) {  // Check cvv format
    cardValid = false;
    num = '2';
    errorCvv(num); 
  } 
  
  if (cardValid)  {
      $('label[for="cvv"]').removeClass('error').text("CVV:"); 
    }
  }
  
function focusScroll(){
  // var $win = $(window);                                   
  if (!$('label[for="cc-num"]').hasClass('error')) { //If we are already at the bottom
  } else {
      scrollNow();
  }
  
  if ($('label.error').length <  1) {
    $("button").focus(); // Focus on the submit button
    event.preventDefault();
  } else {
      $(".error:first").focus(); // Focus on the first error, not selected, or blank field found
      event.preventDefault();
    }
}

function focusScrollClick(){   //This is the scroll for clicking through boxes not pressing enter
  if ($("#expYear").hasClass('focusBright')) { //If we are already at the bottom
  } else {
      scrollNow();
  }
}

  function scrollNow() {
    $('html, body').animate({    //Automatically Scrolls form up to error fields
         scrollTop: $(".scroll:first").offset().top - 100
    }, 500);
  }

function errorCCNum(num) {
  switch (num) {      
      case '1':
           $('label[for="cc-num"]').addClass('error').text("Enter Credit Card Number");  
           break;
      case '2':
           $('label[for="cc-num"]').addClass('error').text("Card should be numbers only.");
           break;
      case '3':
           $('label[for="cc-num"]').addClass('error').text("Enter card number - 14-16 digits.");
           break;
    }
}
  
function errorZip(num) {
  switch (num) {      
      case '1':
           $('label[for="zip"]').addClass('error').text("Enter Zip");  
           break;
      case '2':
           $('label[for="zip"]').addClass('error').text("Zip - five digits."); 
           break;
  }
}

function errorCvv(num) {
  switch (num) {      
      case '1':
           $('label[for="cvv"]').addClass('error').text("Enter CVV");  
           break;
      case '2':
           $('label[for="cvv"]').addClass('error').text("CVV 3-4 digits."); 
           break;
  }
}

function hideColors() { 
  if ($('#design option[value]:selected').text() !== ''){ //Shirt color field only displays once design is selected
    $('#colors-js-puns').css('display', 'inline-block');  
  } else {
    $('#colors-js-puns').css('display', 'none');
  }
  
  $('#color option').show();  // Designs only come in some colors
  if($('#design option[value]:selected').text() === 'Theme - JS Puns'){
    $('#color option[value="tomato"]').hide();
    $('#color option[value="steelblue"]').hide();
    $('#color option[value="dimgrey"]').hide();
  } else {
    $('#color option[value="cornflowerblue"]').hide();
    $('#color option[value="darkslategrey"]').hide();
    $('#color option[value="gold"]').hide();
  }
}

function checkActivity2(act) { // Activities with conflicting times are highlighted with a message
  if ($('.activities input[name="js-frameworks"]').is(':checked')) {
    $('label[name="express"]').addClass('timeConflict');
    $('.activities input[name="express"]').attr("disabled", true); // Conflicting activities cannot be selected
    $('.activities span[id="express"]').css('display','inline');
  }
  if ($('.activities input[name="js-libs"]').is(':checked')) {
    $('label[name="node"]').addClass('timeConflict');
    $('.activities input[name="node"]').attr("disabled", true);
    $('.activities span[id="node"]').css('display','inline');
  }
  if ($('.activities input[name="express"]').is(':checked')) {
    $('label[name="js-frameworks"]').addClass('timeConflict');
    $('.activities input[name="js-frameworks"]').attr("disabled", true);
    $('.activities span[id="js-frameworks"]').css('display','inline');
  }
  if ($('.activities input[name="node"]').is(':checked')) {
    $('label[name="js-libs"]').addClass('timeConflict');
    $('.activities input[name="js-libs"]').attr("disabled", true);
    $('.activities span[id="js-libs"]').css('display','inline');
  }
  if (!act.is(':checked')) {
    removeConflicts(act);
  }
}

function removeConflicts(act) { // Remove error highlight, and checkbox disable for conflicting activities
  var nameAct = act.attr('name');
  switch (nameAct) {      
        case "js-frameworks":
            $('label[name="express"]').removeClass('timeConflict');
            $('.activities input[name="express"]').attr("disabled", false);
            $('.activities span[id="express"]').css('display','none');
            break;
        case "js-libs":
            $('label[name="node"]').removeClass('timeConflict');
            $('.activities input[name="node"]').attr("disabled", false);
            $('.activities span[id="node"]').css('display','none');
            break;
        case "express":
            $('label[name="js-frameworks"]').removeClass('timeConflict');
            $('.activities input[name="js-frameworks"]').attr("disabled", false);
            $('.activities span[id="js-frameworks"]').css('display','none');
            break;
        case "node":
            $('label[name="js-libs"]').removeClass('timeConflict');
            $('.activities input[name="js-libs"]').attr("disabled", false);
            $('.activities span[id="js-libs"]').css('display','none');
            break;
  }    
} 
function computeTotalCost() {  //Calculates total for activities selected
  var total = 0;
  if ($('.activities input[name="all"]').is(':checked')) {
    total += 200;
  }
  if ($('.activities input[name="js-frameworks"]').is(':checked')) {
    total += 100;
  }
  if ($('.activities input[name="js-libs"]').is(':checked')) {
    total += 100;
  }
  if ($('.activities input[name="express"]').is(':checked')) {
    total += 100;
  }
  if ($('.activities input[name="node"]').is(':checked')) {
    total += 100;
  }
  if ($('.activities input[name="build-tools"]').is(':checked')) {
    total += 100;
  }
  if ($('.activities input[name="npm"]').is(':checked')) {
    total += 100;
  }
  var totalCost = document.getElementById('totalCost');
  totalCost.innerHTML = "Total Cost - $" + total;

}

function checkPayment() { // Paypal, Bitcoin and Credit Card payments will display different messages
  var payment = $('#payment option[value]:selected').text(); 
  switch (payment) {      
        case "Credit Card":
            $('#credit-card').removeClass('displayNone');
            $('#credit-card').addClass('displayBlock');
            $('#paypal').addClass('displayNone');
            $('#bitcoin').addClass('displayNone');
            break;
        case "PayPal":
            $('#credit-card').addClass('displayNone');
            $('#bitcoin').addClass('displayNone');
            $('#paypal').removeClass('displayNone');
            $('#paypal').addClass('displayInline');
            break;
        case "Bitcoin":
            $('#credit-card').addClass('displayNone');
            $('#paypal').addClass('displayNone');
            $('#bitcoin').removeClass('displayNone');
            $('#bitcoin').addClass('displayInline');
            break;
  }    
}

