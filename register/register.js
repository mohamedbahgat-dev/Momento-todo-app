
let validation = false

//username validation
const username = document.getElementById('name')
username.addEventListener('change', function(e){

    const userValidate = document.getElementById('user-validate')
    if(e.target.value.indexOf(' ') >= 0){
        userValidate.textContent = 'username can not have a space'
        userValidate.style.display = 'block'
        validation = false

    }else {
        userValidate.style.display = 'none'
        validation = true
       
    }
    
})

// email validate
const email = document.getElementById('email')
email.addEventListener('change', function(e){

    const emailValidate = document.getElementById('email-validate')
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(!regex.test(e.target.value)){
        emailValidate.textContent = 'invalide email address'
        emailValidate.style.display = 'block'
        validation = false

    }else {
        emailValidate.style.display = 'none'
        validation = true
    }

})

//password validation
const confirmPassword = document.getElementById('confirm-password')
const password = document.getElementById('password')
confirmPassword.addEventListener('change', function(e){

    const password = document.getElementById('password')
    const passwordValidate = document.getElementById('password-validate')
    if(confirmPassword.value != password.value){
        passwordValidate.textContent = "password and confirm password didn't match"
        passwordValidate.style.display = 'block'
        validation = false
        
    }else {
         passwordValidate.style.display = 'none'
         validation = true
    }
})


// submit form 
const registration = document.querySelector('.registration')
registration.addEventListener('submit', function(e){
    e.preventDefault()
    
    if(validation){

        if(localStorage.getItem('apiToken') === null){
            localStorage.setItem('apiToken',JSON.stringify({username:username.value,
                                                            email:email.value,
                                                            password:password.value}))
            window.location.href = '../home/home.html'                                             

        }else{
            let apiToken = JSON.parse(localStorage.getItem('apiToken'))
            if(apiToken.email === email.value){
                
                const tokenAlert = document.querySelector('.token-alert')
                tokenAlert.textContent = 'The email address is registered before, sign in instead.'                 
            }        
    }  
}})
