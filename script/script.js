$(document).ready(function() {
  var populated = false;
   var unitPrice =0;
  // var totalPrice = parseInt($(".total-price").text());
  $(".product-table tr").click(function() {


    var clickedItemId = $(this).children("th").text();



    $(".cart-table tbody tr").each(function(){
        if (clickedItemId == $(this).children("th").text()) 
        {
            var existingQuantity = $(this).children("td:eq(1)").text();
            var increasedQuantity = parseInt(existingQuantity);
             increasedQuantity ++;
            $(this).children("td:eq(1)").children("span").text(increasedQuantity); 
            updatePrice();
            populated = true;
            
        }

    })
if(populated == false) {
 $(".product-table tbody tr").each(function() {
     if (clickedItemId == $(this).children("th").text()) 
      {
        var rows = "";
        var cartId = $(this).children("th").text();
        var cartName = $(this).children("td:first").text();
        var cartQuantity = 1;
        var cartPrice = $(this).children("td:last").text();
        rows += "<tr><th>" +cartId +"</th><td>"+cartName +"</td><td><i class='fa fa-minus'></i><span>" +cartQuantity +"</span><i class='fa fa-plus'></i></td><td>" +cartPrice +"</td></tr>";
        $(rows).appendTo(".cart-table tbody");
        updatePrice();
      }
    });
}
populated = false; 

 
});



$(document).on("click",".cart-table td .fa-plus", function() {
  var existingQuantity = $(this).siblings("span").text();
  var increasedQuantity = parseInt(existingQuantity);
  increasedQuantity ++;
  $(this).siblings("span").text(increasedQuantity); 


  updatePrice();
})


$(document).on("click",".cart-table td .fa-minus", function() {
 var existingQuantity = $(this).siblings("span").text();
 var decreasedQuantity = parseInt(existingQuantity);
  if(decreasedQuantity > 1)
   decreasedQuantity --;
 else 
  $(this).remove();
  $(this).siblings("span").text(decreasedQuantity); 


  updatePrice();
})


function updatePrice() {
 totalPrice = 0;
 
  
  $(".cart-table tbody tr").each(function(){
    var newQuantityValue = parseInt($(this).children("td:eq(1)").text());
    unitPrice = getUnitPrice(this);
    var newUpdatedProductPrice = unitPrice*newQuantityValue;
     $(this).children("td:last").text(newUpdatedProductPrice);

  totalPrice += newUpdatedProductPrice  
  })

$('.total-price').text(totalPrice);
}



function getUnitPrice(element) {
 var tableId = $(element).children("th").text();
  
  $(".product-table tbody tr").each(function() {
     if (tableId == $(this).children("th").text()) 
      {
       price = parseInt($(this).children("td:last").text());
      }
    });
  return (price); 
}
});

