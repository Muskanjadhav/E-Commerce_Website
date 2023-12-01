let ratingStarInput = [...document.querySelectorAll('.rating-star')];

ratingStarInput.map((star, index) => {
    star.addEventListener('click', () =>
    {
        for(let i=0; i<5; i++){
            if(i<=index){
                ratingStarInput[i].src = 'img/fill star.png';
            } else{
                ratingStarInput[i].src = 'img/no fill star.png'
            }
        }
    })
})

function Send(){
    // console.log("test function");
    var reviewhead = document.getElementById("reviewhead").value;
    var review = document.getElementById("review").value;

    let body = "reviewhead:" + reviewhead + "<br/> review:" + review;
    // console.log(body);

    Email.send({
        SecureToken : " 65e9302b-d6b9-46e5-b04b-76b8ef1ca93b", 
        To : 'muskanjadhav03@gmail.com',
        From : "muskanjadhav03@gmail.com",
        Subject : "This is the subject",
        Body : body
    }).then(
        message => {
                if(body!=null)
            {
                swal("Successful", "Your Data Successfull Received", "success");
            }
            else {
                swal("Something Wrong", "Your Data is not Received", "error");
            }
        }
        );
}