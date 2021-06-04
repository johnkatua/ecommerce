export const addItem = (product, next) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      // JSON.parse() is used to convert json to object
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.push({
      ...product,
      count: 1
    });
    // the method removes any duplicates
    // an array is build using the new Set and it converted back to an array using Array.from method so that it can be re-mapped
    // new Set only allow unique values in it, so you pass ids of each product
    // If the loop tries to add the similar product it will be ignored
    // The first map function returns an array of it and when we run it on the second map it returns the actual product from the cart
    cart = Array.from(new Set(cart.map((p) => {
      return p._id;
    }))).map((id) => {
      return cart.find((p) => {
        return p._id === id;
      })
    });
    // JSON.stringify() is used to convert object to json
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};;

export const totalProducts = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')).length;
    }
  }
  return 0;
}