class Graph {
  constructor(plot, data, colour) {
    this.canvas = new Chart(plot, {
      type: 'scatter',
        data: {
          datasets: [{
              label: 'Datos',
              data: data,
              backgroundColor: colour,
              borderColor: colour,
              showLine: false
          }]
       },
       options: {
         scales: {
           xAxes: [{
             type: 'linear',
             position: 'bottom'
           }]
         }
       }
    });
  }

  updateData(data, colour){
    this.canvas.data = {
     datasets: [{
       label: 'Datos',
       data: data,
       backgroundColor: colour,
       borderColor: colour,
       showLine: false,
       fill: false
     }]
    }
    this.canvas.update();
  }

  updateDatasetSlot(data, slot) {
    if(slot < this.canvas.data.datasets.length){
      this.canvas.data.datasets[slot].data = data;
      this.canvas.update()
    }
  }

  addDataset(x, theta, trainees, lbl, colour){
    let newDataset = {
      label: lbl,
      backgroundColor: colour,
      borderColor: colour,
      data: [],
      showLine: true,
      fill: false
    }
    var predict;
    predict = math.multiply(trainees,theta).valueOf();
    newDataset.data = this.arraytoDataset( [x, predict] );
    this.canvas.data.datasets.push(newDataset);
    this.canvas.update();
  }

  sizeDataset() {
    return this.canvas.data.datasets.length;
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

class ColourChart {
  constructor() {}
  grey = 'rgba(52,54,52,1)';
  orange = 'rgba(240, 95, 64, 1)';
  green = 'rgba(18, 247, 2,1)';
  blue = 'rgba(63,63,191,1)';
}
