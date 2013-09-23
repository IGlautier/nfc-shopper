var serviceList = [];

function serviceBound(service) {
	serviceList.push(service);
}

function serviceFound(service) {
	service.bindService({ onBind: serviceBound });
}

function findNFCService() {
	webinos.discovery.findServices(
		new ServiceType('http://webinos.org/api/nfc'),
		{ onFound: serviceFound }
	);
}

function listener (event) {
	var tag = event.tag;  // object proxying the NFC Tag
	console.log("tag technology: " + tag.tech);
	tag.close = function () {
		console.log("lost contact with the Tag");
	};
}

function success () {
	alert("successfully registered NFC event listener");
}

function fail () {
	alert("failed to register NFC event listener");
}

function listen() {
	webinos.nfc.addListener(listener, success, fail);
}
	