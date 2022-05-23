		function handleFileSelect(evt) {
			var original = document.getElementById("original"),
				stego = document.getElementById("stego"),
				img = document.getElementById("img"),
				cover = document.getElementById("cover"),
				message = document.getElementById("message");
			if(!original || !stego) return;

			var files = evt.target.files; // FileList object

			// Loop through the FileList and render image files as thumbnails.
			for (var i = 0, f; f = files[i]; i++) {

				// Only process image files.
				if (!f.type.match('image.*')) {
					continue;
				}

				var reader = new FileReader();

				// Closure to capture the file information.
				reader.onload = (function(theFile) {
					return function(e) {
						img.src = e.target.result;
						img.title = escape(theFile.name);
						stego.className = "half invisible";
						cover.src = "";
						message.innerHTML="";
						message.parentNode.className="invisible";
						updateCapacity();
					};
				})(f);

				// Read in the image file as a data URL.
				reader.readAsDataURL(f);
			}
		}

        function copyText(){
            let cpText = document.getElementById("message");
            let text = cpText.innerText;
            console.log(text);
            let textArea = document.createElement('textarea');
            textArea.width = "1px";
            textArea.height = "1px";
            textArea.background = "transparents";
            textArea.value = text;
            document.body.append(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            let btnText = document.getElementById("copy");
            btnText.innerText = "Copied!";
        }

		function hide() {
			var stego = document.getElementById("stego"),
				img = document.getElementById("img"),
				cover = document.getElementById("cover"),
				message = document.getElementById("message"),
				textarea = document.getElementById("text"),
				download = document.getElementById("download");
			if(img && textarea) {
				cover.src = steg.encode(textarea.value, img);
				stego.className = "half";
				message.innerHTML="";
				message.parentNode.className="invisible";
				download.href=cover.src.replace("image/png", "image/octet-stream");
			}
		}

		function read() {
			var img = document.getElementById("img"),
				cover = document.getElementById("cover"),
				message = document.getElementById("message"),
				textarea = document.getElementById("text");
			if(img && textarea) {
				message.innerHTML = steg.decode(img);
				if(message.innerHTML !== "") {
					message.parentNode.className="";
					textarea.value = message.innerHTML;
					updateCapacity();
				}
			}
		}

		function updateCapacity() {
			var img = document.getElementById('img'),
				textarea = document.getElementById('text');
			if(img && text)
				document.getElementById('capacity').innerHTML='('+textarea.value.length + '/' + steg.getHidingCapacity(img) +' chars)';
		}

		window.onload = function(){
			document.getElementById('file').addEventListener('change', handleFileSelect, false);
			document.getElementById('hide').addEventListener('click', hide, false);
			document.getElementById('read').addEventListener('click', read, false);
			document.getElementById('text').addEventListener('keyup', updateCapacity, false);
			hide();
			updateCapacity();
		};