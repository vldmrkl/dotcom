$(() => {
  $('.internal-link').on('click', function (event) {
    event.preventDefault();

    // smoothly slide to the position of the link's destination
    $('html, body').animate(
      {
        scrollTop: $($.attr(this, 'href')).offset().top - 70,
      },
      700,
    );
  });
  $('.alert').alert();

  $('.card-face').on('click', function (event) {
    $(this).fadeOut('fast');
    $(this).next('.card-back').fadeIn('slow');
  });

  $('.card-back').on('click', function (event) {
    $(this).fadeOut('fast');
    $(this).prev('.card-face').fadeIn('slow');
  });
});
