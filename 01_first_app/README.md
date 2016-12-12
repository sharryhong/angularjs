# AngularJS

## First-app : This Month's Bestsellers App

- [코드카데미](https://www.codecademy.com) Lesson 1. Your First App 공부 후 github에 정리하기
- [결과물 바로가기](https://sharryhong.github.io/TIL/angularjs/01_first_app)
- 중요! 해석이 틀릴 수 있으니 조심 ^^ 제 영어는 7년전에 머물러있습니다.. ㅋㅋ 

### 1, 2_Hello AngularJS

##### 1) js/app.js 파일 

```
var app = angular.module("myApp", []); 
```
- created a new module name myApp. <br>
**A module contains the different components of an AngularJS app.**<br><br>
새 모듈(이름이 myApp인)을 만든다. <br>
모듈은 앵귤러앱의 서로다른 구성요소를 담고있다. 


##### 2) index.html 파일

```
<body ng-app="myApp>
...
<!-- Modules -->
<script src="js/app.js"></script>

<!-- Controllers -->
<script src="js/controllers/MainController.js"></script>
```
- The `ng-app` is called a *directive*. <br>
It tells AngularJS that the `myApp` module will live within the `<body>` element, termed the application's *scope*. <br>
In other words, **we used the `ng-app` directive to define the application scope.** <br><br>
`ng-app`은 디렉티브(지시자)라 부른다.  <br>
위 코드의 경우 `myApp` 모듈은 `<body>`요소내에서 유지되고, 애플리케이션의 스코프(범위)이다. <br>
다시 말해, `ng-app` 디렉티브는 애플리케이션 스코프를 정의하기 위해 사용한다. 

##### 3) js/controllers/MainController.js 파일 

```
app.controller('MainController', ['$scope', function($scope) {
  $scope.title = 'Top Sellers in Books';
}]);
```

- we created a new *controller*. named `MainController`. <br>
**A controller manages the app's data**. <br>
Here we use the property title to store a string, and attach it to `$scope`.<br><br>
이름이 MainController인 컨트롤러를 만들었다. <br>
컨트롤러는 앱의 데이터를 관리한다. <br>
여기서는 스트링(문자)를 저장하는 프로퍼티명 title을 사용하고, `$scope`에 첨부한다. 

##### 4) index.html 파일

```
<div class="main" ng-controller="MainController">
  <div class="container">
    <h1> {{ title }} </h1> // expression
```

- Like `ng-app`, `ng-controller` is a *directive* that **defines the controller scope**. <br>
This means that properties attached to `$scope` in `MainController` become available to use within `<div class="main">`.<br><br>
ng-controller도 컨트롤러 스코프를 정의하는 디렉티브이다.  <br>
이는 `MainController`가 `<div class="main">` 내에서 유효하다는 것을 말한다. 프로퍼티는 `$scope`에 첨부된다. 

- Inside `<div class="main">` we accessed `$scope.title` using `{{ title }}`. <br>
This is called an *expression*. **Expressions are used to display values on the page**. <br><br>
`{{ title }}`을 expression(표현식)이라 부른다. 표현식은 페이지에 값을 나타내기 위해 사용된다. 

- Both the controller `MainController` and the view `index.html` have access to `$scope`. <br>
This means we can use `$scope` to communicate between the controller and the view.<br><br>
컨트롤러(MainController)와 뷰(index.html)는 둘 다 `$scope`로 접근된다. <br>
이것은 컨트롤러와 뷰간 커뮤니케이트할 때 `$scope`를 사용할 수 있다는 것을 의미한다. 


### 3_workflow

typical workflow when making an AngularJS app:

1. Create a module, and use `ng-app` in the view to define the application scope.<br>
	: 모듈 생성. ng-app을 사용해서 view 내에서 에플리케이션 스코프 정의

1. Create a controller, and use `ng-controller` in the view to define the controller scope.<br>
	: 컨트롤러 생성. ng-controller를 사용해서 view내에서 컨트롤러 스코프 정의 

1. Add data to `$scope` in the controller so they can be displayed with expressions in the view.<br>
	: 컨트롤러내의 $scope에 데이터를 첨가하는데, view에서 expression(표현식)으로 나타낼 수 있다. 


### 4_Filters

```
<p class="title">{{ product.name | uppercase }} </p>  // 대문자로
<p class="price">{{ product.price | currency }} </p>  // $, 소숫점 두자리
<p class="date">{{ product.pubdate | date}} </p>  // 날짜표현 
```

- sorting(정렬), formatting(형식에 맞춰 변경), filtering data(데이터 필터) 하는데 사용된다. 
- 파이프(`|`)를 붙인다. 
- [more built-in filters 더보기](https://docs.angularjs.org/api/ng/filter)


### 6,7_ng-repeat

##### MainController.js 파일 

```
$scope.products =
    [
      {
        name: 'The Book of Trees',
        price: 19,
        pubdate: new Date('2014', '03', '08'),
        cover: 'img/the-book-of-trees.jpg'
      },
      {
        name: 'Program or be Programmed',
        price: 8,
        pubdate: new Date('2013', '08', '01'),
        cover: 'img/program-or-be-programmed.jpg'
      }
    ]

```

##### index.html파일 

```
<div ng-repeat="product in products" class="col-md-6">
  <div class="thumbnail">
    <img ng-src="{{ product.cover }}">
    <p class="title">{{ product.name | uppercase }} </p>
    <p class="price">{{ product.price | currency }} </p>
    <p class="date">{{ product.pubdate | date}} </p>
  </div>
</div>
```

- In the controller, we used `products` to store an array containing two objects.<br><br>
컨트롤러에서 두개의 객체를 가지고 있는 배열을 저장하기 위해 products를 사용했다. 

- Then in the view, we added `<div ng-repeat="product in products">`. <br>
Like `ng-app` and `ng-controller`, the `ng-repeat` is a directive. <br>
It **loops** through an array and displays each element. <br>
Here, the `ng-repeat` repeats all the HTML inside `<div class="col-md-6">` for each element in the `products` array.<br><br>
view에서 `ng-repeat="product in products"` 추가.<br>
`ng-repeat`도 디렉티브이다.<br>
`products`배열 각 요소를 html안에서 repeat해준다. 


### 8_directives

- Directives bind behavior to HTML elements. <br>
When the app runs, AngularJS walks through each HTML element looking for directives. <br>
When it finds one, AngularJS triggers that behavior (like attaching a scope or looping through an array).<br><br>
디렉티브는 behavior(동작?)을 html요소들로 묶어준다. <br>
앵귤러가 각 html요소를 지나가면서 디렉티브를 찾는다. <br>
하나를 찾으면 앵귤러는 behavior(동작?) 를 시작하게 한다. <br>
(스코프(범위)를 attaching하거나 배열을 통해 looping하게 하는 등)

### 9,10_ng-click

- So far we've made a static AngularJS app by adding properties in the controller and displaying them in the view. <br>
AngularJS is a framework for building dynamic web apps, so let's start to make this app interactive.<br><br>
지금까지 우리는 정적인 앵귤러앱을 만들었다. controller내에서 프로퍼티를 더하고 그것을 view에서 디스플레이하는..<br>
앵귤러는 다이나믹한 웹 앱을 만들기 위한 프레임워크이다. 인터렉티브(상호작용)하는 앱을 만들어보자. 

##### MainController.js 파일

```
$scope.products =
    [
      {
        name: 'The Book of Trees',
        price: 19,
        pubdate: new Date('2014', '03', '08'),
        cover: 'img/the-book-of-trees.jpg',
        likes: 0
      }, 
......
$scope.plusOne = function(index) {
    $scope.products[index].likes += 1; }
```

##### index.html파일

```
<p class="likes" ng-click="plusOne($index)">+ {{ product.likes }}</p>
```

- 클릭하면 컨트롤러내의 plusOne함수 실행된다. <br> 
plusOne함수는 클릭된 product의 index를 가져와서 like 프로퍼티를 + 1 시킨다. 

- Notice that the plusOne() doesn't interact with the view at all; it just updates the controller.<br>
Any change made to the controller shows up in the view. <br><br>
plusOne()함수가 view와 상호작용하는게 아니다. 이 함수는 컨트롤러를 업데이트해준다. <br>
변경되면 컨트롤러가 뷰에 나타나게 해준다. 


### 11_Generalizations (총괄)


1. A user visits the AngularJS app.<br>
	: 사용자가 앵귤러 앱에 들어왔다. 

1. The view presents the app's data through the use of expressions, filters, and directives. <br>
Directives bind new behavior HTML elements.<br>
	: view는 expressions(표현식) 사용을 통해 앱의 데이터를 보여준다. 

1. A user clicks an element in the view. If the element has a directive, AngularJS runs the function.<br>
	: 사용자가 view의 요소를 클릭한다. 만약 그 요소에 디렉티브가 있다면 앵귤러는 함수를 작동시킨다. 

1. The function in the controller updates the state of the data.<br>
	: 그 함수는 컨트롤러 내에 있고, 데이터 상황을 업데이트 시킨다. 

1. The view automatically changes and displays the updated data. The page doesn't need to reload at any point.<br>
	: 뷰는 자동적으로 변하고, 업데이트된 데이터를 보여준다. 그 페이지는 리로드될 필요가 없다. 

