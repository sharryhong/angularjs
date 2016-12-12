# AngularJS

## Routing : Gallery app

- [코드카데미](https://www.codecademy.com) Lesson 4. Routing
- [결과물 바로가기](https://sharryhong.github.io/angularjs/04_routing)
- 중요! 해석이 틀릴 수 있으니 조심 ^^ 

### 1,2,3. Routing

- So far we've made AngularJS apps that display data in a single view index.html.<br><br>
지금까지 단일 view, index.html에서 데이터를 표시하는 앵귤러 앱을 만들었다. 

- But what happens when the app grows and needs to display more information? Stuffing more code to a single view will quickly make things messy.<br><br>
앱이 커지고 더 많은 정보를 표시할 땐 어떻게 해야할까? <br>
단일 뷰에 계속 코드를 쓰면 엉망이 될 것이다.

- A better solution is to use multiple templates that display different pieces of data based on the URL that the user is visiting. We can do this with Angular's *application routes*.<br><br>
더 나은 해결책은 사용자가 방문하는 URL에 기초하여 데이터의 다른 부분을 표시하는 다수의 템플릿을 사용하는 것이다.<br>

##### index.html

```
<div ng-view>
</div>
```

##### app.js

```
var app = angular.module('GalleryApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'HomeController',
      templateUrl: 'views/home.html'
    })
    .otherwise({
      redirectTo: '/'
  });
});
```

##### HomeController.js

```
app.controller('HomeController', ['$scope', 'photos', function($scope, photos) {
  photos.success(function(data) {
    $scope.photos = data;
  });
}]);
```

##### views/home.html

```
<div class="main">
  <div class="container">
    <h2>Recent Photos</h2>
    <div class="row">
      <div class="item col-md-4" ng-repeat="photo in photos">
        <a href="#/photos/{{$index}}">
          <img class="img-responsive" ng-src="{{ photo.url }}">
          <p class="author">by {{ photo.author }}</p>
        </a>
      </div>
    </div>
  </div>
</div>
```

#### 작동 원리

1. In app.js inside the `app.config()` method, we use Angular's `$routeProvider` to define the application routes. <br><br>
app.config()메소드 내부에서 애플리케이션 라우트를 정의하기 위해 $routeProvider를 쓴다. (config 뜻:환경설정)

1. We used `.when()` to map the URL `/` to to the controller `HomeController` and the template `home.html`. The `HomeController` uses the service `js/services/photos.js` to fetch the array of all photos from `photos.json` and stores it into `$scope.photos`. The `home.html` uses `ng-repeat` to loop through each item in the `photos` array and display each photo.<br><br>
`.when()`는 컨트롤러 HomeController와 템플릿 home.html을 url `/`으로 경로 지정을 한다. <br>
HomeController는 photo.json파일의 모든 photos 배열을 가져오고 $scope.photos로 저장하기 위해 photos.js에 서비스를 만들었다. <br>
home.html은 ng-repeat로 photos 배열의 아이템들을 looping하고 각 사진을 보여준다. 

1. Otherwise if a user accidentally visits a URL other than `/`, we just redirect to `/` using `.otherwise()`.<br><br>
만약 사용자가 뜻하지 않은 URL로 들어가면 `.otherwise()`의 `/` 경로로 다시 보낸다.

1. Now when a user visits `/`, a view will be constructed by injecting `home.html` into the `<div ng-view></div>` in index.html.<br><br>
사용자가 `/`에 방문할 때, 뷰는 index.html의 `<div ng-view></div>`에 home.html을 injecting(주입하다. 더하다)하여 구성한다. 

##### app.js 에 추가 

```
.when('/photos/:id', {
  controller: 'PhotoController',
  templateUrl: 'views/photo.html'
})
```
- In app.js, we mapped a URL to `PhotoController` and `photo.html`. We added a variable part named `id` to the URL, like this: `/photos/:id`.<br><br>
app.js에서 $routeParams와 photo.html을 할당했다. url에 id라는 변수 부분을 추가했다.

##### PhotoController.js

```
app.controller('PhotoController', ['$scope', 'photos', '$routeParams', function($scope, photos, $routeParams) {
  photos.success(function(data) {
    $scope.detail = data[$routeParams.id];
  });
}]);
```

- In PhotoController, we used Angular's `$routeParams` to retrieve `id` from the URL by using `$routeParams.id`. Notice that we injected both `$routeParams` and the `photos` service into the `PhotoController` dependency array to make them available to use inside the controller. <br><br>
$routeParams.id를 사용하여 url에서 id를 검색하기위해 앵귤러의 $routeParams를 사용했다. 


##### photo.html

```
<div class="photo">
  <div class="container">
    <img ng-src="{{ detail.url }}">
    <h2 class="photo-title">{{detail.title}} </h2>
    <p class="photo-author">{{detail.author}}</p>
    <p class="photo-views">{{detail.views | number}}</p>
    <p class="photo-upvotes">{{detail.upvotes | number}}</p>
    <p class="photo-pubdate">{{detail.pubdate | date}}</p>
  </div>
</div>
```

### 4. Generalizations

- Why are routes useful? Instead of filling a single view with more code than needed, routes let us map URLs to self-contained controllers and templates. Furthermore, now that the app has URLs, users can easily bookmark and share the app's pages.<br><br>
왜 라우트가 유용할까? 싱글 뷰에 코드를 계속 쓰는 대신에 라우트는 컨트롤러와 템플릿을 독립적으로 url을 할당할 수 있게 해준다. <br>
뿐만 아니라, 앱은 url을 가지고 있어서 사용자들이 북마크를 쉽게 할 수 있고 앱 페이지를 공유할 수 있다. 

#### 지금까지 배운 것 정리

- Directives are a way to make standalone UI components, like <app-info>.<br><br>
디렉티브로 독립적인 UI 컴포넌트를 만들 수 있다. 

- Services are a way to make standalone communication logic, like forecast which fetches weather data from a server.<br><br>
서비스로 독립적인 통신 로직을 만들 수 있다. 

- Routes are a way to manage apps containing more views.<br><br>
라우트로 더 많은 뷰가 있는 앱을 관리할 수 있다.