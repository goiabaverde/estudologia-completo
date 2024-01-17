document.addEventListener("DOMContentLoaded", ()=>{
    // Take the canvas
    var canvas = document.getElementById('graphCanvas');
    var ctx = canvas.getContext('2d');
  
    // Function to check the math expression
    function evaluateExpression(x) {
      return Math.sin(x);
    }
  
    // Config of the graph
    var config = {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Function',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          data: [],
          fill: false
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          },
          y: {
            type: 'linear',
            position: 'left'
          }
        }
      }
    };
  
    // Create the graph
    var graph = new Chart(ctx, config);
  
    // Update the graph with the expression
    function updateGraph(expression) {
      var data = [];
      for (var i = -10; i <= 10; i += 0.1) {
        data.push({ x: i, y: evaluateExpression(i) });
      }
  
      // Update the data of the graph
      config.data.datasets[0].data = data;
      graph.update();
    }
  
  
// Treating the Math expression
    document.querySelector("#submit_btn").addEventListener("click", ()=>{
        var function_text = document.querySelector('#function_input').value.trim()
        var original_text = function_text
        console.log(function_text)
        function_text = function_text.replace(/\^/g, '**');
        function_text = function_text.replace(/(\d)([x])/g, '$1*$2');
        function_text = function_text.replace(/([x])([0-9x])/g, '$2*$1');
        function_text = function_text.replace(/(\d)([pi])/g, '$1*$2');
        function_text = function_text.replace(/([pi])((\d))/g, '$1*$2');
        function_text = function_text.replace(/([0-9x\+\-\*\/\^])\(([0-9x\+\-\*\/\^]+)\)/g, '$1*($2)');
        function_text = function_text.replace(/\(([0-9x\+\-\*\/\^])\)([0-9x]+)/g, '($1)*$2');
        function_text = function_text.replace(/\(([0-9x\+\-\*\/\^])\)\(([0-9x\+\-\*\/\^]+)\)/g, '($1)*($2)');
        function_text = function_text.replace(/(\w+)\*\*([0-9])/g, '($1)**$2');
        function_text = function_text.replace(/(\w+)\*\*([x])/g, '($1)**$2');
        function_text = function_text.replace(/\|([^]+)\|/g, 'Math.abs($1)');
        function_text = function_text.replace(/pi/g, 'Math.PI')
        function_text = function_text.replace(/log([0-9x\+\-\*\/\^]+)\*\(([0-9x\+\-\*\/\^Math.PI]+)\)/g, '(Math.log($2)/Math.log($1))')
        function_text = function_text.replace(/sen\(([0-9x\+\-\*\/\^Math.PI]+)\)/g, 'Math.sin($1)')
        function_text = function_text.replace(/cos\(([0-9x\+\-\*\/\^Math.PI]+)\)/g, 'Math.cos($1)')
        function_text = function_text.replace(/tg\(([0-9x\+\-\*\/\^Math.PI]+)\)/g, 'Math.tan($1)')
        console.log(function_text)
        var values = []
        for (var i = -10; i <= +10; i++) {
            let obj = {}
            let key = i
            try{
              var value = eval(function_text.replaceAll('x', `${i}`))
            }catch (e){
              console.log(e)
              window.alert("Não foi possível operar com essa função.")
              break
            }
            obj[key] = value
            values.push(obj)
            console.log(eval(function_text.replaceAll('x', `${i}`)));
        }
        console.log(values)
        evaluateExpression = new Function('x', 'return ' + function_text);
        updateGraph();
        
        let username = document.querySelector("#is_authenticated").value

        if(username != 'not_logged'){
            let add_to_model = async function(){
                await fetch("http://127.0.0.1:8000/apps/add/funcao", {
                    method:'post',
                    headers: { 'Content-type' : 'application/json', 'X-CSRFToken' : getCookie('csrftoken')},
                    body: JSON.stringify({
                        function : original_text
                    })
                })
            }
            add_to_model()
        }    
        
    })
})

