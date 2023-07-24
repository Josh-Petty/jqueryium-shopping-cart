var sum = function (acc, x) { return acc + x; };

var updateSubtotal = function (ele) {
  var price = parseFloat($(ele).children('.price').text());
    var qty = parseFloat($(ele).find('.qty input').val());

    var subtotal = price * qty;
    $(ele).children('.itemSub').html(subtotal);

    return subtotal;
}

$(document).ready(function () {
  var subtotalsValues = [];

  $('tbody tr').each(function (i, ele) {
    var subtotal = updateSubtotal(ele);
    subtotalsValues.push(subtotal);
    console.log(subtotalsValues);

    var cartTotal = subtotalsValues.reduce(sum);
    $('#cartTotal').html(cartTotal);
  });
});