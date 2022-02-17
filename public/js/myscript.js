$.get("/gettopnavcart", (data)=>{
    if(!data.error){
        showCart(data.topNavCart, data.totalCartQuantity)
    }
})

let addBtn = document.querySelectorAll(".add-to-cart")
addBtn.forEach(btn=>{
    btn.addEventListener("click", function(){
        $.post("/addtocart", {productId: this.querySelector(".productId").innerHTML}, (data)=>{
            if(data.mode=="Successful"){
                showCart(data.topNavCart, data.totalCartQuantity)
                alert("Added")
            }else{
                console.log("Got here 1");
                alert("An error occured")
            }
        })
    })
})



function showCart(cart, quantity){
	$(".items-in-cart").remove()
	cart.forEach(element=>{
		var htm = '<div class="dropdown-item d-flex align-items-start items-in-cart" href="#">'
	    	+'<div class="img" style="background-image: url('+element.productId.imageurl+');"></div>'
	    	+'<div class="text pl-3">'
	    		+'<h4>'+element.productId.title+'</h4>'
	    		+'<p class="mb-0"><a href="#" class="price">$'+element.productId.unitprice+'</a><span class="quantity ml-3">Quantity: 0'+element.quantity+'</span></p>'
	    	+'</div>'
	    +'</div>'
		$(".parent-cart").prepend(htm);
	})
    document.getElementById("totalCart").innerHTML = quantity
}



let closeBtnArray = document.querySelectorAll(".close-cart")
closeBtnArray.forEach(btn=>{
    btn.addEventListener("click", function(e){
        let parentElement = this.parentElement.parentElement
        let cartProductId = parentElement.querySelector(".productIdTab .cartProductId")
        let qty = parentElement.querySelector(".productQuantity .input-group .quantity")

        
        $.post("/deletefromcart", {productId: cartProductId.value}, (data)=>{
            if(data.mode==="Successful"){
                if(qty.value>1){
                    qty.value = qty.value - 1
                    this.setAttribute("data-dismiss", "")
                }else if(qty.value==1){
                    this.setAttribute("data-dismiss", "alert")
                    $(this).click();
                }
                let totalProductPrice = parentElement.querySelector(".productUnitPrice").innerHTML.substring(1) * qty.value
                parentElement.querySelector(".productTotalPrice").innerHTML = `$${totalProductPrice}`
                
                let totalCartPrice = 0;
                document.querySelectorAll(".productTotalPrice").forEach(e=>{
                    totalCartPrice = +e.innerHTML.substring(1) + totalCartPrice
                })
                $(".subTotalCartValue").text(`$${totalCartPrice}.00`)
                $(".totalCartValue").text(`$${totalCartPrice}.00`)
            }else{
                alert("An error Occured")
            }
        })
    })
})




document.querySelector(".create-order").addEventListener("click", (e)=>{
    document.getElementById('create-order').submit();
})