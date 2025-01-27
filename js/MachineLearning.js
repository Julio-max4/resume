class MachineLearning{
  constructor(x,y){
    this.normalize = this.normalize(x,y);
    this.mean = this.normalize[0];
    this.std = this.normalize[1];
    this.trainees = this.normalize[2];
    this.values = this.normalize[3];
  }

  arrayRandomizer(array){
    var rArray, len, cloneArray, index;

    cloneArray = array.map( (x) => x );
    rArray = [];
    len = cloneArray.length;
    for ( var i =0; i < len; i++){
      index = math.randomInt(0, cloneArray.length);
      rArray.push(cloneArray[index]);
      cloneArray.splice(index,1);
    }
    return rArray;
  }


  antinormalize(theta, mean, std){
    theta.valueOf();
    for (var j=1; j< theta.length; j++){
      theta[j] = (theta[j]-mean[j])/std[j];
    }
    return theta;
  }

  normalize(x,y){
    var x, y;
    var size, m, n;
    var x_mean, x_std, x_normalize, values;
    var y_mean, y_std, y_normalize;

    size = math.size(x).valueOf();
    m = size[0];
    n = size[1];
    x_mean = math.mean(x,0).valueOf();
    x_std = math.std(x,0, 'uncorrected').valueOf();
    x_normalize = x;
    for (var i=0; i < m; i++){
      for (var j=1; j < n; j++){
        x_normalize.subset(math.index(i, j), (math.subset(x, math.index(i, j)) - x_mean[j])/x_std[j]);
      }
    }
    values = y;
    values = math.matrix(values);
    values = values.resize([m,1]);

    return [x_mean, x_std, x_normalize, values];
  }

  gradienteEstocastico(alpha = 0.25, iter = 400, bool = true){
    var mean, std, size, m, n, values, shuffle_index, theta, index, trainees, values, trainee, i_trainee, tmp;
    if (bool = true){
      trainees = this.trainees;
      values = this.values;
      mean = this.mean;
      std = this.std;
      size = math.size(trainees).valueOf();
      m = size[0];
      n = size[1];
      values = math.matrix(values);
      values = values.resize([m,1]);
      shuffle_index = math.range(0,m-1,true).valueOf();
      shuffle_index = this.arrayRandomizer(shuffle_index);
      theta = math.matrix(math.zeros([n,1]));

      for (var k = 0; k < iter; k++){
        for (var i = 0; i < m; i++ ){
          trainee = shuffle_index[i]
          i_trainee = math.row(trainees,trainee);
          tmp = math.multiply(i_trainee,theta)
          tmp = math.subtract(tmp, math.row(values,trainee));
          tmp = math.multiply(tmp, i_trainee);
          tmp = math.multiply(alpha/m,tmp);
          theta = math.subtract(theta, math.transpose(tmp));
        }
      }

      theta = this.antinormalize(theta, this.mean, this.std);
      return theta;
    } else{
        trainees = x;
        values = y
        size = math.size(trainees).valueOf();
        m = size[0];
        n = size[1];
        values = math.matrix(values);
        values = values.resize([m,1]);
        shuffle_index = math.range(0,m-1,true).valueOf();
        shuffle_index = arrayRandomizer(shuffle_index);
        theta = math.matrix(math.zeros([n,1]));

        for (var k=0; k<iter; k++){
          for (var i=0; i< m; i++ ){
            trainee = shuffle_index[i]
            i_trainee = math.row(trainees,trainee);
            tmp = math.multiply(i_trainee,theta)
            tmp = math.subtract(tmp, math.row(values,trainee));
            tmp = math.multiply(tmp, i_trainee);
            tmp = math.multiply(alpha/m,tmp);
            theta = math.subtract(theta, math.transpose(tmp));
          }
        }
      }
    return theta
  }


  linearRegression(alpha = 0.25, iter = 4000, bool = true){
    var trainees, values, mean, std, size, m, n, theta, t_trainees, tmp, theta;
    if (bool = true){
      trainees = this.trainees;
      values = this.values;
      mean = this.mean;
      std = this.std;
      size = math.size(trainees).valueOf();
      n = size[1];
      m = size[0];
      values = math.matrix(values);
      values = values.resize([m,1]);
      theta = math.matrix(math.zeros([n,1]));
      t_trainees = math.matrix(math.transpose(trainees));

      for (var i = 0; i<iter; i++){
        tmp = math.multiply(trainees,theta);
        tmp = math.subtract(tmp,values);
        tmp = math.multiply(t_trainees,  tmp);
        tmp = math.multiply(alpha/m, tmp);
        theta = math.subtract(theta, tmp);
      }

      theta = this.antinormalize(theta, mean, std)
      return theta;
    } else{
      trainees = this.trainees;
      values = this.values;
      size = math.size(trainees).valueOf();
      n = size[1];
      m = size[0];
      values = math.matrix(values);
      values = values.resize([m,1]);
      theta = math.matrix(math.zeros([n,1]));
      t_trainees = math.matrix(math.transpose(trainees));

      for (var i = 0; i<iter; i++){
        tmp = math.multiply(trainees,theta);
        tmp = math.subtract(tmp,values);
        tmp = math.multiply(t_trainees,  tmp);
        tmp = math.multiply(alpha/m, tmp);
        theta = math.subtract(theta, tmp);
      }

    return theta;
    }
  }


  ridge(alpha = 0.25, lambda = 0.5, iter = 4000, bool = true){
    var trainees, values, mean, std, size, m, n, theta, regularization, tmp, t_trainees, theta;
    if (bool = true){
      trainees = this.trainees;
      values = this.values;
      mean = this.mean;
      std = this.std;
      size = math.size(trainees).valueOf();
      n = size[1];
      m = size[0];
      values = math.matrix(values);
      values = values.resize([m,1]);
      theta = math.matrix(math.zeros([n,1]));
      t_trainees = math.matrix(math.transpose(trainees));

      for (var i = 0; i<iter; i++){
        regularization = math.clone(theta);
        regularization.subset(math.index(0,0),0);
        tmp = math.multiply(trainees,theta);
        tmp = math.subtract(tmp,values);
        tmp = math.multiply(t_trainees,  tmp);
        regularization = math.multiply(lambda,regularization);
        tmp = math.add(tmp,regularization);
        tmp = math.multiply(alpha/m, tmp);
        theta = math.subtract(theta, tmp);
      }
      theta = this.antinormalize(theta, mean, std)
      return theta;
    } else{
      trainees = this.trainees;
      values = this.values;
      size = math.size(trainees).valueOf();
      n = size[1];
      m = size[0];
      values = math.matrix(values);
      values = values.resize([m,1]);
      theta = math.matrix(math.zeros([n,1]));
      t_trainees = math.matrix(math.transpose(trainees));

      for (var i = 0; i<iter; i++){
        regularization = math.clone(theta);
        regularization.subset(math.index(0,0),0);
        tmp = math.multiply(trainees,theta);
        tmp = math.subtract(tmp,values);
        tmp = math.multiply(t_trainees,  tmp);
        regularization = math.multiply(lambda,regularization);
        tmp = math.add(tmp,regularization);
        tmp = math.multiply(alpha/m, tmp);
        theta = math.subtract(theta, tmp);
      }

    return theta;
    }
  }

  predicts(X, theta){
    var predict;
    predict = math.multiply(X,theta).valueOf();
    return predict;
  }
}
