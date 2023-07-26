var sum = function (acc, x) { return acc + x; };

var formatter = function (price) {
  var original = String(price);
  var splitArray = original.split('.');
  var whole = splitArray[0];
  var change;
  if (splitArray.length < 2) {
    change = "00";
  } else if (splitArray[1].length < 2) {
    change = splitArray[1] + '0';
  } else {
    change = splitArray[1];
  }
  
  return `${whole}.${change}`;
}

var updateSubtotalAndTotal = function () {
  var subtotalsValues = [];

  var updateSubtotal = function (ele) {
    var price = parseFloat($(ele).children('.price').text().slice(1));
    var qty = parseFloat($(ele).find('.qty input').val());

    var subtotal = price * qty;
    $(ele).children('.itemSub').html(`$${formatter(subtotal.toFixed(2))}`);

    return subtotal;
  }  

  $('tbody tr').each(function (i, ele) {
    var subtotal = updateSubtotal(ele);
    subtotalsValues.push(subtotal);

    var cartTotal = formatter(subtotalsValues.reduce(sum).toFixed(2));
    $('#cartTotal').html(cartTotal);
    });
}

$(document).ready(function () {
  updateSubtotalAndTotal();

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updateSubtotalAndTotal();
    if ($('tbody tr').length === 0) {
      $('#cartTotal').html(0);
    }
  });

  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateSubtotalAndTotal();
    }, 500);
  });

  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    var newItem = $(this).children('#newItem').val();
    var newPrice = formatter($(this).children('#newItemPrice').val());
    
    $('tbody').append('<tr>' + 
      '<td class="item">' + newItem + '</td>' +
      '<td class="price">$' + newPrice + '</td>' + 
      '<td class="qty"><strong>QTY</strong><input type="number" value="0"/><button class="btn btn-light btn-sm remove">Remove</button></td>' + 
      '<td class="itemSub"></td>' + 
      '</tr>');

    $(this).children(' [name=item] ').val('');
    $(this).children(' [name=price] ').val('');  
    updateSubtotalAndTotal();
  });
});