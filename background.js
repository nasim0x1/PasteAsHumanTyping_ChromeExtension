//createContexts();

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}
function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}
//function createContexts(){
reloadAllContexts();
function reloadAllContexts(){
  chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
      id:'paste',
      title: "Paste As Human Typing",
      contexts:["editable"],
    },
  pasteContext());
}

function pasteContext(){
  var storage = chrome.storage.local;
    storage.get('copies', function(result){
      var gottenCopies = result.copies;
      newarray = gottenCopies.reverse();
      for(var i in newarray){
        chrome.contextMenus.remove('pastes,' + i + ','+ newarray[i]);
      }
      for(var i in newarray){

              chrome.contextMenus.create({
                title: newarray[i],
                parentId: 'paste',
                id: 'pastes,' + i  + ','+ newarray[i],
                contexts: ["editable"],
              })
          }
    });
}
chrome.storage.onChanged.addListener(function(changes, namespace) {
  reloadAllContexts();
});




chrome.commands.onCommand.addListener(function(command) {
  if(command === "paste_last"){
    
    var storage = chrome.storage.local;

    storage.get('copies', function(result){
      var gottenCopies = result.copies;
      var currentcopy = gottenCopies.reverse()[0]
       chrome.tabs.executeScript(null, { 
         file: "jquery-3.2.0.min.js" },
          function() {

           for (var i = 0; i < currentcopy.length; i++) {

             chrome.tabs.executeScript(null, { 
               code: "var topaste =\"" + currentcopy[i]+ "\";" + "var $txt = $(':focus');var caretPos = $txt[0].selectionStart;var textAreaTxt = $txt.val();var txtToAdd = topaste;$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );"}) 
             wait(110);
             }
             
             });
           
});
  } 
});






chrome.contextMenus.onClicked.addListener(function(info, tab) {

      if(info.menuItemId.indexOf('paste') != -1){ 
         var storage = chrome.storage.local;

     storage.get('copies', function(result){
       var gottenCopies = result.copies;
       var currentcopy = gottenCopies.reverse()[Number(info.menuItemId.split(',')[1])]



        chrome.tabs.executeScript(null, { 
          file: "jquery-3.2.0.min.js" },
           function() {

            for (var i = 0; i < currentcopy.length; i++) {

              chrome.tabs.executeScript(null, { 
                code: "var topaste =\"" + currentcopy[i]+ "\";" + "var $txt = $(':focus');var caretPos = $txt[0].selectionStart;var textAreaTxt = $txt.val();var txtToAdd = topaste;$txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );"}) 
              wait(110);
              }
              
              });
            
});
}

});

