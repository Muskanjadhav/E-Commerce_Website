    let user = JSON.parse(sessionStorage.user || null);

window.onload = () => {
    if(user == null){
        location.replace('/login')
    }
}
let editables = [...document.querySelectorALL('*[contenteditable="true"]')];

editables.map((element) =>{
    let placeholder = element.getAttribute('data-placeholder');
    element.innerHTML = placeholder;
    element.addEventlistener('focus', () =>{
        if(element.innerHTML === placeholder){
            element.innerHTML = '';
        }
    })
    element.addEventlistener('focusout', () => {
        if(!element.innerHTML.length){
            element.innerHTML = placeholder;
        }

    })
})
