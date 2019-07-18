const module = angular.module('app', []);

module.controller('AppController', ['$scope', AppController]);

function AppController($scope){
    $scope.toppings = [
        {label: "Tomatoes ( $1.00)", price: 1, type: "veg"},
        {label: "Onions ($0.50)", price: 0.5, type: "veg"},
        {label: "Bell pepper ($1.00)", price: 1, type: "veg"},
        {label: "Mushrooms ($1.20)", price: 1.2, type: "veg"},
        {label: "Pineapple ($0.75)", price: 0.75, type: "veg"},
        {label: "Sausage ($1.00)", price: 1, type: "non-veg"},
        {label: "Pepperoni ($2.00)", price: 2, type: "non-veg"},
        {label: "Barbecue chicken ($3.00)", price: 3, type: "non-veg"}
    ];
    $scope.pizzas = [
        {label: "Small ($5)", price: 5},
        {label: "Medium ($7)", price: 7},
        {label: "Large ($8)", price: 8},
        {label: "Extra Large ($9)", price: 9}
    ];
    $scope.offers = [
        {label: "Offer1", pizza: "Medium ($7)", totalToppings: 2},
        {label: "Offer2", pizza: "Medium ($7)", totalToppings: 4},
        {label: "Offer3", pizza: "Large ($8)", totalToppings: 4},
    ]
    $scope.getTotal = function(pizza){
        let total = $scope.toppings.reduce(function(aggTotal, topping){
            if(pizza[topping.label])
                return aggTotal + topping.price;
            return aggTotal;
        }, 0);
        if(total > 0) {
            total = total + pizza.price;
            let discount = getDiscountTotal(pizza, total);
            const data = { total: `$${total}` };
            if(discount.discountedTotal !== total && discount.offer !== null)
                data.discountedTotal = `$${discount.discountedTotal}`;
                data.offer = discount.offer;
            return data;
        }
        return { total: 0 , discountedTotal: 0 , offer: null};
    };
   
    function getDiscountTotal(pizza, total){
        let discountedTotal = 0
        let offer = null ;
        const totalToppings = getToppingsCount(pizza);
        if(pizza.label === "Medium ($7)" && totalToppings === 2) {
            discountedTotal = 5;
            offer = "Offer1";
        }
        if(pizza.label === "Medium ($7)" && totalToppings === 4) {
            discountedTotal = 9;
            offer = "Offer2";
        }
        if(pizza.label === "Large ($8)" && totalToppings >= 4) {
            discountedTotal = (total * 0.5);
            offer = "Offer3";
        }
        return {discountedTotal, offer};
    }
    function getToppingsCount(pizza){
        return $scope.toppings.reduce(function(aggToppings, topping){
            if(pizza[topping.label]){
                return aggToppings + 1;
            }
            return aggToppings;
        }, 0);
    }
}

