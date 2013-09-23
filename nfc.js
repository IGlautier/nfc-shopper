var serviceList = [];

function serviceBound(service) {
	serviceList.push(service);
}

function serviceFound(service) {
	service.bindService({ onBind: serviceBound });
}

function findNFCService() {
	webinos.discovery.findServices(
		new ServiceType('http://webinos.org/api/nfc.read'), // Only need read elements of NFC api
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

function success () { // If we succesfully register a new listener for an NFC service
	document.getElementById("result").innerHTML="successfully registered NFC event listener"; 
}

function fail () { // If we fail to register a new listener for an NFC service
	document.getElementById("result").innerHTML="failed to register NFC event listener"; 
}

function nfcRead() { // Cycle through available NFC services and attempt to add listener
	for (var s in serviceList) {
		var nfcTag = new serviceList[s].addListener(listener, success, fail);
	}
}

window.onload = findNFCService; // Get all NFC services)