brewbox.controller('Home', function($scope, $ionicModal, $state) { 


        $ionicModal.fromTemplateUrl('pages/brewday/manualControl.html', {
                scope: $scope,
                animation: 'slide-in-up'
        }).then(function(modal) {
                $scope.manualControlModal = modal;
        });


});