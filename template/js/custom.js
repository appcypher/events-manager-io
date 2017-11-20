$(document).ready(() => {
  // FABs
  $('.io-fab').click(() => {
    $('#fab-group').toggle('hide'); // toggle added animation. weird, but nice. :D
  });

  $('#fab-1').click(() => {
    $('#add-event-modal').removeClass('hide');
  });

  $('#fab-2').click(() => {
    $('#add-center-modal').removeClass('hide');
  });

  // ADD CENTER MODAL
  $('#add-center-submit').click(() => {
    $('#add-center-modal').addClass('hide');
  });

  $('#add-center-cancel').click(() => {
    $('#add-center-modal').addClass('hide');
  });

  // $('.io-modal').click((e) => { // TODO
  //   if (e.target !== this) return;
  //   $('#add-center-modal').addClass('hide');
  //   alert('clicked io-modal!')
  // });

  // VIEW CENTER MODAL
  $('.io-center-card').click(() => {
    $('#view-center-modal').removeClass('hide');
  });

  $('#view-center-ok').click(() => {
    $('#view-center-modal').addClass('hide');
  });

  // ADD EVENT MODAL
  $('#add-event-submit').click(() => {
    $('#add-event-modal').addClass('hide');
  });

  $('#add-event-cancel').click(() => {
    $('#add-event-modal').addClass('hide');
  });
  
  // OPEN PAGE BUTTONS 
  $('#login-button').click(() => {
    location.href = 'discover.html';y
  });

  $('#signup-button').click(() => {
    location.href = 'discover.html';
  });

  
  // DROPDOWNS
  function settingsDropdownTimeout() {
    if (!$('#settings').is(':hover') && !$('#settings-dropdown').is(':hover')) {
      $('#settings-dropdown').addClass('hide');
    }
  }

  function notificationsDropdownTimeout() {
    if (!$('#notifications').is(':hover') && !$('#notifications-dropdown').is(':hover')) {
      $('#notifications-dropdown').addClass('hide');
    }
  }
  
  $('#settings').hover(
    () => { $('#settings-dropdown').removeClass('hide'); },
    () => { setTimeout(settingsDropdownTimeout, 500); },
  );
  
  $('#settings-dropdown').hover(
    () => { $('#settings-dropdown').removeClass('hide'); },
    () => { setTimeout(settingsDropdownTimeout, 500); },
  );
  
  $('#notifications').hover(
    () => { $('#notifications-dropdown').removeClass('hide'); },
    () => { setTimeout(notificationsDropdownTimeout, 500); },
  );

  $('#notifications-dropdown').hover(
    () => { $('#notifications-dropdown').removeClass('hide'); },
    () => { setTimeout(notificationsDropdownTimeout, 500); },
  );
});


