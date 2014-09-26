var app = {

          initialize: function() {
              this.bindEvents();
          },
         
          bindEvents: function() {
              var takePhoto = document.getElementById('takePhoto');
              takePhoto.addEventListener('click', app.takePhoto, false);
              var sendPhoto = document.getElementById('sendPhoto');
              sendPhoto.addEventListener('click', app.sendPhoto, false);
              var removePhoto = document.getElementById('removePhoto');
              removePhoto.addEventListener('click', app.removePhoto, false);
              var choosePhoto = document.getElementById('choosePhoto');
              choosePhoto.addEventListener('click', app.choosePhoto, false);
          },

          sendPhoto: function() {
              alert('Imagen enviada al servidor: ');
          },

          takePhoto: function(){
              alert("procederemos a abrir la camara");
              navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 20, 
                  allowEdit: true, destinationType: navigator.camera.DestinationType.DATA_URL });
          },
          removePhoto: function(){
            var photo = document.getElementById('photo');

            photo.style.display = 'none';

            photo.src = "";

            var sendPhoto = document.getElementById('sendPhoto');
            sendPhoto.style.display = 'none';

            var removePhoto = document.getElementById('removePhoto');
            removePhoto.style.display = 'none';
          },

          choosePhoto: function(){
            navigator.camera.getPicture(app.onPhotoURISuccess, app.onFail, { quality: 10, 
        destinationType: navigator.camera.DestinationType.DATA_URL, sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
          },

          onPhotoURISuccess: function(imageURI) {

            var photo = document.getElementById('photo');

            photo.style.display = 'block';

            console.log(imageURI);

            photo.src = "data:image/jpeg;base64," + imageURI;

            var sendPhoto = document.getElementById('sendPhoto');
            sendPhoto.style.display = 'inline-block';

            var removePhoto = document.getElementById('removePhoto');
            removePhoto.style.display = 'inline-block';
          },

          onPhotoDataSuccess: function(imageData) {
         
            var photo = document.getElementById('photo');

            photo.style.display = 'block';

            photo.src = "data:image/jpeg;base64," + imageData;

            var sendPhoto = document.getElementById('sendPhoto');
            sendPhoto.style.display = 'inline-block';

            var removePhoto = document.getElementById('removePhoto');
            removePhoto.style.display = 'inline-block';
            
          },

          onFail: function(message) {
            alert('Failed because: ' + message);
          }

      };