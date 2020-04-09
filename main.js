
$(document).ready(function() { /* code here */
  getStorage(); 
  $('#copy').focus();
  var snackbarContainer = document.querySelector('#demo-snackbar-example');
          Math.floor(Math.random() * 0xFFFFFF).toString(16);
      var data = {
        message: 'Welcome back, all copies loaded',
        timeout: 2000,
        actionHandler: function(){},
        actionText: 'OK'
      };
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
  });
  var storage = chrome.storage.local;
  
  
  function search(){
     var input, filter,li, a, m;
      input = document.getElementById('fixed-header-drawer-exp');
   filter = input.value.toUpperCase();
      input = filter;
      var size = document.getElementsByTagName('ul').length - 1;
      var ul = $('ul').each(function(k){
      li = $(this).find('li').each(function(){
        var text = $(this).text();
        text = text.toUpperCase();
        if(text.indexOf(input) == -1){
          $(this).css('display', 'none');
          var classname = $(this).attr('class');
          if(classname.indexOf('head') != -1 ){
            $(this).css('display', '');
          }
        }
        else{
          $(this).css('display', '');
        }
  
      });
      if(k == size){
        loading('stop');
      }
      });
  
  }
  
  function id(e){
    return document.getElementById(e);
  }
  id('addbutton').addEventListener('click', addCopy, false);
  
  id('copy').addEventListener('click', function(){
    if(id('copy').value == 'write something'){
  
      id('copy').value = '';
  
  
    }
    else{}
  }, false);
  
  id('copy').onkeypress = function(e) {
      if(e.keyCode == 13) {
          addCopy();
      }
  
  
  };
  
  function addCopy(copy){
    var copyText;
    if(!copy){
      copyText = id('copy').value;
  
    }
    else if(copy.length >0){
      copyText = copy;
  
    }
    else{
      if(id('copy').value.length > 0){
      copyText = id('copy').value;
      }
    }
    if(copyText){
    console.log(copyText);
    var $button2 = $("<button class='mdl-button mdl-js-button mdl-button--icon'><i class='material-icons delete'>delete</i></button>");
    var $button1 = $("<button class='mdl-button mdl-js-button mdl-button--icon'><i class='material-icons copy'>content_copy</i></button>");
    var $span1 = $("<span class='mdl-list__item-primary-content'></span>").text(copyText);
    var $span2 = $("<span class='mdl-list__item-secondary-action'></span>").append($button1).append($button2);
   var $li  =$("<li class='mdl-list__item'></li>").append($span1).append($span2)
   $('ul').prepend($li);
  
    $button2.on('click', function(){
      var copyToDelete = this.parentNode.parentNode;
      console.log(copyToDelete)
      var copyBody = copyToDelete.parentNode;
     copyBody.removeChild(copyToDelete);
    // this.parentNode.parentNode.removeChild()
     var snackbarContainer = document.querySelector('#demo-snackbar-example');
          Math.floor(Math.random() * 0xFFFFFF).toString(16);
      var data = {
        message: 'Copy deleted',
        timeout: 2000,
        actionHandler: function(){
          console.log(copyToDelete);
          copyBody.appendChild(copyToDelete)
          setStorage()
        },
        actionText: 'UNDO'
      };
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
      setStorage();
    });
    $button1.on('click', function(){
      var copytext = this.parentNode.parentNode.childNodes[0].innerText;
      console.log(copytext);
      id('copier').value = copytext;
      id('copier').focus();
      id('copier').select();
      document.execCommand("Copy");
  
    var snackbarContainer = document.querySelector('#demo-snackbar-example');
          Math.floor(Math.random() * 0xFFFFFF).toString(16);
      var data = {
        message: 'Text copied',
        timeout: 2000,
        actionHandler: function(){},
        actionText: 'OK'
      };
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
    });
  //  ul.appendChild(li);
    // ul.appendChild(hr);
     id('copy').value = '';
     //id('add').className = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded';
     id('copy').focus();
  setStorage();
  
  
  }}
  function setStorage(){
    var copyes = document.getElementsByTagName('li');
    var copies = [];
    for(var i=0; i<copyes.length; i++){
      var copy = copyes[i].childNodes[0].innerText;
      console.log(copy);
    // console.log(copy);
      copies.unshift(copy);
    }
    console.log(copies);
    storage.set({'copies': copies});
    //chrome.extension.getBackgroundPage().reloadContext();
    // storage.get({'copies': []}, function(result){
    //   var gottenCopies = result.copies;
    //   // console.log(gottenCopies);
    // });}
  }
    function getStorage(){
      storage.get('copies', function(result){
      var gottenCopies = result.copies;
      if(!gottenCopies){
      }
     
      var previousCopies = gottenCopies;
      for(var j=0; j<gottenCopies.length; j++){
      addCopy(gottenCopies[j]);
  }
    });

    }