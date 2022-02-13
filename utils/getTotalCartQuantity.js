module.exports = (arr)=>{
        let totalCartQuantity = 0;
        arr.forEach(product => {
            totalCartQuantity = totalCartQuantity + product.quantity
        });
        return totalCartQuantity;
}