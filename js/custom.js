jQuery(document).ready(function(){
   'use strict';
//============================== CLOSE DROPDOWN SELECT =========================
  $('.ed-datepicker input.form-control').focus(function() {
    $('.sbOptions').css('display', 'none');
  });

  $('.ed-datepicker').datepicker({
  format: 'dd/mm/yyyy',
  autoclose: true,
  orientation: 'top auto',
  todayBtn: 'linked',
  todayHighlight: true
  });

//============================== ALL DROPDOWN ON HOVER =========================
  $('.dropdown').hover(function() {
    $(this).addClass('open');
  },
  function() {
    $(this).removeClass('open');
  });

//============================== Rs-Slider =========================
  jQuery('.fullscreenbanner').revolution({
   delay: 5000,
   startwidth: 1170,
   startheight: 745,
   fullWidth: 'on',
   fullScreen: 'off',
   hideCaptionAtLimit: '',
   dottedOverlay: 'twoxtwo',
   navigationStyle: 'preview4',
   fullScreenOffsetContainer: '',
   hideTimerBar:'on'
  });

//============================== CHANGE HEADER ON MOUSE SCROLL =========================
  var header = $('.changeHeader .navbar-fixed-top');
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if ((scroll >= 1) && ($('.navbar-default').hasClass('navbar-main')))
    {
      header.addClass('lightHeader');
    }
    else if ($('.navbar-default').hasClass('static-light'))
    {
      header.addClass('lightHeader');
    }
    else {
      header.removeClass('lightHeader');
    }

  });

//============================== SELECT BOX =========================
  $('.select-drop').selectbox();

//============================== Date-picker =========================
  $('.datepicker').datepicker({
    startDate: 'dateToday',
    autoclose: true
  });

//============================== COUNTER-UP =========================
  $(document).ready(function ($) {
    $('.counter').counterUp({
      delay: 10,
      time: 2000
    });
  });

//============================== PRICE SLIDER RANGER =========================
  jQuery(document).ready(function() {
    var minimum = 20;
    var maximum = 300;

    $( '#price-range' ).slider({
      range: true,
      min: minimum,
      max: maximum,
      values: [ minimum, maximum ],
      slide: function( event, ui ) {
        $( '#price-amount-1' ).val( '$' + ui.values[ 0 ] );
        $( '#price-amount-2' ).val( '$' + ui.values[ 1 ] );
      }
    });

    $( '#price-amount-1' ).val( '$' + $( '#price-range' ).slider( 'values', 0 ));
    $( '#price-amount-2' ).val( '$' + $( '#price-range' ).slider( 'values', 1 ));
  });

//============================== ACCORDION OR COLLAPSE ICON CHANGE =========================

  var allIcons = $('.singlePackage .panel-heading i.fa');
  $('.singlePackage .panel-heading').click(function(){
   allIcons.removeClass('fa-minus').addClass('fa-plus');
   $(this).find('i.fa').removeClass('fa-plus').addClass('fa-minus');
  });

  var allIconsOne = $('.accordionWrappar .panel-heading i.fa');
  $('.accordionWrappar .panel-heading').click(function(){
   allIconsOne.removeClass('fa-minus').addClass('fa-plus');
   $(this).find('i.fa').removeClass('fa-plus').addClass('fa-minus');
  });

  var allIconsExtra = $('.solidBgTitle .panel-heading i.fa');
  $('.solidBgTitle .panel-heading').click(function(){
   allIconsExtra.removeClass('fa-minus').addClass('fa-plus');
   $(this).find('i.fa').removeClass('fa-plus').addClass('fa-minus');
  });

  var allIconsTwo = $('.accordionSolidTitle .panel-heading i.fa');
  $('.accordionSolidTitle .panel-heading').click(function(){
   allIconsTwo.removeClass('fa-arrow-circle-up').addClass('fa-arrow-circle-down');
   $(this).find('i.fa').removeClass('fa-arrow-circle-down').addClass('fa-arrow-circle-up');
  });

  var allIconsThree = $('.accordionSolidBar .panel-heading i.fa');
  $('.accordionSolidBar .panel-heading').click(function(){
    allIconsThree.removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
    $(this).find('i.fa').removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');
  });

//============================== SELECT OPEN ACCORDION ITEM TITLE =========================
  $(document).ready(function() {
    $('.accordionWrappar .panel-collapse, .accordionSolidTitle .panel-collapse, .accordionSolidBar .panel-collapse').on('show.bs.collapse', function () {
      $(this).siblings('.panel-heading').addClass('active');
      $(this).addClass('active');
    });

    $('.accordionWrappar .panel-collapse, .accordionSolidTitle .panel-collapse, .accordionSolidBar .panel-collapse').on('hide.bs.collapse', function () {
      $(this).siblings('.panel-heading').removeClass('active');
      $(this).removeClass('active');
    });
  });

//============================== COUNT DOWN =========================
  $('#simple_timer').syotimer({
    year: 2017,
    month: 5,
    day: 9,
    hour: 20,
    minute: 30
  });
  //============================== QUANTITY =========================

  $('.incr-btn').on('click', function(e) {
      var $button = $(this);
      var oldValue = $button.parent().find('.quantity').val();
      $button.parent().find('.incr-btn[data-action=decrease]').removeClass('inactive');
      if ($button.data('action') === 'increase') {
          var newVal = parseFloat(oldValue) + 1;
      } else {
       // Don't allow decrementing below 1
          if (oldValue > 1) {
              var newVal = parseFloat(oldValue) - 1;
          } else {
              newVal = 1;
              $button.addClass('inactive');
          }
      }
      $button.parent().find('.quantity').val(newVal);
      e.preventDefault();
  });
});
