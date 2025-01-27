class CreateData{
  constructor(ini, fin, num, grad){
    this.data = this.noiseData(ini, fin, num);
    this.trainees = this.polynomialMatrix(this.data[0], grad);
    this.dataset = this.arraytoDataset(this.data);
    }

  noiseData(ini, fin, num){
    var step = (fin - ini)/num;
    var xcoord = math.range(ini, fin, step, true);
    var ycoord = math.map(xcoord, function(value){
      return (value-1)*(value-8)*(value-9)+ 10 + math.random(-10,10);
    });
    return [xcoord.valueOf(), ycoord.valueOf()];
  }

  polynomialMatrix(array, p){
    var n = array.length;
    var polynomial = math.matrix(math.ones([n,p+1]));
    for (var i=0; i < n; i++){
      for (var j=0; j < p+1; j++){
        polynomial.subset(math.index(i, j), array[i]**j);
      }
    }
    return polynomial;
  }

  arraytoDataset(array){
    var dataset = [];

    for (var i = 0; i < array[0].length; i++){
      dataset.push({
        x: array[0][i],
        y: array[1][i]
      })
    }

    return dataset;
  }
}


function matrixtoArray(matrix){
  array = [];
  matrix.forEach(function(value){
    array.push(value);
  });
  return array;
}
