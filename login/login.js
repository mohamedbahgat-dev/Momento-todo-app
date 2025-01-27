
// get email and password elements 

const email = document.getElementById('email')
const password = document.getElementById('password')
const tokenNotice = document.querySelector('.token-notice')


const signin = document.querySelector('.login')
signin.addEventListener('submit', function(e){

    e.preventDefault()
    
    if(localStorage.getItem('apiToken') === null){
        tokenNotice.textContent = "you didn't registred before, please register."
                        
        }else{
            let apiToken = JSON.parse(localStorage.getItem('apiToken'))
            if(apiToken.email === email.value && apiToken.password === password.value){
                window.location.href = '../home/home.html'       
            }else if (apiToken.password !== password.value ||apiToken.email !== email.value ){
                tokenNotice.textContent = "wrong email or password, Please try again."

            }
        
    }

})