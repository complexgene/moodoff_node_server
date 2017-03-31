
var express = require('../node_modules/express');
var app = express();
var admin = require('../node_modules/firebase-admin');
var date = require('../node_modules/date-and-time');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "moodoff-ff2cf",
    clientEmail: "firebase-adminsdk-pe0pt@moodoff-ff2cf.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCxdmuxdCm7HYzO\nuTj2Dgw1uY46CkKb8/IakhBe+BDewL2rQQidvUPNrwO+XfQEOycf2UfE2RMQHoHW\nYxZzf1C9MvIhIR2gO9kOHZ0N+zPbKXrkViHzpxMWmbnqw+PD/sQsvG9tW0R6QQDG\nNDc80mlU44MKSDfVUtWvaofj4QVJL3t71UxgzHH6oJh0evflBpwwntxh+0oEuDYk\noEikgZd/a5jgdVpSorsygpwxz1EBZCHXd5vNj422jm0Q1Nr6Cz3GTAP9KuS5JLVS\nLxezQzEdu/sE9rSCcvabOdtI8cl8PNKn1iv4B76hrWVW33jayA77jtcCc4Bk+ukx\nzrvEsy0bAgMBAAECggEBAIurZD8Z6e4256eb59TgYYO3MtVDVgFgEeAPrYrROpXW\npHCwkpNzbnXnlM6zK2ZZGAXdALtRDcvV9uJAwl7MiUMfYanpYmPGNqMBc6aZWsrW\n7r3ffIFDsaZL/yNiYVTUopmDBT/QYSjHGFDmr8LS58vD9FKXXDotI7kX4zPa2koq\nH7hiNmQ6xYHUjkEcdzfvqn4bgpn7TZ5oqnnux5KKbe4Bj5Ttl2fhkrKH+wzKa0pk\nHAjTJYLTjUzWSpt81KTP8sZNvwDtvgNXiFtaspTvD6PEoJ3cLclkAzDbx002Z/rq\nwEtug+Z7w16/Nh6Abc0qK3iUnxIHX911htr+prffxYECgYEA6rS/VuDKp8s7qbjB\noklpnhZFrjKoFCci62NpOvBWWjuhxnxf/gU6qDU2UrTWEPk8fbr+bSDCwIv8Hb1y\nT499EaC6XYmE5u4wq/1klr0Aj8ww7eBGRbXSiBnQ+FzFm1NYFU3QfVShm+G/1rEx\nhZgChi7a9MAGg6PNHCwvsl9+qGsCgYEAwZAk1a8XeukV9VDsS2bPi5WBGb/DdZWG\ny5DT8QzC6Ukw2WgMU3DWs0JpYhoFTN9cUWaCC3x+Q4GMTBnLkIKdJLXvVBHe0J9j\njOFkaWslAdP+X55m4WaieT3RCFwX56L0NXMK3fZJFQTiHidOADd5wO3lVqmMU0Sy\nIxm5eNDVehECgYEA4bs691y1rBGr7T0ThnjiyreTBsoTm2ZUkF2JHLV/58LIgbSn\nQhFXa+XZvEvOQn7jLe2FvAExLay0qwnEgj53xFd4RnP3zX6ycwf/EXbvrl1thasZ\nCvynYlyp/eSD7TKIWd0AMzoNQHYrYloDTgB4FQPFdHWnDj6hC4J30S9FCscCgYEA\nsxpOiw6tekRs1gZf7tEd3/mhcJL5KDcIeBn1kokNXVElCzX0mczCTTJ5UpXjK6NN\nx+BDGp/CMXKQv+Xqbzf8cfiKkE7Mzlt9gOEZyVWj85IWQKHQbmZKlkb1wXd9gw9M\nSpy9hG6cZv+SvvX9fcPXPAake9D8kBvzfPkTnlAWCBECgYA7LlqpfKU09vjDI/sZ\niTdquLGEQczxDByYBV5uSNbrcRc1SIc/TS4EnwsX96FUTW80w7fbMg1/zkVYvjrb\n7OvrofJ/Nkz97aWcK+KHTlUEwFnQsu7dawXxVMWfAVtzFiCKG3MjOvDFvnUDU8Rw\nYe6efGLzSZlsoRu+JtiHGDScXg==\n-----END PRIVATE KEY-----\n"
  }),
  databaseURL: "https://moodoff-ff2cf.firebaseio.com"
});

setInterval(abc,1000);

function abc(){
	var db = admin.database();
	var rr = db.ref("checkAlive");
	rr.once("value", function(snapshot) {
		var users = snapshot.val();
		var allNos = Object.keys(users);
		for(key in allNos) {
			var userPhoneNumber = allNos[key];
			var nodeTS = users[allNos[key]];		
			var dateAndTime = nodeTS.split('_');
			var yyyy = dateAndTime[0].split('-')[2],
			    mm = dateAndTime[0].split('-')[1] - 1,
      		            dd = dateAndTime[0].split('-')[0];
	
			var hh = dateAndTime[1].split(':')[0],
        	    	    mn = dateAndTime[1].split(':')[1],
        	            ss = dateAndTime[1].split(':')[2];
		
			var tillCurrentTime = new Date();
			var tillNodeTime = new Date(yyyy,mm,dd,hh,mn,ss,0);
			var diff = (tillCurrentTime.getTime() - tillNodeTime.getTime());
	 	 	if(diff > 15000) {
				var ref = db.ref("livefeed/" + userPhoneNumber + "/liveMoodFeeds/userLiveMood/");
				ref.update({
			   		"liveNow" : 0
				});
			} 
		}
	});
}

