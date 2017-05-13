(function () {
  'use strict';

  angular.module('BlurAdmin.pages.stats.teamProfile')
      .directive('fdInput',fileread);

  /** @ngInject */
  function fileread() {
    return {
        link: function (scope, element, attrs) {
            element.on('change', function  (evt) {
                var files = evt.target.files;
                console.log(files[0].name);
                console.log(files[0].size);
            });
        }
    };
  }
})();

//USE example: <input type="file" fileread="vm.uploadme" />
