module.exports = {
	log: function (t, w, msg) {
		var pre;

		if (t == "r") pre = "REQUEST";
		else if (t == "e") pre = "ERROR";
		else if (t == "s") pre = "SENT";
		else if (t == "c") pre = "CREATE";
		else if (t == "l") pre = "LOGIN";
		else if (t == "d") pre = "DELETE";
		else if (t == "u") pre = "UPDATE";



		if (w == "s") console.log("\n # ================================================================ #");

		console.log("\n" + new Date() + "\n[" + pre + "] " + msg + "\n");

		if (w == "e") console.log(" # ================================================================ #\n");
	},
};