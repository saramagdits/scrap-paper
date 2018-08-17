//---------------
// SELECTORS
//---------------
const entries = document.querySelector('.entries');
const entriesList = document.querySelector('.entries__list');
const create = document.querySelector('.create');
const createTitle = document.querySelector('.create__title');
const createBody = document.querySelector('.create__body');
const createBtn = document.querySelector('.create__btn');
const view = document.querySelector('.view');
const viewTitle = document.querySelector('.view__title');
const viewBody = document.querySelector('.view__body');
//---------------
// FUNCTIONS
//---------------

// Create entry
// on submit, create a new entry li with the create__body and create __title
// also add new entry to localStorage
function createEntry (e) {
	//check if submit was clicked
	if (e.target.classList.contains('create__btn')) {
		//check if title and body are filled out
		if (createTitle.value !== '' && createBody.value !== '') {
			//create new entry object
			const entry = {
				title : createTitle.value,
				body : createBody.value
			};
			//create a new entry li
			const li = document.createElement('li');
			li.classList.add('entries__item');
			li.innerText = entry.title;
			const deleteBtn = document.createElement('a');
			deleteBtn.classList.add('entries__deleteBtn');
			deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
			li.appendChild(deleteBtn);
			entriesList.appendChild(li);
			//add entry to localStorage
			let newEntry;
			//check if localStorage is empty
			if (localStorage.getItem('entries') === null) {
				newEntry = [];
			} else {
				newEntry = JSON.parse(localStorage.getItem('entries'));
			}
			newEntry.push(entry);
			localStorage.setItem('entries', JSON.stringify(newEntry));
			//clear the create input values
			createTitle.value = '';
			createBody.value = '';
		} else {
			alert('Please enter a title and entry')
		}
	}
	e.preventDefault();
}

// Delete entry
// when 'x' on entry li is clicked, delete the entry from the entries list
//as well as localStorage
// ask user to confirm deletion
function deleteEntry (e) {
	if (e.target.parentElement.classList.contains('entries__deleteBtn')) {
		const li = e.target.parentElement.parentElement;
		//remove from localStorage
		const entryTitle = li.innerText;
		console.log(entryTitle);
		//get entries from localStorage
		let entries = JSON.parse(localStorage.getItem('entries'));
		//look for entry with matching title
		entries.forEach((entry, index) => {
			if (entry.title === entryTitle) {
				entries.splice(index, 1);
				localStorage.setItem('entries', JSON.stringify(entries));
			}
		});
		//remove from entries list
		li.remove();
	}
}

// Display entry
// when an entry li is clicked, populate the view section with title and body
//from localStorage? also check if entry exists (may have been deleted)
// clear the create input values
function displayEntry (e) {}

//Populate entries
// when the DOM is reloaded, grab entries from localstorage and
//populate the entries list
function populateEntries () {}
//---------------
// EVENT LISTENERS
//---------------

// listen for click on submit
create.addEventListener('click', createEntry);
//listen for click on any entry li delete button 'x'
entriesList.addEventListener('click', deleteEntry);
//listen for click on any entry li
entriesList.addEventListener('click', displayEntry);
//listen for DOM reload to populate data from localStorage
document.addEventListener('DOMContentLoaded', populateEntries);