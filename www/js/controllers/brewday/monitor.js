brewbox.controller('Monitor', function($scope, $ionicModal, $state) { 


        $ionicModal.fromTemplateUrl('pages/brewday/manualControl.html', {
                scope: $scope,
                animation: 'slide-in-up'
        }).then(function(modal) {
                $scope.manualControlModal = modal;
        });

       
        $scope.volume=30;
        $scope.maximumVolume=80;
        $scope.temperature=24;
        $scope.elementActive=true;

        $scope.calculateFullness = function() {
                var v= Math.round(-160+(($scope.volume / $scope.maximumVolume)*320),0)
                if(isNaN(v)) {v=-160}
                return v
        }

        var polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
                var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

                return {
                        x: centerX + (radius * Math.cos(angleInRadians)),
                        y: centerY + (radius * Math.sin(angleInRadians))
                };
        }

        $scope.describeArc = function(x, y, radius, startAngle, endAngle){

                var start = polarToCartesian(x, y, radius, endAngle);
                var end = polarToCartesian(x, y, radius, startAngle);

                var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

                var d = [
                        "M", start.x, start.y, 
                        "A", radius, radius, 0, arcSweep, 0, end.x, end.y
                ].join(" ");

                return d;       
        }        




});