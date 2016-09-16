var DEMO_SHIELD_NAME = "demoshield";
var DEMO_SHIELD_DELAY = 5000;
var DEMO_SHIELD_UUID = 26;
var demoSafelet = function(payload) {
	return (payload.liquid_detected);
};
var demoEntryCondition = function(payload) {
	return (payload.liquid_detected);
};
var demoMessage = function(payload) {
	return (constructMessage(payload, DEMO_SHIELD_UUID, 'DemoHazard', 'A demo shield activated!'));
};
var demoShield = function(payload){
	var shield = getShieldByName(DEMO_SHIELD_NAME);
	return (commonShield(payload, shield));
};
registerShield(DEMO_SHIELD_UUID, DEMO_SHIELD_NAME, demoEntryCondition, undefined, demoSafelet, demoMessage, DEMO_SHIELD_DELAY);
