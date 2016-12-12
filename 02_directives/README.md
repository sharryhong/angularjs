# AngularJS

## Directives : App Market App

- [코드카데미](https://www.codecademy.com) Lesson 2. Directives
- [결과물 바로가기](https://sharryhong.github.io/angularjs/02_directives)
- 중요! 해석이 틀릴 수 있으니 조심 ^^ 

### 1,2,3_ directives

##### index.html 코드 리펙토링 전 

```
<div class="main" ng-controller="MainController">
  <div class="container">
     <div class="card">
      <img class="icon" ng-src="{{ move.icon }}">
      <h2 class="title">{{ move.title }}</h2>
      <p class="developer">{{ move.developer }}</p>
      <p class="price">{{ move.price | currency }}</p>
    </div>

    <div class="card">
      <img class="icon" ng-src="{{ shutterbugg.icon }}">
      <h2 class="title">{{ shutterbugg.title }}</h2>
      <p class="developer">{{ shutterbugg.developer }}</p>
      <p class="price">{{ shutterbugg.price | currency }}</p>
    </div>

    <div class="card">
      <img class="icon" ng-src="{{ gameboard.icon }}">
      <h2 class="title">{{ gameboard.title }}</h2>
      <p class="developer">{{ gameboard.developer }}</p>
      <p class="price">{{ gameboard.price | currency }}</p>
```

- looking at the view, the same code is written over and over again to display each app. This is repetitive and error-prone. Let's fix this.<br><br>
위처럼 view를 구현할 경우, 쓸데없이 반복적이고, 에러를 유발할 수 있다. 
고쳐보기! 

##### js/directives/appInfo.js 

```
app.directive('appInfo', function(){
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'js/directives/appInfo.html'
  };
});
```

- we made a new *directive*. We used `app.directive` to create a new directive named `'appInfo'`. <br> 
It returns an object with three options.<br><br>
app.directive으로 이름이 appInfo인 새 디렉티브를 만들었다. <br>
이는 다음 세 옵션을 가진 객체를 반환한다. 

1. `restrict` specifies how the directive will be used in the view.<br> The `'E'` means it will be used as a new HTML element.<br><br>
restrict(뜻: 제한하다)는 어떻게 디렉티브가 view에서 사용될지 명시한다. <br>
'E'는 html의 새로운 요소(element)처럼 사용될 것이라는 의미이다. 

1. scope specifies that we will pass information into this directive through an attribute named info.<br> The `=` tells the directive to look for an attribute named info in the `<app-info>` element, like this:<br>
The data in `info` becomes available to use in the template given by `templateURL`.<br><br>
scope는 info속성을 통해 이 디렉티브에서 정보를 통과하도록 명시한다. <br> = 는 디렉티브가 `<app-info>` 요소 내에서 info 속성을 찾는 것을 말한다. 
info안의 데이터는 templateURL에 주어진 템플릿에서 사용되기 위해 이용가능하게 된다.

1. `templateUrl` specifies the HTML to use in order to display the data in `scope.info`. Here we use the HTML in `js/directives/appInfo.html`.<br><br>
templateUrl은 scope.info의 데이터가 순서대로 사용되도록 한다. <br>


##### js/directives/appInfo.html

```
<img class="icon" ng-src="{{ info.icon }}"> 
<h2 class="title">{{ info.title }}</h2> 
<p class="developer">{{ info.developer }}</p> 
<p class="price">{{ info.price | currency }}</p>
```

##### index.html 수정하기 

```
<div class="card">
  <app-info info="move"></app-info>
</div>

<div class="card">
  <app-info info="shutterbugg"></app-info>
</div>

<div class="card">
  <app-info info="gameboard"></app-info>
</div>
```

- Then in index.html we use the new directive as the HTML element `<app-info>`. We pass in objects from the controller's scope into the `<app-info>` element's `info` attribute so that it displays.<br><br>
새 디렉티브를 사용해서 `<app-info>` html 요소를 사용하였다. <br>
app-info 요소의 info 속성으로 컨트롤러의 스코프로 부터 객체를 pass해 display한다. 

- 그렇다면 본인만의 directive를 만드는 것이 유용한가?

 1. **Readability**.<br> Directives let you write expressive HTML. Looking at index.html you can understand the app's behavior just by reading the HTML.<br><br>
알아보기 쉽다. <br>
디렉티브는 html 표현식을 쓰게 해준다. index.html을 보면 앱의 behavior를 단지 html을 읽는 것만으로 이해할 수 있게 해준다. 

 2. Reusability.<br> Directives let you create self-contained units of functionality. We could easily plug in this directive into another AngularJS app and avoid writing a lot of repetitive HTML.<br><br>
재사용할 수 있다. <br>
디렉티브는 기능 단위를 독립적으로 만들 수 있게 해준다. 우리는 다른 앵귤러 앱에서 이 디렉티브로 쉽게 기능을 확장할 수 있다. 그리고 많은 html 반복 코드를 피할 수 있다. 

### 4_ Built-in and Custom Directives

- We know that AngularJS comes with a few built-in directives like `ng-repeat` and `ng-click`.<br>
We've seen that AngularJS makes it possible to create your own custom directives, such as `<app-info>`.<br>
We can use Angular's built-in directives together with custom directives to create more readable apps.<br><br>
내장 디렉토리와 우리가 만든 디렉토리를 함께 사용하여 더욱 알아보기 쉬운 앱을 만들 수 있다. 

##### 컨트롤러에 다음과 같은 배열 프로퍼티 추가(코드 리펙토링 전에는 모두 따로 프로퍼티를 주었었다.)

```
$scope.apps = [
  {
    icon: 'img/move.jpg',
    title: 'MOVE',
    developer: 'MOVE, Inc.',
    price: 0.99
  },
  {
    icon: 'img/shutterbugg.jpg',
    title: 'Shutterbugg',
    developer: 'Chico Dusty',
    price: 2.99
  },
  {
    icon: 'img/gameboard.jpg',
    title: 'Gameboard',
    developer: 'Armando P.',
    price: 1.99
  },
  {
    icon: 'img/forecast.jpg',
    title: 'Forecast',
    developer: 'Forecast',
    price: 1.99
  }
]
```

##### index.html 코드 리펙토링 

```
<div class="card" ng-repeat="app in apps">
   <app-info info="app"></app-info>
</div>
```

### 5,6_installApp

- Directives are a core feature of AngularJS. So far we've used custom directives to simply display static content, but they can do more than this. It's possible to bake interactivity into directives.<br><br>
디렉티브는 앵귤러의 핵심 특성이다. <br>
지금까지 custom 디렉티브로 간단하게 정적인 콘텐츠만 보여줬지만 상호작용하게 할 수 있다.

##### js/directives/installApp.js

```
app.directive('installApp', function(){
  return {
    restrict: 'E',
    scope: {
    },
    templateUrl: 'js/directives/installApp.html',
    link: function(scope, element, attrs) {
      scope.buttonText = "Install",
      scope.installed = false,
      
      scope.download = function() {
        element.toggleClass('btn-active');
        if(scope.installed) {
          scope.buttonText = "Install";
          scope.installed = false;
        } else {
          scope.buttonText = "Uninstall";
          scope.installed = true;
        }
      }
    }
  }
});
```

- The `link` is used to create interactive directives that respond to user actions.<br><br>
네번째 옵션인 link는 상호작용하는 디렉티브를 만드는데 사용된다. 사용자의 액션에 반응하는 

- `function(scope, element, attrs)` 
 - `scope` : 새로운 프로퍼티들은 `$scope`에 attached되어, 디렉티브의 템플릿에서 사용 가능하게 된다. 
 - `element` : 디렉티브의 html 요소 
 - `attrs` : 요소의 속성을 담고 있다. 

 - `element.toggleClass('btn-active');` 

 > 이 디렉티브로 만든 `<install-app>`요소의 class에 토글된다. 


##### js/directives/installApp.html

```
<button class="btn btn-active" ng-click="download()">
  {{ buttonText }}
</button>
```

- 이 템플릿은 앵귤러의 내장 `ng-click` 디렉티브를 사용했다. 
- 앱이 인스톨되면 `download()`함수는 다음 세가지 일을 한다. 
 - toggles the `.btn-active` class
 - changes the button text to "Uninstall"
 - changes scope.installed to true

### 8_Generalizations (총괄)

- Directives are a powerful way to create self-contained, interactive components.<br>
Unlike jQuery which adds interactivity as a layer on top of HTML, AngularJS treats interactivity as a native component of HTML.<br><br>
디렉티브는 독립적이고 상호작용하는 구성요소를 만들 수 있는 강력한 방법이다. <br>
html의 상단에 레이어로 상호작용을 추가하는 jQuery와는 다르게 앵귤러는 html의 본래 구성요소와 같이 상호작용하도록 처리한다. 