brewbox.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('ui', {
                url: "/ui",
                abstract: true,
                templateUrl: "pages/MainUI.html"
        })

        
        $stateProvider.state('ui.brewday', {
                url: "/brewday",
                views: {
                        'centre-panel' :{
                                templateUrl: "pages/brewday/home.html",
                        }
                }
        })

        $stateProvider.state('ui.recipes', {
                url: "/recipes",
                views: {
                        'centre-panel' :{
                                templateUrl: "home.html",
                        }
                }
        })

        $stateProvider.state('ui.schedule', {
                url: "/brewday",
                views: {
                        'centre-panel' :{
                                templateUrl: "home.html",
                        }
                }
        })

        $stateProvider.state('ui.inventory', {
                url: "/inventory",
                views: {
                        'centre-panel' :{
                                templateUrl: "pages/inventory/list.html",
                                controller: "ListInventory"
                        }
                }
        })
        
        $stateProvider.state('ui.ingredient', {
                url: "/ingredient/:id",
                views: {
                        'centre-panel' :{
                                templateUrl: "pages/inventory/list.html",
                                controller: "ListInventory"
                        },
                        'right-panel': {
                                templateUrl: "pages/inventory/show.html",
                                controller: "ShowIngredient"
                        }
                }
        })


        $urlRouterProvider.otherwise("/ui/brewday");
})