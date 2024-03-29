brewbox.factory('HardwareInterface', function($http, $interval) {

        var settings = {
                activated: false,
                pulseInterval: 1000,
                requestsMade: 0,
                server: 'http://mptoolbox.herokuapp.com/telnet/bowerfold.dlinkddns.com'
        }

        var pulse = 0;
        
        var hardwareReadings= {
                hlt: {parameters:{}, readings: {}},
                msh: {parameters:{}, readings: {}}
        }

        var requestQueue = 
            [{
                    port: 151,
                    command: "HLT EMU 1",
                    assignResponseTo: "nothing"
            },{
                    port: 151,
                    command: "HLT SET VOL 80",
                    assignResponseTo: "nothing"
            },{
                    port: 151,
                    command: "HLT SET TEMP 10",
                    assignResponseTo: "nothing"
            },{
                    port: 151,
                    command: "HLT PARAMETERS",
                    assignResponseTo: "hardwareReadings.hlt.parameters",
                    requeueAfterProcessing: false,
            },{
                    port: 151,
                    command: "HLT PING",
                    assignResponseTo: "hardwareReadings.hlt.readings",
                    requeueAfterProcessing: true,
            }]

        processRequest = function () {

                settings.requestsMade++;        

                if (requestQueue.length==0) { return; }

                var currentRequest = requestQueue[0];

                requestQueue.splice(0,1)


                $http({method: 'GET', url: settings.server+"/"+currentRequest.port+"/"+currentRequest.command }).success(function(result) {                        
                        if (currentRequest.assignResponseTo) eval(currentRequest.assignResponseTo + "=" + JSON.stringify(result));                                 
                        if (currentRequest.requeueAfterProcessing) requestQueue.push(currentRequest);
                })          

        }
        if (!settings.activated) { settings.activated=true; $interval(processRequest, settings.pulseInterval)}        

        return {
                settings: settings,
                requestQueue: requestQueue,
                pulse: pulse,
                hardwareReadings: function() { return hardwareReadings }
        }


});