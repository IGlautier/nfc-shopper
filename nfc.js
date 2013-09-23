var serviceList = [];

function serviceBound(service) {
	serviceList.push(service);
}

function serviceFound(service) {
	service.bindService({ onBind: serviceBound });
}

function findNFCService() {
	webinos.discovery.findServices(
		new ServiceType('http://webinos.org/api/nfc.read'),
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
	document.getElementById("result").innerHTML="successfully registered NFC event listener"; 
}

function fail () {
	document.getElementById("result").innerHTML="failed to register NFC event listener"; 
}

function nfcRead() {
	for (var s in serviceList) {
		var nfcTag = new serviceList[s].addListener(listener, success, fail);
	}
}

window.onload = findNFCService;