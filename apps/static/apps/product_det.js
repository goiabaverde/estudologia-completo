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

function cancel(){
    var inputs = [document.querySelector('#row_a'),document.querySelector('#co_a'),    document.querySelector('#co_b')]
    inputs.forEach(input=>{
        input.value =  ''
        input.disabled = false
        input.style.width = '40px'
    })
    const html = document.querySelector('html')
    html_style = window.getComputedStyle(html)
    let width = html_style.getPropertyValue('width')
    width = parseFloat(width.replace("px", ''))
    width >500? document.querySelector('.form_product').style.gridTemplateColumns = `250px 250px` : document.querySelector('.form_product').style.gridTemplateColumns = `150px 150px`;
    document.querySelector('.matrix-a').innerHTML = ''
    document.querySelector('.matrix-b').innerHTML = ''
    document.querySelector('#cancel_btn').style.display = 'none'
    let btn =  document.querySelector(".submit_btn_product").children[0]
    btn.id = 'get_data'
    btn.innerText = 'Gerar Matrizes'
    document.querySelector("#mode").value = 'get_data'

    document.querySelector('.matrix-result').style.display = 'none'
    document.querySelector('#row_b').value = ''   
    document.querySelector('.result-area').innerHTML = ''
}


function multiply_matrices(a, b){
    var result =  math.multiply(a, b)
    return result
}


function select_grid(grid){
    document.querySelector('.input_area').innerHTML = '';
    const grid_type = grid
    const form = document.createElement("form");
    form.setAttribute('onsubmit', 'return false')
    document.querySelector('.input_area').append(form)
    const div = document.createElement('div')
    div.className = 'grid'
    div.id = `class-${grid_type}`
    form.append(div)

    for(var i = 0; i < parseInt(grid); i++){
        for(var j = 0; j < parseInt(grid); j++ ){
            let input = document.createElement('input')
            input.setAttribute('type', 'number')
            input.setAttribute("name", `item-${grid}x${grid}-${i+1}_${j+1}`)
            input.setAttribute('onkeypress', 'change_width(this)')
            input.className = `c${j+1}-${grid}x${grid}`
            input.id = `item-${grid}x${grid}-${i+1}_${j+1}`
            input.style.overflowX = 'auto'
            div.append(input)
            input.required = true
     
        }
        const br = document.createElement('br')
        div.append(br)
        
    }
    const input = document.createElement('button')
    input.setAttribute('type', 'submit')
    input.setAttribute('onclick', 'get_values()')
    input.id = 'submit_det'
    input.className = 'btn btn-primary'
    input.innerHTML = 'Calcular'
    div.append(input)
}


function get_values(){
    var matrix_type = document.querySelector('#grid_select').value

    var matrix = []
    // Define rows
    for(var i  = 0; i < matrix_type; i++){
        var row = []
        for(var j = 0; j < matrix_type; j++){
            const test = `#item-${matrix_type}x${matrix_type}-${i+1}_${j+1}`
            let element = parseInt(document.querySelector(`#item-${matrix_type}x${matrix_type}-${i+1}_${j+1}`).value)
            if(!element){
                window.alert("Todas as linhas precisam ser preenchidas!")
                return 1
            }
            row.push(element)
        }
    // Add the rows to the matrix 
        matrix.push(row)
    
    }
    // Calculate the determinant
    document.querySelector('.p_operation_result').style.display = 'block';
    document.querySelector('.p_operation_result').innerHTML = determinante(matrix)

    let username = document.querySelector('#is_authenticated')

    if(username != 'not_logged'){
        let add_to_model = async function(){
            let input_area = document.querySelector('.grid')
            input_area = input_area.children
            let id_input = input_area[input_area.length - 3].id
            var n_row = id_input[id_input.length - 3]
            var n_co = id_input[id_input.length - 1]
            await fetch(`http://127.0.0.1:8000/apps/add/matriz`, {
                method:'post',
                headers: {'Content-type' : 'application/json' ,'X-CSRFToken' : getCookie('csrftoken'), accept: 'application/json',},
                body: JSON.stringify({
                    n_row: n_row,
                    n_co: n_co,
                    matrix : matrix,
                    cond: true
                })
            })
        }
        add_to_model()
    }    

    
}

// Functions to find the determinant of a matrix
function cofator(a, linha, coluna) {
    var sub_matriz = [],
        ordem = a.length,
        m = 0;

    for (var i = 1; i < ordem; i++) {
        sub_matriz[m] = [];

        for (var j = 0; j < ordem; j++) {
            if (j !== coluna) {
                sub_matriz[m].push(a[i][j]);
            }
        }
        m++;
}
return(coluna % 2? -1 : 1) * determinante(sub_matriz)
}


function determinante(a) {
    var ordem = a.length;

    if (ordem === 1) {
      return a[0][0];
    }

    if (ordem === 2) {
      return a[0][0] * a[1][1] - a[0][1] * a[1][0];
    }

    var det = 0;

    for (var j = 0; j < ordem; j++) {
      det += a[0][j] * cofator(a, 0, j);
    }
    return det
}

function generate_matrix(mode) {
    if(mode == 'get_data'){
    //clean the matrices before put the new
    document.querySelector('.matrix-a').innerHTML = ''
    document.querySelector('.matrix-b').innerHTML = ''
    // get the values to produce the matrix
    row_a = document.querySelector('#row_a').value;
    co_a = document.querySelector('#co_a').value;
    row_b = document.querySelector('#row_b').value;
    co_b = document.querySelector('#co_b').value;
    if(co_a != row_b){
        window.alert("O número de colunas da primeira matriz precisa ser igual ao número de colunas da segunda matriz, insira novamente os números.")
        return 1
    }
   // make a adjustment in the width of the input page
   if(co_a >=7 || co_b >= 7){
    if(co_a >= 7){
        ca = co_a * 50
        document.querySelector('.form_product').style.gridTemplateColumns = `${ca}px 250px`
    }
    if(co_b >= 7){
        cb = co_b * 50
        document.querySelector('.form_product').style.gridTemplateColumns = `250px ${cb}px`
    }
    if(co_a >= 7 && co_b >= 7){
        document.querySelector('.form_product').style.gridTemplateColumns = `${ca}px ${cb}px`
        
    }
}
    var values = [[row_a,co_a,'a'],[row_b,co_b,'b']]
    var data = [row_a, co_a, row_b, co_b]
    //check if all the value has been filled
    if(data.indexOf('') != -1){
        window.alert("Todos os inputs devem estar preenchidos!");
        return 1;
    }
   
    // create the matrix a and b
    values.forEach(value=>{
        for(var i = 0; i < value[0]; i++){
            for(var j = 0; j < value[1]; j++){
                const input = document.createElement('input')
                input.setAttribute('type', 'number')
                input.setAttribute('id', `item-${value[0]}x${value[1]}-${i + 1}_${j + 1}-${value[2]}`)
                input.setAttribute('class', `c${j+1}-${value[0]}x${value[1]}-${value[2]}`)
                input.setAttribute('name', `item-${value[0]}x${value[1]}-${i + 1}_${j + 1}-${value[2]}`)
                input.setAttribute('onkeypress', `change_width_matrix(this)`)
                input.required = true
                document.querySelector(`.matrix-${value[2]}`).append(input)
                }
                
                const br = document.createElement('br')
                document.querySelector(`.matrix-${value[2]}`).append(br)
             }
    })
    

         document.querySelector('#row_a').disabled = true
         document.querySelector('#row_b').disabled = true
         document.querySelector('#co_a').disabled = true
         document.querySelector('#co_b').disabled = true
         

        document.querySelector('#cancel_btn').style.display = 'block'

        // document.querySelector("#submit_product").value = 'Calculate'
        let btn =  document.querySelector(".submit_btn_product").children[0]
        btn.id = 'operate_data'
        btn.innerText = 'Calcular'

    }else if(mode == 'operate_data'){
        document.querySelector('.result-area').innerHTML = ''
        var matrix_a = []
        var matrix_b = []
        values_of_matrices = [[row_a, co_a, 'a', matrix_a], [row_b, co_b, 'b', matrix_b]];
        event.preventDefault()
       values_of_matrices.forEach(val_array=>{
        for(var i  = 0; i < val_array[0]; i++){
            var row = []
            for(var j = 0; j < val_array[1]; j++){
                const test = `#item-${val_array[0]}x${val_array[1]}-${i+1}_${j+1}`
                row.push(parseInt(document.querySelector(`#item-${val_array[0]}x${val_array[1]}-${i+1}_${j+1}-${val_array[2]}`).value))
            }
            val_array[3].push(row)
        }
       })
       
    result = multiply_matrices(matrix_a,matrix_b)
    row_r = result.length
    co_r = result[0].length
    for(var i = 0; i < row_r; i++){
        var div = document.createElement('div')
        div.className = `row-${i+1}`
        for(var j = 0; j < co_r; j++){
                const input = document.createElement('input')
                input.setAttribute('type', 'number')
                input.setAttribute('id', `item-${row_r}x${co_r}-${i + 1}_${j + 1}`)
                input.setAttribute('class', `c${j+1}-${row_r}x${co_r}`)
                input.disabled = true
                input.value = result[i][j]
                input.style.width = `${(result[i][j].toString().length *8) + 40}px`
                document.querySelector('.result-area').append(div)
                document.querySelector(`.row-${i+1}`).append(input)
        }
    }
    document.querySelector('.matrix-result').style.display = 'block'
    if(co_r >=7){
            cr = co_r * 50
            document.querySelector('.matrix-result').style.gridTemplateColumns = `250px ${cr}px`
        }
 

    // Create a list of objects that the keyvalue refers to the colunm
    var widths = []
    
    for(var i = 1; i <= result[0].length; i++){
        var colunms = []
        let all_inputs = document.querySelectorAll(`.c${i}-${row_r}x${co_r}`)
        all_inputs.forEach(input=>{
            let input_style = window.getComputedStyle(input)
            let key = `c${i}`
            let val = input_style.getPropertyValue('width')
            let obj = {}
            obj[key] = parseFloat(val)
            colunms.push(obj)
        })
        widths.push(colunms)
    }


    max_widths = []
    for(var i = 0 ; i < widths.length; i++){
        var max_width_co = []
        for(var j = 0; j < widths[i].length; j++){
            let val = Object.values(widths[i][j])
            max_width_co.push(val[0])
        }
        max_widths.push(Math.max(...max_width_co))
    }

    for(var i = 1 ; i <= max_widths.length; i++){
        let inputs = document.querySelectorAll(`.c${i}-${row_r}x${co_r}`)
        inputs.forEach(input=>{
            input.style.width = `${max_widths[i - 1]}px`
        })
    }


let username = document.querySelector("#is_authenticated").value

    values_of_matrices = [[row_a, co_a, 'a', matrix_a], [row_b, co_b, 'b', matrix_b]];
            if(username != 'not_logged'){
                let add_to_model = async function(){
                    await fetch(`http://127.0.0.1:8000/apps/add/matriz`, {
                        method:'post',
                        headers: { 'Content-type' : 'application/json', 'X-CSRFToken' : getCookie('csrftoken')},
                        body: JSON.stringify({
                            number_rows_a: values_of_matrices[0][0],
                            number_colunms_a: values_of_matrices[0][1],
                            number_rows_b: values_of_matrices[1][0],
                            number_colunms_b: values_of_matrices[1][1],
                            matrix_a : values_of_matrices[0][3],
                            matrix_b : values_of_matrices[1][3],
                            cond : false
                        })
                    })
                }
                add_to_model()
            }    
}
}


function change_width_matrix(element){
    let current_class = element.className
    var inputs = document.querySelectorAll(`.${current_class}`)
    //check witch value is higher
    var lengths = []
    inputs.forEach(input=>{
        lengths.push(parseInt(input.value.length))
    })
    if(Math.max(...lengths) >  element.value.length){
        return 0
    }else{
    var new_width = (element.value.length * 8)  + 40;
    inputs.forEach(input =>{
        input.style.width = `${new_width}px`
    }) 

    if(localStorage.getItem('expand_width') == 'true' && element.value.length <=8){
        let parent = window.getComputedStyle(element.parentElement)
        element.parentElement.style.width = `${(element.value.length * 8) + parseInt(parent.getPropertyValue('width'))}px`
    }

    if(parseInt(element.value.length) > 8){
        localStorage.setItem('expand_width', 'true')
        element.parentElement.style.width = `${(element.value.length * 8) + 250}px`
    }
}
}


document.addEventListener("DOMContentLoaded", ()=>{
    try{
      localStorage.setItem('expand_width', 'false')
        document.querySelector('#co_a').addEventListener("keypress",async ()=>{
            setTimeout(()=>{
            let value = document.querySelector('#co_a').value 
            document.querySelector('#row_b').value = value
            },500)
            document.querySelector('#row_b').style.width = ((document.querySelector('#row_b').value.length + 1) * 8) + 40 + 'px';
        })
    }catch (e){console.log(e)}
    
}) 
