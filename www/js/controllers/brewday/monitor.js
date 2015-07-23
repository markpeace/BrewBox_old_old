brewbox.controller('Monitor', function($scope, $ionicModal, $state) { 


        $ionicModal.fromTemplateUrl('pages/brewday/manualControl.html', {
                scope: $scope,
                animation: 'slide-in-up'
        }).then(function(modal) {
                $scope.manualControlModal = modal;
        });
        
        $scope.hardwareReadings = {
                hlt: {
                        parameters: {
                                maximumVolume: 80,
                        },
                        readings: {
                                vol:30.232,
                                targetVolume:50,
                                temperature: 25.99,
                                targetTemperature: 82.333,
                                elementActive:true,
                                pumpActive:true,
                                inputValveOpen:true,
                                outputValveOpen:true
                        }
                }
        }

      
        $scope.calculateFullness = function() {
                var v= Math.round(-160+(($scope.hardwareReadings.hlt.readings.vol / $scope.hardwareReadings.hlt.parameters.maximumVolume)*320),0)
                if(isNaN(v)) {v=-160}
                return v
        }
        
        $scope.calculateTargetFullness = function() {
                var v= Math.round(-160+(($scope.hardwareReadings.hlt.readings.targetVolume / $scope.hardwareReadings.hlt.parameters.maximumVolume)*320),0)
                if(isNaN(v)) {v=-160}
                return v
        }

        $scope.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
                var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

                return {
                        x: centerX + (radius * Math.cos(angleInRadians)),
                        y: centerY + (radius * Math.sin(angleInRadians))
                };
        }

        $scope.describeArc = function(x, y, radius, startAngle, endAngle){

                var start = $scope.polarToCartesian(x, y, radius, endAngle);
                var end = $scope.polarToCartesian(x, y, radius, startAngle);

                var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

                var d = [
                        "M", start.x, start.y, 
                        "A", radius, radius, 0, arcSweep, 0, end.x, end.y
                ].join(" ");

                return d;       
        }        




});