//global variables============================================================
var animalList = ['cat', 'dog', 'snake', 'pangolin', 'hedgehog'];
var searchTerm;
var obj;
var g;
//functions===================================================================

function writeTags (){
	let tags = document.getElementById('tags')
	tags.innerHTML = '';
	for(var i = 0; i < animalList.length; i++){
		var a = animalList[i];
		console.log(a);
		var b = document.createElement('button');
		b.setAttribute('class', 'animal');
		b.setAttribute('value', a);
		b.setAttribute('onClick', "assignSearchTerm(value)")
		b.textContent = a;
		tags.appendChild(b)
	};
};

writeTags ();

function assignSearchTerm(param){
	searchTerm = param;
	makeRequest(searchTerm);
};

function writeGifs(p){
	g = document.getElementById('display1');
	console.log(g);
	console.log('p = ' + p)
	// g.innerHTML = ' ';
	for(i = 0; i < p.data; i++){
		console.log(p.data)
		//create div, img and rating tag
		let d = document.createElement('div');
		let e = document.createElement('img');
		let f = document.createElement('h3');
		//attach gif data to img tag
		e.setAttribute('src', p.data[i].images[fixed_height_still].url);
		e.setAttribute('data-still', p.data[i].images[fixed_height_still].url);
		e.setAttribute('data-annimate', p.data[i].images[fixed_width].url);
		console.log(e)
		//setting h3 as the rating;
		f.textContent = p.data[i].rating;
		//append rating to div
		d.appendChild(f);
		//apend img to div
		d.appendChild(e);
		//append div to dsiplay1
		g.appendChild(d);
	}
}

var xhr;
function makeRequest(param){
		xhr = new XMLHttpRequest();

		if(!xhr){
			console.log('unable to establish XMLHTTP instance');
			return false;
		}
		xhr.onreadystatechange = logContents;
		xhr.open('GET', 'https://api.giphy.com/v1/gifs/search?api_key=Iosq0tp0oilzY4tFD0egb9mNJrpCmuhF&q='+ param +'&limit=10&offset=0&rating=PG-13&lang=en', true);
		xhr.send()
	}

	function logContents(){
		if(xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200){
				
				obj = JSON.parse(xhr.response);
				console.log(obj);
				writeGifs(obj);

			} else {
				console('request failed')
			};
		};
	};

//-======event listeners=======-\\

var submit = document.getElementById('submit')
submit.addEventListener('click',function (event){
	var newTag = document.querySelector('#newTag').value;
	animalList.push(newTag);
	writeTags();
	event.preventDefault();
});