const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmarks-container');


let bookmarks = [];

// show modal, focus on first input
const showModal = () => {
	modal.classList.add('show-modal');
	websiteNameEl.focus();
}

// validate form 
function validate(nameValue,urlValue) {
	const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
	const regex = new RegExp(expression);
	if(!nameValue || !urlValue) {
		alert('please submit values for both fields');
		return false;
	}
	if(!urlValue.match(regex)) {
		alert('please provide a valid web address');
		return false;
	}
  return true;
}
// modal event listeners 
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal'): false));

function buildBookmarks() {
	// remove all bookmarks element
	bookmarkContainer.textContent = '';
		// build Items
	bookmarks.forEach((bookmark) => {
		const{name, url} = bookmark;
		// item
		const item = document.createElement('div');
		item.classList.add('item');
		// close Icon
		const closeIcon = document.createElement('i');
		closeIcon.classList.add('fas' ,'fa-times');
		closeIcon.setAttribute('title', 'Delete Bookmarks');
		closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`)
		// favicon / link container
		const linkInfo = document.createElement('div');
		linkInfo.classList.add('name');
		// favicon
		const favicon = document.createElement('img');
		favicon.setAttribute('src', `https://www.google.com/s2/u/0/favicons?domain=${url}`)
		favicon.setAttribute('alt', 'favicon')
		// link
		const link = document.createElement('a');
		link.setAttribute('href', `${url}`);
		link.setAttribute('target', '_blank');
		link.textContent= name;
		// append to bookmarks container
		linkInfo.append(favicon, link);
		item.append(closeIcon, linkInfo);
		bookmarkContainer.appendChild(item);
	})
}

// fetch boookmarks
function fetchBookmarks() {
	// get bookmarks from localstorage if  available
	if(localStorage.getItem('bookmarks')) {
		bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
	} else {
		bookmarks = [
		{
			name: 'Samuel Aspirin',
			url: 'https://keen-payne-6bb943.netlify.app/'
		}
		]
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	buildBookmarks();
}

// delete Bookmark

function deleteBookmark(url) {
	console.log(url)
}
// delete Bookmark
function deleteBookmark(url) {
	bookmarks.forEach((bookmark,i) => {
	 if(bookmark.url === url) {
	 	bookmarks.splice(i,1)
	 }
	 // update our bookmarks array in localStorage, repopulate DOM
	 localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	 fetchBookmarks();
	})
}
function storeBookmark(e) {
	e.preventDefault();
	const nameValue = websiteNameEl.value;
	let urlValue = websiteUrlEl.value;
	if(!urlValue.includes('https://') && !urlValue.includes('http://')) {
		urlValue = `https://${urlValue}`
	}
     if(!validate(nameValue, urlValue)) {
            	return false;
            }
    const bookmark = {
    	name: nameValue,
    	url : urlValue
    };
   bookmarks.push(bookmark);
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   bookmarkForm.reset();
   websiteNameEl.focus();
   fetchBookmarks();
}


bookmarkForm.addEventListener('submit', storeBookmark);

// onload 
fetchBookmarks();