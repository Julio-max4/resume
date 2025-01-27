let data, plot, graph, colour, dataset;
let trainees;
let thetaLinearRegresion, alpha, lambda, m;
let ml_algorithm;
let state = [0, 0, 0];

window.onload = function(){
  plot = document.getElementById("chart").getContext("2d");
  m = document.getElementById("m").value;
  lambda = document.getElementById("lambda").value;
  alpha = document.getElementById("alpha").value;
  colour = new ColourChart();

  data_creator = new CreateData(1,11,15,3);
  data = data_creator.data;
  dataset = data_creator.dataset;
  graph = new Graph(plot, dataset, colour.grey);
  trainees = data_creator.trainees;
  values = data[1];
  ml_algorithm = new MachineLearning(trainees, values);

  document.getElementById("alpha").addEventListener("change", function(){
    alpha = document.getElementById("alpha").value;
    document.getElementById("alphaValue").innerHTML = alpha;
    graph.updateData(dataset, colour.grey);
    state = [0,0,0];
  })



  document.getElementById("lambda").addEventListener("change", function(){
    lambda = document.getElementById("lambda").value;
    document.getElementById("lambdaValue").innerHTML = lambda;
    graph.updateData(dataset, colour.grey);
    state = [0,0,0];
  })

  document.getElementById("m").addEventListener("change", function(){
    m = document.getElementById("m").value;
    document.getElementById("mValue").innerHTML = m;
    data_creator = new CreateData(1,10,m-1,3);
    data = data_creator.data;
    dataset = data_creator.dataset;
    trainees = data_creator.trainees;
    trainees = data_creator.trainees;
    values = data[1];
    ml_algorithm = new MachineLearning(trainees, values);

    graph.updateData(dataset, colour.grey);
    state = [0,0,0];
  })


  document.getElementById("generador").addEventListener("click", function(){
    data_creator = new CreateData(1,10,m-1,3);
    data = data_creator.data;
    dataset = data_creator.dataset;
    trainees = data_creator.trainees;
    graph.updateData(dataset, colour.grey);
    trainees = data_creator.trainees;
    values = data[1];
    ml_algorithm = new MachineLearning(trainees, values);
    state = [0,0,0];
  })


  document.getElementById("linearRegression").addEventListener("click", function(){
    thetaLinearRegresion = ml_algorithm.linearRegression(alpha, 4000, true);
    if (state[0] == 0){
      graph.addDataset(data[0],thetaLinearRegresion, trainees, 'Regresion Lineal', colour.orange );
    }
    state[0] = 1;
  })

  document.getElementById("ridge").addEventListener("click", function(){
    thetaRidge = ml_algorithm.ridge(alpha, lambda, 4000, true);

    if (state[1] == 0){
      graph.addDataset(data[0],thetaRidge, trainees, 'Ridge', colour.green );
      state[1] = 1;
    }
  })

  document.getElementById("stochastic").addEventListener("click", function(){
    thetaEstocastico = ml_algorithm.gradienteEstocastico(alpha, 400, true);
    if (state[2] == 0){
      graph.addDataset(data[0], thetaEstocastico, trainees, 'Estocastico', colour.blue );
      state[2] = graph.sizeDataset() - 1;
    } else {
      predictions = ml_algorithm.predicts(trainees, thetaEstocastico)
      predictions = graph.arraytoDataset([data[0], predictions]);
      graph.updateDatasetSlot(predictions, state[2]);
    }
  })

  document.getElementById("facultadCiencias").addEventListener("mouseenter", function(){
    document.getElementById("facultadCiencias").src  = "../img/facultad_de_ciencias_black.svg"
  })
  document.getElementById("facultadCiencias").addEventListener("mouseleave", function(){
    document.getElementById("facultadCiencias").src  = "../img/facultad_de_ciencias_white.svg"
  })
}
