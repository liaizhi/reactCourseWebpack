
var foodApp=angular.module('foodModule',['ui.router'])
.run(function($rootScope){
    $rootScope.globaVar={
    	prefixImage:'http://tnfs.tngou.net/image',
        foodCategories:'http://10.30.154.80/food-categories.php',
        foodList:"http://10.30.154.80/food-list.php",
        foodDetail:'http://10.30.154.80/food-detail.php',
        askCategories:'http://10.30.154.80/ask-categories.php',
        askList:"http://10.30.154.80/ask-list.php",
        askDetail:'http://10.30.154.80/ask-detail.php',
        askNewsList:"http://10.30.154.80/ask-news-list.php"
        
    }
})
.config(function($stateProvider,$urlMatcherFactoryProvider,$urlRouterProvider){
	$urlMatcherFactoryProvider.caseInsensitive(true);
	$urlRouterProvider.otherwise('navbar.home');
	$stateProvider
	.state('navbar',{
		url:"/navbar",
		templateUrl:"template/navbar.html",
		controller:"navbarController",
         resolve:{
                employeesList:function($http,$rootScope){
                    return  $http({
                        url:$rootScope.globaVar.foodCategories
                    }).then(function(res){
                        return res.data.tngou;
                    })
                }
            }
	})
     // ask-news-list====最新资讯
	.state('navbar.home',{
		url:"/home",
		templateUrl:"template/home.html",
		controller:"homeController",
        resolve:{
             askNewsList:function($http,$stateParams,$rootScope){
                // console.log($stateParams.id);
                 return $http({
                      url:$rootScope.globaVar.askNewsList,
                  params:{
                         id:0
                     }
                 }).then(function(res){
                     // console.log(res);
                    return res.data;
                })
            }
        }
	})
    .state('navbar.foodList',{
        url:'/foodList/:id/:page',
        templateUrl:'template/foodList.html',
        controller:'foodListController',
        resolve:{
            foodList:function($http,$stateParams,$rootScope){
                return $http({
                    url:$rootScope.globaVar.foodList,
                    params:{
                        id:$stateParams.id,
                        page:$stateParams.page
                    }
                }).then(function(res){
                    return res.data;
                })
            }
        }
    })
    .state('navbar.foodDetail',{
        url:'/foodDetail/:id',
        templateUrl:'template/foodDetail.html',
        controller:'foodDetailController',
        resolve:{
            foodDetail:function($http,$stateParams,$rootScope){
                    console.log($stateParams.id)
                return $http({
                    url:$rootScope.globaVar.foodDetail,
                    params:{
                        id:$stateParams.id
                    }
                }).then(function(res){ 

                    return res.data;

                })
            }
        }
    })
    .state('navbar.ask',{
        url:'/ask',
        templateUrl:'template/ask.html',
        controller:'askController',
        // resolve:{
        //     ask:function($http,$stateParams,$rootScope){
        //             console.log($stateParams.id)
        //         return $http({
        //             url:$rootScope.globaVar.foodDetail,
        //             params:{
        //                 id:$stateParams.id
        //             }
        //         }).then(function(res){ 

        //             return res.data;

        //         })
        //     }
        // }
    })

})
.controller("navbarController",function($scope,employeesList){
     $scope.employees=employeesList;
})
//home Controller
.controller("homeController",function($scope,askNewsList){
    $scope.askNewsList=askNewsList.list;
    console.log(askNewsList);
})
.controller("foodListController",function($scope,foodList,$stateParams){
    $scope.foodModule=foodList.tngou;
    $scope.total = foodList.total;
    console.log(foodList);
    pageList = [];
    for (var i = 1; i <= Math.ceil(foodList.total/30); i++) {
        pageList.push(i);
    };
    $scope.pageList = pageList;
    $scope.id = $stateParams.id;
})
.controller("foodDetailController",function($scope,foodDetail){
    $scope.foodDetail=foodDetail;
    console.log(foodDetail);
})
.controller("askController",function($scope){
	console.log(222);
})
