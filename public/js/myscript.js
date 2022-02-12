let cartItems = document.getElementById("totalCart")
let addBtn = document.querySelectorAll(".add-to-cart")
addBtn.forEach(btn=>{
    btn.addEventListener("click", function(){
        $.post("/addtocart", {productId: this.querySelector(".productId").innerHTML}, (data)=>{
            if(data.mode=="Successful"){
                cartItems.innerHTML = data.totalCartQuantity
                alert("Added")
            }else{
                alert("An error occured")
            }
        })
    })
})

// function updateTotalCart(){
//     cartNumber.inn
// }