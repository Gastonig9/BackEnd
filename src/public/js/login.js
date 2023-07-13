const form = document.getElementById('loginForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const objData = {};
    data.forEach((value,key)=>objData[key]=value);
    fetch('/api/sessions/login',{
        method:'POST',
        body:JSON.stringify(objData),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            window.location.replace('/products');
        }
    })
}) 