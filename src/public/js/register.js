const form = document.getElementById('registerForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/sessions/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result => {
        if(result.status===200){
            let count = 0
            let goToLogin = setInterval(() => {
                count++
                if(count === 1) {
                    alert("Registro exitoso, ahora puedes iniciar sesion")
                }
                if(count === 3) {
                    window.location.replace('/login');
                    clearInterval(goToLogin)
                }
            }, 1000);
        }else {
            alert("Error al registrarse" + result.status)
        }
    })
})