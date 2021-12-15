// Constant variables
constbaseImagesArr= ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg'],
		origImagesCount	=	baseImagesArr.length
		baseImagesDirPathForJs= '../images',
		baseImagesDirPathForHtml= 'images';

// Basics functions
const elementFastCreator = (elem, classes)=> {
	let e = $(elem)
	e.addClass(classes)
	return e
},
suffle = (arr) => {
	for (let i = 0; i<arr.length; i++) {
		let j= Math.floor(Math.random()*arr.length)
		let tmp	= arr[i]
		arr[i]= arr[j]
		arr[j]= tmp
	}
	return arr
};

// Flags
let	rectangleAlreadyClicked	= false,
		alreadyClickedElement= undefined,
		firstHideRectangleProcess= undefined,
		secondHideRectangleProcess= undefined,
		winClicksOfImages= [];

// Basics elements creation
let finalImagesArr= [],
	 div_class__wrapper = elementFastCreator("<div></div>", 'wrapper'),
	 div_class__container = elementFastCreator("<div></div>", 'container'),
	 div_class__game_body = elementFastCreator("<div></div>", 'game_body');
// -> Creating in iteration
// let div_class__rectangle	=elementFastCreator("<div></div>", 'rectangle')

// Pre main process
finalImagesArr = suffle($.merge(baseImagesArr, baseImagesArr))

// Main Code
$(document).ready(() => {
	$(document.body	).append(div_class__wrapper)
	$(div_class__wrapper).append(div_class__container)
	$(div_class__container).append(div_class__game_body)
	// creat rectangles with random images
	for(var i = 0; i < finalImagesArr.length; i++) {
		let div_class__rectangle = elementFastCreator("<div></div>", 'rectangle')
		$(div_class__rectangle).attr('data-img', finalImagesArr[i])
		div_class__rectangle.css({ 'background-image':`url('${baseImagesDirPathForHtml+'/'+finalImagesArr[i]}')` })
		// -> Hide image after 0.8s.
		setTimeout((e) => { e.addClass('hidden') }, 800, div_class__rectangle)
		// -> Add game action when we click on rectangle
		$(div_class__rectangle).on('click', () => { action($(div_class__rectangle)) })
		$(div_class__game_body).append(div_class__rectangle)
	}
})

function action(elem) {
	// -> Do nothing if image already opened.
	if (!($( elem ).hasClass( "hidden" ))) { return }
	// -> Show clicked image
	elem.removeClass('hidden')
	// -> true: Already we clicked some rectangle and that already opened.
	// -> false: We doesn't clicked some rectangle yet.
	if (rectangleAlreadyClicked) {
		// -> Close process which is close first clicked image after second click.
		clearTimeout(firstHideRectangleProcess)
		if (elem.data('img') === alreadyClickedElement.data('img')) {
			// This 2 images is same!
			rectangleAlreadyClicked	= undefined
			alreadyClickedElement	= false
			firstHideRectangleProcess		= undefined
			secondHideRectangleProcess		= undefined
			console.log('good click', 'Images Count: ', origImagesCount);
			console.log('winClicksOfImages', winClicksOfImages);
			winClicksOfImages.push(elem.data('img'))
			if (winClicksOfImages.length === origImagesCount) {
				setTimeout(() => {
					$('#Win_poster').toggleClass('hiddenWinPoster')
				}, 100)
			}
		} else {
			// This 2 images is not same!
			// -> Close last 2 clicked image after 0.2s.
			secondHideRectangleProcess = setTimeout((e) => {
				e.addClass('hidden')
				alreadyClickedElement.addClass('hidden')
				rectangleAlreadyClicked	= false
				alreadyClickedElement	= undefined
			}, 200, elem)
		}
	} else {
		// Creat process which will close first clicked image after 3s.
		firstHideRectangleProcess = setTimeout((e) => {
			e.addClass('hidden')
			rectangleAlreadyClicked	= false
			alreadyClickedElement	= undefined
		}, 2000, elem)
		rectangleAlreadyClicked	= true
		alreadyClickedElement	= elem
	}
}
