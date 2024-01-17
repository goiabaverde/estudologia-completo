// This script is to the basic functions of the site, like change the theme and show the mobile menu

document.addEventListener("DOMContentLoaded", ()=>{
// On load the page will check the localStorage to show the correct theme
    var theme = localStorage.getItem('theme')

    if(theme == 'dark'){
        change_theme('light')
    }else{
        change_theme('dark', true)
    }
   }, {once : true})

// Functions to stop the scroll while the menu mobile is active
function stop_scroll(){
    window.scrollTo(0, 0);
}

function stop_scroll_mobile(e){
    e.preventDefault()
}


function showMenu(){
// Fuction to active or not the mobile menu

    var list = document.querySelector('.nav_list').classList
    list.toggle('active')
      if(document.querySelector('i.fa-light') == null){
        document.addEventListener("scroll", stop_scroll)
        document.body.addEventListener('touchmove', stop_scroll_mobile, { passive: false })
            
        
        var icon = document.querySelector('i.fa-bars')
        icon.remove()
        const close_btn = document.createElement('i')
        close_btn.className = "fa-light fa-x"
        close_btn.setAttribute("onclick", 'showMenu()')
        document.querySelector('.nav_btn').append(close_btn)    
   

      }else{
        document.removeEventListener("scroll", stop_scroll)
        document.body.removeEventListener('touchmove', stop_scroll_mobile ,{ passive: false })
        var close_btn = document.querySelector('i.fa-x')
        close_btn.remove()
        const hamburguer_icon = document.createElement('i')
        hamburguer_icon.className = "fa-solid fa-bars";
        hamburguer_icon.setAttribute("onclick", 'showMenu()')
        document.querySelector('.nav_btn').append(hamburguer_icon)
      }
    } 


// Change theme logic
function change_theme(original_theme, first){
// Have to check if is the first time that is rendering because from default the page is light, and if is light don't need to change the colors.
    if(original_theme == 'dark' && first){
        localStorage.setItem('theme', 'light')
        return 0
    }if(original_theme == 'dark'){
        localStorage.setItem('theme', 'light')
    }else{
        localStorage.setItem('theme', 'dark')
        document.querySelector('.checkbox').checked = true
    }
    document.querySelector('body').classList.toggle('dark')

   const all_p =  document.getElementsByTagName('p');
   for(p of all_p){
    p.classList.toggle('dark')
   };
   const all_h1 = document.getElementsByTagName('h1')
   for(h1 of all_h1){
    h1.classList.toggle('dark')
   };
   const all_h2 = document.getElementsByTagName('h2')
   for(h2 of all_h2){
    h2.classList.toggle('dark')
   };
   const all_h3 = document.getElementsByTagName('h3')
   for(h3 of all_h3){
    h3.classList.toggle('dark')
   };
   const all_h4 = document.getElementsByTagName('h4')
   for(h4 of all_h4){
    h4.classList.toggle('dark')
   };
   const all_label = document.getElementsByTagName('label')
   for(label of all_label){
    label.classList.toggle('dark')
   };

   const all_li = document.querySelectorAll('li')
   all_li.forEach(li=>{
    li.classList.toggle('dark')
   })

   const card_body = document.querySelectorAll('.card-body')
   card_body.forEach(card=>{
    card.classList.toggle('dark')
   })

   const all_th = document.querySelectorAll('th')
   all_th.forEach(th=>{
    th.classList.toggle('dark')
   })

   const all_td = document.querySelectorAll('td')
   all_td.forEach(td=>{
    td.classList.toggle('dark')
   })

   return 0
}
   