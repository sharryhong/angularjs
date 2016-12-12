app.factory('suggestions', ['$http', function($http){
    return $http.get('./data/data.json')
        .success(function(data) { 
        console.log("service OK!");
          return data; 
        }) 
        .error(function(err) { 
          console.log("service err!");
          return err; 
        });
}]);