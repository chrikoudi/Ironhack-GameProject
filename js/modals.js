var modalText = "";

$('#rollDice').click(function() {

  modalText = modalText.removeClass('hidden');
  $('#dice_modal_text').html(modalText);
});

$('.dice_modal_close').click(function() {
  $('.modal_background').addClass('hidden');
});
