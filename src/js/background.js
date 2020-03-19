// let ntObj = {
//     type:     'basic',
//     iconUrl:  '/img/glass.png',
//     title:    'Time to Hydrate',
//     message:  'Everyday I\'m Guzzlin\'!',
//     buttons: [
//         {title: 'Keep it Flowing.'}
//     ],
//     priority: 0
// }

// const notificationOpts = {
//     type: "basic",
//     title: "Take A Drink",
//     message: "It's time to take a sip!",  
//     iconUrl: "/img/default_image.jpg"
// };

// chrome.alarms.onAlarm.addListener(function() {
//     // chrome.browserAction.setBadgeText({text: ''});
//     chrome.notifications.create(ntObj);
// });





// var sleepTime = -1;
// var displayIndef = false;
// var timer;
// var noteID;
// var fileName = "Default.mp3";
// var noteType = "both";

// var opt = {
//     type: "basic",
//     title: "Take A Drink",
//     message: "It's time to take a sip!",
//     iconUrl: "/img/default_image.jpg",
//     requireInteraction: false
// }

// //called when the first browser instance is started
// function onStartGo(){
// 	chrome.storage.sync.get(["time","soundName","noteType","keepNote"],function(obj){
// 		var name = obj.soundName;
// 		var type = obj.noteType;
// 		var keepNote = obj.keepNote;
// 		if(name != undefined){
// 			fileName = name;
// 		}
// 		if(type != undefined){
// 			noteType = type;
// 		}
// 		if(keepNote != undefined && keepNote){
// 			displayIndef = true;
// 		}
// 		var time = obj.time;
// 		if(time != undefined && time != -1){
// 			sleepTime = time * 60000;
// 			remind();
// 		}
// 	});
// }

// function go(mins){
// 	var found = false;
// 	sleepTime = mins * 60000;
// 	saveTime(mins);
// 	remind();
// }

// //save the time
// function saveTime(time){
//     chrome.storage.sync.set({"time": time});
// }

// //continuously called until it is stopped or another time is started
// function remind(){
//     if(timer)clearTimeout(timer);
//     // var audio = new Audio(fileName);
//     // if(noteType != "Visual"){
//     //     audio.play();
//     // }
//     if(noteType != "Audio"){
//         opt.requireInteraction = displayIndef;
//         if(noteID != undefined){
//             chrome.notifications.clear(noteID);
//         }
//         chrome.notifications.create(opt, function(id){noteID = id;});
//     }

//     timer = setTimeout(remind,sleepTime);
    
// }

// onStartGo();