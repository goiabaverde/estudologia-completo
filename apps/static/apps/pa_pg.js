// Functions to make the algorith of the product of n terms in PG works

function find_element_3(n){
    let result = (n-3)/4
  return  result % 1 != 0?  false : true  
}

function find_element_4(n){
    let result = (n-4)/4
  return  result % 1 != 0?  false : true  
}

function find_element_5(n){
    let result = (n-5)/4
  return  result % 1 != 0?  false : true  
}

function find_element_6(n){
    let result = (n-6)/4
  return  result % 1 != 0?  false : true  
}



// Tha pa function will create the progression
function pa(event_target){
// Check if the original submit btn has been clicked
    
    if(event_target.value == 'new_progression'){
        document.querySelector('.result_area').innerHTML = '';
        localStorage.setItem('qtd', 0)
    }

    try{
        document.querySelector('#more_btn').remove()
    }catch (e){
        console.log(e)
    }

    if(parseInt(localStorage.getItem('qtd')) == 0){ 
        document.querySelector('.result_area').innerHTML = ''  
    }

// Get the data
    var a1 = parseFloat(document.querySelector('#a1').value)
    var r = parseFloat(document.querySelector('#r').value)

// Check if all the inputs are correct filled
     if( !a1 || !r ){
        window.alert("Todos os inputs devem ser preenchidos!")
        return 1
     }
     document.querySelector('.result_area').style.display = 'flex';
     
// Loop to define the an terms
    for(var i = 1*(parseInt(localStorage.getItem('qtd'))+1); i <= 10 + (parseInt(localStorage.getItem('qtd'))); i++){
        var an = (a1 + ((i-1)*r))
        an = an % 1 != 0? parseFloat(an.toFixed(2)) : an
        const div = document.createElement('div')
        div.className = 'element'
        div.setAttribute('title', `a${i}`)
        try{
            div.innerText = an.replace('.',',')
        }catch{
            div.innerText = an
        }

        document.querySelector('.result_area').append(div)
        if((i % 10) == 0 && (i / 10) % 1 == 0){
            let temp = parseInt(localStorage.getItem('qtd'))
            localStorage.setItem('qtd', temp + 10)
            const more_btn= document.createElement('i')
            more_btn.id = 'more_btn'
            more_btn.className = 'fa-solid fa-plus'

// Add the event listener to the new more_btn
            document.querySelector('.result_area').append(more_btn)
            more_btn.addEventListener('click', event=>{
                event_target = event.target
                pa(event_target)
            })
            break
            }
        }

        document.querySelector('.operation_input').style.display = 'block';
        let username = document.querySelector('#is_authenticated').value
// Add the data to the historic if the user is logged and the event that trigger wasn't the more_btn
        if(username != 'not_logged' && event_target != 'more_btn'){
            let add_to_model = async function (){
                await fetch(`http://127.0.0.1:8000/apps/add`,{
                 method: 'post',
                 headers: {"X-CSRFToken" : getCookie('csrftoken')},
                 body: JSON.stringify({
                     type: document.querySelector('[name="type"]').value,
                     var1: document.querySelector('[name="var1"]').value,
                     var2: document.querySelector('[name="var2"]').value
                 })
                })
            
             }
              add_to_model()
        }
    }


// sum_pa function will create the sun of n elements ussng the equation Sn
function sum_pa(){
     var a1 = parseFloat(document.querySelector('#a1').value)
     var r = parseFloat(document.querySelector('#r').value)
     var n = document.querySelector('#sum').value
     if(n < 0){
        window.alert("O enésiomo termo precisa ser maior ou igual a 0")
        document.querySelector('#sum').value = 0
        return 1
     }
     let s  = ((a1+ (a1+(n-1)*r) )*n)/2
     s = s % 1 != 0? s.toFixed(2) : s
     document.querySelector('.operation_result').innerHTML = `<p class='p_operation_result' id='p_operation_result_pa'>The sum is ${s}</p>`
     document.querySelector('.p_operation_result').style.display= 'block';
}


// PG CODE

function pg(event_target){
// Check if the original submit brn has been clicked

    if(event_target.value == 'new_progression'){
        document.querySelector('.result_area').innerHTML = '';
        localStorage.setItem('qtd', 0)
    }

// If is possible, the more btn will be removed
    try{
        document.querySelector('#more_btn').remove()
    }catch (e){
        console.log(e)
    }

// If the value in qtd is zero it's to do another progression so the result is removed
    if(parseInt(localStorage.getItem('qtd')) == 0){ 
        document.querySelector('.result_area').innerHTML = ''
    }

// Get the data
    var a1 = parseFloat(document.querySelector('#a1').value)
    var q = parseFloat(document.querySelector('#q').value)
// Check if some input is null
    if( !a1 || !q ){
        window.alert("Os inputs precisam ser preenchidos!")
        return 1
    }
    document.querySelector('.result_area').style.display = 'flex';
    

//For loop to do the progression
    for(var i = 1*(parseInt(localStorage.getItem('qtd'))+1); i <= 10 + (parseInt(localStorage.getItem('qtd'))); i++){
        var an = ((a1)*q**(i-1))
        an = an % 1 != 0? an.toFixed(2) : an
        const div = document.createElement('div')
        div.className = 'element'
        div.setAttribute('title', `a${i}`)
        try{
            div.innerText = an.replace('.',',')
        }catch{
            div.innerText = an
        }
        document.querySelector('.result_area').append(div)
        if((i % 10) == 0 && (i / 10) % 1 == 0){
            // Update the qtd
            let temp = parseInt(localStorage.getItem('qtd'))
            localStorage.setItem('qtd', temp + 10)
            const more_btn= document.createElement('i')
            more_btn.id = 'more_btn'
            more_btn.className = 'fa-solid fa-plus'
            document.querySelector('.result_area').append(more_btn)
            more_btn.addEventListener('click', event=>{
                event_target = event.target
                pg(event_target)
            })
            break
            }
        }

        let operations_inputs =  document.querySelectorAll('.operation_input')
        operations_inputs.forEach(input=>{
            input.style.display = 'block'
        })

        let username = document.querySelector("#is_authenticated").value

        if(username != 'not_logged' && event_target != 'more_btn'){
            let add_to_model = async function(){
                await fetch("http://127.0.0.1:8000/apps/add", {
                    method:'post',
                    headers: {'X-CSRFToken' : getCookie('csrftoken')},
                    body: JSON.stringify({
                        type: document.querySelector('[name="type"]').value,
                        var1: document.querySelector('[name="var1"]').value,
                        var2: document.querySelector('[name="var2"]').value
                    })
                })
            }
            add_to_model()
        }    
}

// This function returns the sum of n terms in a PG
function sum_pg(){
    var a1 = parseFloat(document.querySelector('#a1').value)
    var q = parseFloat(document.querySelector('#q').value)
    var n = document.querySelector('#sum').value
    if(n < 0){
        window.alert("O enésimo termo precisa set maior ou igual a 0.")
        return 1
    }
    let s = q == 1? a1*n : (a1*((q**n)-1))/(q-1)
    s = s % 1 != 0? s.toFixed(2) : s 
    document.querySelector('#sum_result').innerHTML = `<p class='p_operation_result' id=''>A soma é ${s}</p>`
    document.querySelector('.p_operation_result').style.display= 'block';
}

// This function returns the product of n terms in a PG
function pro_pg(){
    var a1 = parseFloat(document.querySelector('#a1').value)
    var q = parseFloat(document.querySelector('#q').value)
    var n = document.querySelector('#pro').value
    if(n < 0){
        window.alert("O enésimo termo precisa set maior ou igual a 0.")
        return 1
    }
    var an = a1*(q**(n-1))
    var p = Math.sqrt((a1*an)**n)
    if(q == 1){
        if(a1 > 0){p = a1**n}
        else{
            p = a1**n
            p = n % 2 == 0? p : p*-1
        }
    }if( q < 0 && a1 > 0){
        if(n == 2){p = p*-1}
        else{ p = n % 2 == 0? p : p*-1}
    } 
    if(q < 0 && a1 < 0){
        if(n == 2){p = -1*p}
        else if(find_element_3(n) || find_element_4(n)){p = p}
        else if(find_element_5(n) || find_element_6(n)){p = p*-1}
    }
    if(a1 < 0 && q > 0){
        p = n % 2 == 0? p : p*-1  
    }
    if(n == 1){
        p = a1
    }
    document.querySelector('#pro_result').innerHTML = `<p class='p_operation_result' id='p_operation_result_pg'>O produto é ${p}</p>`
    document.querySelector("#p_operation_result_pg").style.display= 'block';
}

// Adding the listener to active the functions without using window.event.target, because event is deprecated
// Listener to PA and PG
document.addEventListener("DOMContentLoaded", ()=>{
    try{
        var submit_btn = document.querySelector('#submit_btn')
        if(submit_btn.dataset.mode == 'pa'){
            submit_btn.addEventListener("click", event=>{
                event_target = event.target
                pa(event_target)
            })
        }else{
            submit_btn.addEventListener("click", event=>{
                event_target = event.target
                pg(event_target)
            })
        }
    }catch (e){console.log(e)}   
})