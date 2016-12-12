# AngularJS

## Services : Weather forecast App

- [코드카데미](https://www.codecademy.com) Lesson 3. Services
- [결과물 바로가기](https://sharryhong.github.io/TIL/angularjs/03_services)
- 중요! 해석이 틀릴 수 있으니 조심 ^^ 

### 1. Services I

- So far we've made AngularJS apps by adding data to a controller, and then displaying it in a view. <br><br>
지금까지 컨트롤러에서 데이터를 추가해서 앵귤러 앱을 만들었다. 그다음에 view에서 데이터를 보여주었다. 

- But what happens when the data contains hundreds of items, or if it's constantly changing like weather or financial data? Hardcoding data into a controller won't work anymore.<br><br>
하지만 데이터가 계속 변하는 날씨나 금융 데이터라면? 그럴 땐 더이상 컨트롤러에 데이터를 하드코딩하는 것은 소용없는 일이다. 

- A better solution is to read the live data from a server. We can do this by creating a *service*.<br><br>
더 나은 해결책은 서버로 부터 처리된 데이터를 읽는 것이다. 이 것을 service를 만들어서 할 수 있다. 

##### js/services/forecast.js

```
app.factory('forecast', ['$http', function($http) { 
  return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);
```

- We used `app.factory` to create a new service named `forecast`.<br><br>
이름이 forecast인 서비스를 만들기 위해 app.factory를 사용했다. 

- The `forecast` service needs to use AngularJS's built-in `$http` to fetch JSON from the server. Therefore, we add `$http` to the `forecast` service as a dependency, like this: <br><br>
forecast 서비스는 서버로 부터 JSON을 받기 위해 앵귤러에 내장된 $http를 필요로 한다. 

- Then, inside `forecast`, we use `$http` to construct an HTTP `GET` request for the weather data. If the request succeeds, the weather data is returned; otherwise the error info is returned.<br><br>
날씨 데이터에 대한 HTTP GET 요청을 구성하기 위해 $http를 사용한다.<br>
요청이 성공하면, 날씨 데이터가 반환되고, 실패하면 오류 정보가 반환된다. 


##### MainController

```
app.controller('MainController', ['$scope', 'forecast', function($scope, forecast) {
  forecast.success(function(data){
    $scope.fiveDay = data;
  });
  
}]);
```

- Next in the controller, we used the `forecast` service to fetch data from the server. First we added `forecast` into `MainController` as a dependency so that it's available to use. Then within the controller we used `forecast` to asynchronously fetch the weather data from the server and store it into `$scope.fiveDay`.<br><br>
서버에서 데이터를 가져 오기 위해 forecast 서비스를 사용한다.<br>
첫번째, MainController에 forecast를 추가하여 종속적으로 사용가능하도록 하였다. <br>
그 다음, 컨트롤러 내에서 서버로 부터 날씨 데이터를 가져오는 비동기 통신을 위해 forecast를 사용하고, 그 데이터는 `$scope.fiveDay`로 저장된다. 


##### index.html

```
<h1>{{ fiveDay.city_name }}</h1>

<!-- Services -->
<script src="js/services/forecast.js"></script>
```

- As before, any properties attached to `$scope` become available to use in the view. This means in index.html, we can display the `city_name` using an expression as done before.<br><br>
$scope의 프로퍼티는 view에서 사용가능하다. 이 것은 index.html에서 표현식으로 city_name을 디스플레이할 수 있다는 것을 의미한다. 


##### forecast.json

```
{
  "city_name": "New York",
  "country": "US",
  "days": [
    {
      "datetime": 1420390800000,
      "icon": "https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/sun.svg",
      "high": 68,
      "low": 37
    },
    ...
```

### 2. Services II

- JSON의 나머지 데이터들 view에 보여주기 

##### index.html 

```
<div class="forecast" ng-repeat="day in fiveDay.days">
  <div class="day row">
    <!-- datetime -->
    <div class="weekday col-xs-4">
      {{ day.datetime | date }}
    </div>
    <!-- icon -->
    <div class="weather col-xs-3">
      <img ng-src="{{ day.icon }}">
    </div>
    <div class="col-xs-1"></div>
    <!-- high -->
    <div class="high col-xs-2">
      {{ day.high }}
    </div>
    <!-- low -->
    <div class="low col-xs-2">
      {{ day.low }}
    </div>
```

### 3. Generalizations

- Directives are a way to make standalone UI components, like `<app-info>`.<br><br>
디렉티브는 독립적인 UI 구성요소를 만드는 방법이다. 

- Services are a way to make standalone communication logic, like `forecast` which fetches weather data from a server.<br><br>
서비스는 서버로부터 날씨 데이터를 받는 forecast처럼 독립적인 통신 로직을 만드는 방법이다. 