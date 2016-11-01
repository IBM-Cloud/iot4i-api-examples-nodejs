var <shieldname>Safelet = function(payload) {
	return (payload.liquid_detected);
};

var <shieldname>EntryCondition = function(payload) {
	return (payload.liquid_detected);
};

var <shieldname>Message = function(payload) {
	return (constructMessage(payload, "<shieldname>", 'DemoHazard', 'A demo shield activated!'));
};

var <shieldname> = function(payload){
	var shield = getShieldByName("<shieldname>");
	return (commonShield(payload, shield));
};

registerShield(<shieldid>, "<shieldname>", <shieldname>EntryCondition, undefined, <shieldname>Safelet, <shieldname>Message, 5000);
