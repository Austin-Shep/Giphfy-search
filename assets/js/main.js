//global variables============================================================
var animalList = ['cat', 'dog', 'snake', 'pangolin', 'hedgehog'];
var searchTerm;

//functions===================================================================

function writeTags (){
	for(var i = 0; i < animalList.length; i++){
		var a = animalList[i];
		console.log(a);
		var b = document.createElement('button');
		b.setAttribute('class', 'animal');
		b.setAttribute('value', a);
		b.setAttribute('onClick', "assignSearchTerm(value)")
		b.textContent = a;
		document.getElementById('tags').appendChild(b)
	};
};

writeTags ();

function assignSearchTerm(param){
	searchTerm = param;
	makeRequest(searchTerm);
};

function addNewTag(){
	var newTag = document.getElementById('newTag');
	animalList.push(newTag);
	writeTags();
};

var xhr;
function makeRequest(param){
		xhr = new XMLHttpRequest();

		if(!xhr){
			console.log('unable to establish XMLHTTP instance');
			return false;
		}
		xhr.onreadystatechange = logContents;
		xhr.open('GET', 'https://api.giphy.com/v1/gifs/search?api_key=Iosq0tp0oilzY4tFD0egb9mNJrpCmuhF&q='+ param +'&limit=10&offset=0&rating=PG-13&lang=en');
		xhr.send()
	}

	function logContents(){
		if(xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200){
				
				obj = JSON.parse(xhr.response);
				console.log(obj);

			} else {
				console('request failed')
			};
		};
	};


