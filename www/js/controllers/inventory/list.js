brewbox.controller('ListInventory', function($scope, $state, DataService) { 

        var fetchData = function () {
                $scope.inventory=DataService.ingredient.data
                
                $scope.types=$scope.inventory.map(function(i) { return i.type })
                $scope.types = $scope.types.filter(function(v,i) { return $scope.types.indexOf(v) == i; })
                
                $scope.selectedType=$scope.types[0]
                
        }

        $scope.$on('DataService:DataLoaded', fetchData)        
        if(DataService._loadcomplete) fetchData();
        

});