function Push(){
	this._listeners = new Object();
	this._appToken = '';
};

Push.prototype.register = function(e){
	this._appToken = e.deviceToken;
	this.fireEvent('register', e);
};

Push.prototype.unregister = function(){
	this.fireEvent('unregister');
};

Push.prototype.errors = function(e){
	this.fireEvent('errors', e);
};

Push.prototype.received = function(e){
	this.fireEvent('received', e);
};

Push.prototype.enable = function(boolean){
	this.fireEvent('enable',{
		enabled: boolean,
		deviceToken: this.getAppToken()
	});
};

Push.prototype.addEventListener = function(name,listener){
	if(typeof this._listeners[name] == 'undefined'){
		this._listeners[name] = new Array();
	}

	this._listeners[name].push(listener);
};

Push.prototype.removeEventListener = function(name,listener){
	if(!(this._listeners[name] instanceof Array)){
		return;
	}

    for(var i = 0, total = this._listeners[name].length; total--; i++){
		if(this._listeners[name][i] === listener){
			this._listeners[name].splice(i,1);
		}
	}
};

Push.prototype.fireEvent = function(){
	var args = Array.prototype.slice.call(arguments);
	var event = {
		type: args[0],
		push: args[1]
	};

	if(!(this._listeners[event.type] instanceof Array)){
		return;
	}

	for(var i = 0, total = this._listeners[event.type].length; total--; i++){
		this._listeners[event.type][i].call(this,event);
	}
};

Push.prototype.getAppToken = function(){
	return this._appToken;
};

var push = new Push();

exports.register = function() {
	Titanium.Network.registerForPushNotifications({
	    types: [
	        Ti.Network.NOTIFICATION_TYPE_BADGE,
	        Ti.Network.NOTIFICATION_TYPE_ALERT,
	        Ti.Network.NOTIFICATION_TYPE_SOUND
	    ],
	    success: function(e) {
	        push.register(e);
		},
		error: function(e) {
	    	push.setErrors(e);
		},
		callback: function(e) {
			push.received(e);
	    }
	});
};

exports.addEventListener = function() {
	push.addEventListener.apply(push,arguments);
};

exports.removeEventListener = function() {
	push.removeEventListener.apply(push,arguments);
};

exports.fireEvent = function() {
	push.fireEvent.apply(push,arguments);
};

exports.setApiKey = function() {
	push.setApiKey.apply(push,arguments);
};

exports.getAppToken = function() {
	return push.getAppToken.apply(push,arguments);
};

exports.enable = function() {
	push.enable.apply(push,arguments);
};
