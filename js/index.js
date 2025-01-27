window.onload = function(){
  document.getElementById("facultadCiencias").addEventListener("mouseenter", function(){
    document.getElementById("facultadCiencias").src  = "img/facultad_de_ciencias_black.svg"
  })
  document.getElementById("facultadCiencias").addEventListener("mouseleave", function(){
    document.getElementById("facultadCiencias").src  = "img/facultad_de_ciencias_white.svg"
  })
}
