try{
    const { matrix, create, wienDisplacementDependencies } = require("mathjs")
    const { values } = require("regenerator-runtime")
}catch (e){
    console.log(e)
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function change_width(event_target){
    let current_class = event_target.className;
    var inputs = document.querySelectorAll(`.${current_class}`)
    //check witch value is higher
    var lengths = []
    inputs.forEach(input=>{
        lengths.push(parseInt(input.value.length))
    })
    if(Math.max(...lengths) > event_target.value.length){
        return 0
    }else{
    var new_width = (event_target.value.length * 8)  + 40;
    inputs.forEach(input =>{
        input.style.width = `${new_width}px`
    }) 
    
    try{
        if(event_target.length )
        if(event_target.length > 8){
            
            event_target.parentElement.style.width = `${(event_target.value.length * 8) + 250}px`
        }
    }catch (e){console.log(e)}
}
}



async function edit(id){
    const new_id = parseInt(id)
    const response = await fetch(`http://127.0.0.1:8000/apps/editar/${new_id}`)
    window.location.href = `${response.url}`;
}

async function remove(id){
    document.querySelector(`#id_${id}`).remove()
    await fetch(`http://127.0.0.1:8000/apps/remover/${parseInt(id)}`)
}

async function edit_matrix(id){
    console.log(id)
    const response = await fetch(`http://127.0.0.1:8000/apps/editar/matriz/${parseInt(id)}`)
    const data = await response.json()
    console.log(data)
    if(data.determinant){
        $("body").load("http://127.0.0.1:8000/apps/determinant", function(){
            console.log("DETERMINANT")
            console.log("JQuery")
            select_grid(data.number_rows_a)
            document.querySelector('#grid_select').value = data.number_rows_a
            let string  = data.matrix_a
            let matrix = JSON.parse(string)
            for(var i = 0; i < matrix.length; i++){
                for(var j = 0; j < matrix[0].length; j++){
                   document.querySelector(`#item-${matrix.length}x${matrix[0].length}-${i + 1}_${j + 1}`).value = matrix[i][j]
                }
            }
            // Reset the class of the body to avoid problemns of the change_theme
            document.querySelector('body').className = ''
            if(localStorage.getItem('theme') == 'dark'){
                change_theme('light')
            }
        });
       
    }else{
        $("body").load("http://127.0.0.1:8000/apps/produto", function(){
           document.querySelector('#row_a').value = parseInt(data.number_rows_a)
           document.querySelector('#co_a').value = parseInt(data.number_colunms_a)
           document.querySelector('#co_b').value = parseInt(data.number_colunms_b)
           document.querySelector('#row_b').value = parseInt(data.number_rows_b)
           generate_matrix('get_data')
           //Put that of the matrix-a
           let matrix_a = data.matrix_a
           matrix_a = JSON.parse(matrix_a)
           let matrix_b = data.matrix_b
           matrix_b = JSON.parse(matrix_b)

           let matrices = [[matrix_a, 'a'], [matrix_b, 'b']]
           matrices.forEach(matrix=>{
            for(var i = 0; i< matrix[0].length; i++){
                for(var j = 0; j < matrix[0][0].length; j++){
                    document.querySelector(`#item-${matrix[0].length}x${ matrix[0][0].length}-${i + 1}_${j + 1}-${matrix[1]}`).value = matrix[0][i][j]
                }
            }
           })

           // Reset the class of the body to avoid problemns of the change_theme
           document.querySelector('body').className = ''
           if(localStorage.getItem('theme') == 'dark'){
               change_theme('light')
           }

     
            change_width(document.querySelector(`#item-${matrix[0].length}x${ matrix[0][0].length}-${i + 1}_${j + 1}-${matrix[1]}`))
        });
    }
}



async function remove_matrix(id){
    document.querySelector(`#id_${id}`).remove()
    await fetch(`http://127.0.0.1:8000/apps/remover/matriz/${parseInt(id)}`)
}

async function edit_function(id){
    const response = await fetch(`http://127.0.0.1:8000/apps/editar/funcao/${id}`)
    window.location.href = `${response.url}`;
}


async function remove_function(id){
    document.querySelector(`#id_${id}`).remove()
    await fetch(`http://127.0.0.1:8000/apps/remover/funcao/${parseInt(id)}`)
}