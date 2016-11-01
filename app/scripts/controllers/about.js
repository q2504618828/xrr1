angular.module('denglApp').controller("cen",['$scope','$http','server','$cookies','$cookieStore','$state',function ($scope,$http,server,$cookies,$cookieStore,$state) {
	if($cookies.get('username',$scope.updata)&&$cookies.get('password',$scope.updata)){
		$state.go('c')
	}
   $scope.fn=function(){
		$http({
			url:server+"/users/login",
			method:"POST",
			data:$scope.updata
		}).success(function(e){
			if($scope.check==true){
				$cookies.put('username', $scope.updata)
				$cookies.put('password', $scope.updata)
				var expireDate = new Date();
				expireDate.setDate(expireDate.getDate() + 6);
				$cookies.put('username', $scope.updata.username, {'expires': expireDate});
				$cookies.put('password', $scope.updata.password, {'expires': expireDate});
	        }
			$cookieStore.put("uid",e.uid);
			$state.go('c')
		})
	}
}]).controller("can",['$scope','$http','server','$state','$cookieStore',function ($scope,$http,server,$state,$cookieStore) {
	$scope.fn1=function(){
		$http({
			url:server+"/users",
			method:"POST",
			data:$scope.updata
		}).success(function(e){
			//debugger
			$state.go("a")
		})
	}
}]).controller("cmn",['$scope','$http','$state','$stateParams','server','$cookieStore',function ($scope,$http,$state,$stateParams,server,$cookieStore) {
	$scope.uid=$cookieStore.get("uid")
	$scope.updata={"uid":$cookieStore.get("uid")}
	var num=0;
		$http({
			url:server+"/item",
			method:"GET",
			params: {
				"$skip": num,
				"$limit": 10,
				"uid":$scope.uid
			}
		}).success(function(e){
            $scope.data = e
		})
	$scope.add=function(){
			$http({
			url:server+"/item",
			method:"POST",
			data:$scope.updata
		}).success(function(e){
		
			$state.go("c")
		})
	}
	 $scope.del=function(e){
		$http({
			url:server+"/item/"+e.id,
			method:"DELETE"
		}).success(function(){
            $scope.data.splice($scope.data.indexOf(e),1)
		})
	}
    $scope.eddata=$stateParams
		$scope.save=function(){
			$http({
			url:server+"/item/"+$scope.eddata.id,
			method:"PUT",
			data:$scope.eddata
		}).success(function(){
			$state.go("c")
		})
	}
   $scope.left=function(){
   	 num -= 10;
   	 if(num<=0){
   		num=0;
   	}

		$http({
			url: server+"/item",
			method: "GET",
			params: {
				"$skip": num,
				"$limit": 10,
				"uid":$scope.uid
			}
		}).success(function(e) {
			$scope.data = e
		})
   }
   $scope.right=function(){
     if($scope.data&&$scope.data.length==10) {
       num += 10;
     }
       $http({
			url: server+"/item",
			method: "GET",
			params: {
				"$skip": num,
				"$limit": 10,
				"uid":$scope.uid
			}
		}).success(function(e) {
			$scope.data = e
		})
   }

}])
