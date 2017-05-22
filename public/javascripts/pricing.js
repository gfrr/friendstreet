$(document).ready(()=>{


  $('body').on('change', '#radius', function () {
    if ($('#radius').val() === 'short') {
      $('#priceRadius').replaceWith("<p>€1.00</p>");
    }
    if ($('#radius').val() === 'medium') {
      $('#priceRadius').replaceWith("<p>€2.00</p>");
    }
    if ($('#radius').val() === 'long') {
      $('#priceRadius').replaceWith("<p>€3.00</p>");
    }
  });


  $('body').on('change', '#size', function () {
    if ($('#size').val() === 'small') {
      $('#priceSize').replaceWith("<p>€1.00</p>");
    }
    if ($('#size').val() === 'medium') {
      $('#priceSize').replaceWith("<p>€2.00</p>");
    }
    if ($('#size').val() === 'large') {
      $('#priceSize').replaceWith("<p>€3.00</p>");
    }
  });

  $('body').on('change', '#duration', function () {
    if ($('#duration').val() === 'small') {
      $('#priceDuration').replaceWith("<p>€1.00</p>");
    }
    if ($('#duration').val() === 'medium') {
      $('#priceDuration').replaceWith("<p>€2.00</p>");
    }
    if ($('#duration').val() === 'large') {
      $('#priceDuration').replaceWith("<p>€3.00</p>");
    }
  });

});
