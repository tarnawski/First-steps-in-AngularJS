(function ()
{
    'use strict';

    angular
        .module('iBrowser.single')
        .controller('SingleController', SingleController);

    /** @ngInject */
    function SingleController($scope, $stateParams, songsDataService, artistDataService, ngAudio)
    {
        var otherInAlbum;
        songsDataService.getSongInformation().search({ id: $stateParams.id}, function(data) {
          data.results[0]['oryginalImage'] = data.results[0].artworkUrl100.replace("100x100", "400x400");
          data.results[0]['audio'] = ngAudio.load(data.results[0].previewUrl);
          otherInAlbum = songsDataService.getSongInAlbum().search({ id: data.results[0].artistId}, function(data) {
            var tmp = data.results
            return tmp;
          });

         data.results[0]['otherInAlbum'] = otherInAlbum;
         $scope.song = data.results[0];

         artistDataService.getArtist().search({ artist: data.results[0].artistName}, function(data) {
           if (data.error != 6){
           $scope.artistDescription = data.artist.bio.summary;
         }
         });

        });

    }
})();
