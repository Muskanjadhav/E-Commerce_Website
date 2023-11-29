window.onload=() => {
    if(!sessionStorage.user){
        location.replace('/login')
    }
    if(location.search.includes('payment=done')){
        let items = [];
        localStorage.setItem('cart', JSON.stringify(items));
        showFormError("order is placed")
    }
}

const placeOrderBtn = document.querySelector('.place-order-btn');

placedOrderBtn.addEventListener('click', () =>{
    let address = getAddress();

    // send data to backened
    fetch('/stripe-checkout', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            items: JSON.parse(localStorage.getItem('cart')),
            address: address,
            email: JSON.parse(sessionStorage.user).email
        })
    })
    .then(res => res.json())
    .then(url =>{
        location.href = url
    })
    .catch(err => console.log(err
        ))




})

const getaddress = () => {
    let address = document.querySelector('#address').value;
    let street = document.querySelector('#street').value;
    let city = document.querySelector('#city').value;
    let pincode = document.querySelector('#pincode').value;
    let state = document.querySelector('#state').value;
    let landmark = document.querySelector('#landmark').value;
}

if(!address.length || !street.length || !city.length || !state.length || !pincode.length || !landmark.length){
    return showFormError("fill all the inputs");
}else€{
    return{ address, street, city, state, pincode, landmark}
}
