$(document).ready(function() {
    $('.row').each(function(i, elem) {
        $(elem)
            .find('.data-item')   // Only children of this row
            .matchHeight({byRow: false}); // Row detection gets confused so disable it
    });
});
