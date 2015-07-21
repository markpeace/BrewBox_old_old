brewbox.service('DataService', function($rootScope, $ionicLoading, ParseConnector, $q, $state, $ionicLoading) {

        $ionicLoading.show({
                template: 'Updating...'
        });

        var model = {}

        ParseConnector.initialise({
                
                app_id: "pFnIxviBsVuoWtTfQyW5U7wyUzpzGneij21rMydC",
                javascript_key: "StMmafvJ0DDBIlVkey0EpF6nYbTBySFTmQSN9lhn"

        }).then(function(returned_model) {

                createModels(returned_model)
        
        })


        var definitions = {             
                ingredient: {
                        table: 'Ingredient',
                        delay_relationship_load: true,
                        attributes: {
                                name: {},
                                type: {},
                                amount: {},
                                //onHand: {},
                                present: {},
                                parent: { link_to: 'Ingredient' },
                                childCount: {},
                                children: { link_to: [ 'Ingredient' ] }
                        }
                }
        }

        var createModels = function(returned_model) {

                $ionicLoading.show({
                        template: 'Updating...'
                });

                var promises = []

                for(m in definitions) { 
                        definitions[m].parse_update_delay=0;
                        window.localStorage.removeItem(definitions[m].table)
                        model[m] = new ParseConnector.Model(definitions[m]); 
                        promises.push(model[m].cache_promise) 
                        promises.push(model[m].relationship_update_promise) 
                }

                $q.all(promises).then(function() {

                        $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
                                model.user.token = data.token
                                model.user.save();
                        });


                        model._loadcomplete=true;
                        console.log(model)   

                        $ionicLoading.hide();

                        $rootScope.$broadcast('DataService:DataLoaded');
                })

        }

        model.rebuildAll=function() {

                for(m in definitions) { 
                        window.localStorage.removeItem(definitions[m].table)
                }

                createModels()
        }

        return model;   

});