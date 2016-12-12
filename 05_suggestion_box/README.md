# AngularJS Project
codecademy pro AngularJS Final Project 과정을 통한 level up 

## 목표 
- submit your suggestion. // user로 부터 제안을 받을 수 있다. 
- upvote. // 각 제안에 좋아요를 누를 수 있다. 
- most upvoted suggestions to rise to the top. // 좋아요가 많은 순서대로 보여진다. 
- comment. // 각 제안에 덧글을 달 수 있다. 

## Setup

- AngularJS 다운 받기 등 

## Program Design

####  MVC 패턴 
- 앵귤러 앱은 MVC (Model, View, Controller) 패턴을 구현한다. 이 것은 웹 애플리케이션을 구성하는 일반적인 방법이다. 
- Model : 실제 데이터를 반영한다. 원시 데이터를 저장하고 앱의 필수 구성 요소를 정의 하는 등 
- View : 사용자와 직접 상호 작용하는 모든 기능이 구성된다.
- Controller : 모델과 뷰 사이에서 연결 역할을 한다. 사용자의 입력을 받아 그것으로 무엇을 할지 등. 애플리케이션의 두뇌 역할을 한다. 
- MVC는 웹 앱의 작동 방식에 대해 생각하게 하여 앱을 설계하는데 도움을 준다. 

- 예를 들어 to-do 앱을 만든다고 하자. 
 - Model : task, list 등 
 - view : to do list가 어느 폰트, 컬러로 보여지는 것 
 - controller : 어떻게 task를 추가할 것인가, 완료 등.. view에서 버튼을 누르면 model이 추가된다 등 

- 각 MVC 방식 파트로 나눠 작업한다. 
- 앵귤러는 MVC패턴을 따르고 있다. 
- servises : data를 보유. 즉, Model이다. 
- html : view를 마크업한다. 
- controller : controller :) 

#### 프로젝트에 대한 아이디어 
- view : 제안 리스트를 보여준다. 
- input이 필요한다. (제안 남기기)
- upvote 할 수 있어야 한다. 
- comment를 달 수 있어야 한다. 

#### 이 아이디어를 code화 시켜보자. 
- view : html file. 컨트롤러로 부터 제안 리스트를 받아 출력시킨다. 
- input : 앱의 model (data) 로 부터 업데이트 받아야 한다. 컨트롤러는 view와 model사이의 중개자 역할을 하므로, 업데이트시 컨트롤러를 사용한다. 
- upvote : model에 좋아요 수를 변경하는 버튼 추가 
- comment : 다른 view를 추가 시킬 routing이 필요하다. 

- 제안 리스트
 - view : index.html 파일
 - controller : 제안 아이템 action을 위한 controller
- comments
 - view : comment.html 파일. 댓글을 볼 수 있다.
 - controller : 댓글 action을 위한 controller
- 제안과 댓글 저장
 - service : data 저장

## Build My App

#### 폴더 구조 
- 프로젝트 명 폴더 
- views, css, img, js 폴더 
- js / app.js파일, controllers, services, vendor 폴더

#### build 
1. app.js 
 - 모듈 정의 

2. main controller 
 - 메인 컨트롤러 정의 

3. html
 - angular.js, ng-app, ng-controller, {{ 표현식 }} 으로 view 

4. service 
 - 우선 demo data로 앱의 기능을 테스트해보자. (service에 우선 직접 데이터를 입력해서 테스트)
나중엔 json 데이터로 불러들이게 된다. 

 - js/suvices/suggestion.js
 - 변수를 선언해서 JSON 객체를 저장한다. 
 - 이 데이터를 return한다. 

5. display the contents of the service 
	- html파일에서 위에서 만든 service파일을 링크시킨다. 
	- controller에 service(data) 연결시킨다. 
	- controller내부에 view에서 게시물을 볼 수 있도록 객체를 생성한다. <br>
	 > 예) $scope.posts = suggest.posts; // 이름이 posts인 앵귤러 객체를 만들어 이름이 suggest인 service의 posts (json 객체) 값을 넣는다.  
	- html에서 ng-repeat를 사용해서 service의 data내용을 출력시켜보자. 

6. 좋아요 순으로 정렬되게 하기 
	- view에서 filter, orderBy로 정렬한다. 

7. 입력받아 submit 하기 

	view에서 아래 예처럼 input에 제안을 입력하고 button을 누르면 submit되게 한다. 

	```
	<form ng-submit="addSuggestion()">
		<input type="text" ng-model="title"></input>
		<button type="submit">suggest</button>
	</form>
	```

	- ng-model="title" // input에 사용자가 입력하면 service/model내의 title 표시 
	- controller에서 addSuggestion() 함수 정의 하기
	 - 함수 기능 : input에 내용적으면 $scope.posts.push() 하기. title update.  
	 - [push 메소드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

8. Upvote(좋아요, 찬성) 기능 추가하기 
	- view에서 ng-click="upVote(post)", {{post.upvotes}}
	- controller에서 +1 시키는 함수 추가 

9. comment 기능 추가하기 
	- multiple pages를 위한 routing 필요, service에 comment추가, comment를 위한 controller필요

 - Route 추가 
	1. html에 angular-route.min.js 링크 
	2. app.js에 ngRoute 추가 
	3. html에 ng-view 추가, 원래 있던 코드는 다른 html파일로 만들기 
	4. app.js에 controller와 templateURL 연결 
	5. 기존과 같이 결과가 잘 나오는지 확인한다.  

 - controller 추가 
  - /suggestion/:id, addComment 함수 
 - 템플릿 html 추가 

10. Debugging the app
 - 크롬 개발자도구 등에서 테스트하면서 작업한다.

## Test My App
 - 테스트를 해보며 필요한 기능 등을 추가, 수정 한다. 
 - firebase등으로 실제 구현이 가능하도록 해보면 좋을 것 같다. 