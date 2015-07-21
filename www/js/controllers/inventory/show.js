brewbox.controller('ShowIngredient', function($scope, $state, DataService) { 

        var fetchData = function () {
                
        }

        $scope.$on('DataService:DataLoaded', fetchData)        
        if(DataService._loadcomplete) fetchData();
        

});