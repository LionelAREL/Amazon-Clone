export function cartQuantity(cart:any){
    let total = 0;
    for(let i = 0;i<cart.length;i++){
        total+=cart[i].quantity;
    }
    return total;
}