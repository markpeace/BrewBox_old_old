if (typeof cordova === 'object') {
        document.addEventListener("deviceready", function() {

                angular.bootstrap(document, ["brewbox"]);  

        },false);

} else {        
        angular.element(document).ready(function() {
                angular.bootstrap(document, ["brewbox"]);
        });
}

var brewbox = angular.module('brewbox', ['ionic', 'parseconnector'])

angular.module('Controllers', ['Models']);
angular.module('Models', ['wrapParse']); // At this point Parse is already integrated with Angular's lifecycle.

angular.forEach(['d', 'x', 'y', 'fill'], function(name) {
        var ngName = 'ng' + name[0].toUpperCase() + name.slice(1);
        brewbox.directive(ngName, function() {
                return function(scope, element, attrs) {
                        attrs.$observe(ngName, function(value) {
                                attrs.$set(name, value); 
                        })
                };
        });
});

//brewbox.run(function(HardwareInterface) {});