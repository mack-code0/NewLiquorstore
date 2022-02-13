let cartItems = document.getElementById("totalCart")
let addBtn = document.querySelectorAll(".add-to-cart")
addBtn.forEach(btn=>{
    btn.addEventListener("click", function(){
        $.post("/addtocart", {productId: this.querySelector(".productId").innerHTML}, (data)=>{
            if(data.mode=="Successful"){
                cartItems.innerHTML = data.totalCartQuantity
                showCart(data.topNavCart)
                alert("Added")
            }else{
                alert("An error occured")
            }
        })
    })
})

function showCart(response){
	$(".items-in-cart").remove()
	response.forEach(element=>{
		var htm = '<div class="dropdown-item d-flex align-items-start items-in-cart" href="#">'
	    	+'<div class="img" style="background-image: url('+element.productId.imageurl+');"></div>'
	    	+'<div class="text pl-3">'
	    		+'<h4>'+element.productId.title+'</h4>'
	    		+'<p class="mb-0"><a href="#" class="price">$'+element.productId.unitprice+'</a><span class="quantity ml-3">Quantity: '+element.quantity+'</span></p>'
	    	+'</div>'
	    +'</div>'
		$(".parent-cart").prepend(htm);
	})
}