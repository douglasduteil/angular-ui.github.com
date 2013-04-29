(function () {
  var _ = "vendor/";


  /* =Root storage
   -----------------------------------------------------------------------------*/
  define("root",
    function () {
      var registry = {};
      return registry;
    }
  );


  /* =Require css
   -----------------------------------------------------------------------------*/
  define("requireCss",
    function () {
      var registry = {}, loadCss;

      loadCss = function (url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
      };

      return function (url) {
        if (registry[url]) return;

        registry[url] = true;
        loadCss(url);
      };
    }
  );


  /* =Launcher
   -----------------------------------------------------------------------------*/
  requirejs(
    {
      baseUrl : '/',
      paths: {
        'jquery': _ + 'jquery.min',
        'twitter-bootstrap': _ + 'bootstrap',
        'prettyPrint': _ + 'prettify',
        'angular': _ + 'angular.min'
      },
      shim: {
        'core/xapp': { deps: ['twitter-bootstrap', 'core/prettifyDirective', 'angular'] },
        'core/prettifyDirective': { deps: ['prettyPrint', 'angular'] },
        'twitter-bootstrap': { deps: ['jquery'] }
      }
    },
    ['core/xapp'],
    function () {
      angular.bootstrap(document, ['x']);
    });

})();


