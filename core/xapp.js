define(["require", 'root'], function (require, root) {

  var MODULES_PATH;
  MODULES_PATH = "modules/";

  angular.module('x', ['prettifyDirective'])


    .run(function () {

      // Disable certain links in docs
      $('section [href^=#]').click(function (e) {
        e.preventDefault();
      });


      // Make code pretty
      window.prettyPrint && window.prettyPrint();
    })


    .controller('FooCtrl', [
      '$scope', '$http', function ($scope, $http) {
        var _loadDoc, _q, e$;

        _loadDoc = function (cat, mod) {
          var id, pathUrl;
          pathUrl = MODULES_PATH + cat + '/' + mod.dir + '/';
          id = pathUrl + 'doc/doc.js';
          root[id] = pathUrl;

          $scope[cat + 'Views'].push({
            navName: mod.name, fileName: '' + pathUrl + 'doc/doc', "tag": '' + cat + '-' + mod.dir
          });

          requirejs([id], function (dfd) {
            dfd.then(function () {

              console.log(id, "Loaded");

              if (!--_q) {
                $scope.$root.isLoading = false;
                $scope.$apply();

                setTimeout(function () {

                  // Sidebar
                  var $sidenav = $('.bs-docs-sidenav'), offset = $sidenav.offset(), width = $sidenav.width();
                  $sidenav.affix({offset: {top: offset.top - ($(window).width() <= 979 ? 20 : 70)}, width: width});

                }, 1000);
              }
            });
          });


        };

        $scope.directivesViews = [];
        $scope.filtersViews = [];
        $scope.introViews = [
          {navName: "Getting Started", fileName: 'setup'},
          {navName: "Global Defaults", fileName: 'defaults'},
          {navName: "IE Shiv", fileName: 'ieshiv'}
        ];
        $scope.$root.isLoading = true;

        //ui-codemirror
        $http.get("modules.json").success(function (d) {
          var _c, _d, _e, _len;
          _q = 0;
          for (_c in d.modules) {
            _d = d.modules[_c];
            for (_e = 0 , _len = _d.length, _q += _len; _e < _len; ++_e) {
              _loadDoc(_c, _d[_e]);
            }
          }
        });


      }]);


});


