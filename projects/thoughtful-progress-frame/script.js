document.getElementById("photoUpload").addEventListener("change", event => {
	const reader = new FileReader();
	reader.onload = event => {
		const img = new Image();
		img.onload = () => {
			drawImage(img);
			applyOverlay();
		};
		img.src = event.target.result;
	};
	reader.readAsDataURL(event.target.files[0]);
});

const applyOverlay = () => {
	const overlayImage = new Image();
	overlayImage.crossOrigin = "anonymous";
	overlayImage.src = "./overlay.png";
	overlayImage.onload = () => {
		drawOverlay(overlayImage);
		displayAsPng();
	};
};

const drawImage = img => {
	const canvas = document.getElementById("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	const ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);
};

const drawOverlay = overlayImage => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);
};

const displayAsPng = () => {
	const canvas = document.getElementById("canvas");
	const pngUrl = canvas.toDataURL("image/png");
	const imgElement = document.createElement("img");
	imgElement.src = pngUrl;
	document.getElementById("result").appendChild(imgElement);
};
