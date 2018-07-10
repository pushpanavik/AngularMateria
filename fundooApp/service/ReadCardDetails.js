app.service('JsonService', function($http) {
  return {
    read: function() {
      return $http.get("products.json")
      .then(function(response) {
        return response;
      });
    }
  };
});
