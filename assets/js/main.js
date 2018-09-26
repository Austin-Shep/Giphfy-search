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
				// console.log(obj);

				function writeGifs(){
					g = document.getElementById('display1');
					g.innerHTML = '';
					// console.log(g);
						(obj.data).forEach(index => {
							// console.dir(index);
							let d = document.createElement('div');
							let e = document.createElement('img');
							let f = document.createElement('h3');
							d.setAttribute('class', 'gifDiv')
							f.textContent = 'rating: ' + index.rating;							
							e.setAttribute('src', index.images['fixed_height_still'].url)
							e.setAttribute('data-still', index.images['fixed_height_still'].url)
							e.setAttribute('data-animate', index.images['fixed_height'].url)
							e.setAttribute('data-state', 'still');
							e.setAttribute('class', 'gif')
							d.appendChild(f);
							d.appendChild(e);
							g.appendChild(d);
							
						});
				};

				writeGifs();

			} else {
				console('request failed')
			};
		};
	};

//-======event listeners=======-\\
	
	//==users tags listener=\\
var submit = document.getElementById('submit')
submit.addEventListener('click',function (event){
	var newTag = document.querySelector('#newTag').value;
	animalList.push(newTag);
	writeTags();
	event.preventDefault();
});

	//====play/pause====\\
document.querySelector('#display1').addEventListener('click', function(event){
	let img = event.target.closest('img');
	if (!img) return;
	console.log(img)
	var state = img.getAttribute('data-state');
	var still = img.getAttribute('data-still');
	var animate = img.getAttribute('data-animate');
	if(state == 'still'){
		img.setAttribute('data-state', 'animate');
		img.setAttribute('src', animate);
	}else{
		img.setAttribute('data-state', 'still');
		img.setAttribute('src', still); 

	}
});

//pusedocode for animating and pausing gif
//== gif on click, if data-state:still > set src to the data-animate and state to animate. else >set src to data-still and state to still.

//psuedocode for favoriting===============
//== button.fav on 'click' run=> cookie, assign this(div.gifDiv) the class of '.favorite'=> if div.gifDiv contains '.favorite' append the thumbnail to 'div.favorite'. store 'div.favorite' as cookie