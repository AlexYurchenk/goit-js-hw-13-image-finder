import NewApiService from './new-api.js';
import LoadMoreBtn from './load-more-btn.js';
import CardTpl from '../templates/card.hbs'
//Refs
const refs = {
    searchForm: document.querySelector('.js-search-form'),
    photosContainer: document.querySelector('.js-gallery-container'),
  };
  const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
  });
  const newApiService =  new NewApiService();
  const documentHeight = document.documentElement.clientHeight;

///EventListeners
refs.searchForm.addEventListener('submit', onSearchFormSubmit)
loadMoreBtn.refs.button.addEventListener('click', onLoadMore)

//Function
function onSearchFormSubmit(e){
    e.preventDefault();

    newApiService.query =  e.currentTarget.elements.query.value;
    if(newApiService.query === ''){
        return
    }
    loadMoreBtn.show();
    newApiService.resetPage();
    clearPhotosContainer();
    onLoadMore();
}

 function  onLoadMore(){
    loadMoreBtn.disable();
    newApiService.fetchPhoto()
    .then(photos =>{
      if(photos.length ===0 ){
        console.error('Нет таких картинок!, ввидите что то нормальное!')
        loadMoreBtn.hide(); 
        return
      }
      const photosListMarkup = photosMap (photos);
      refs.photosContainer.insertAdjacentHTML('beforeend', photosListMarkup);
      scrollPage();
      loadMoreBtn.enable();
    })
 
}




  
function clearPhotosContainer() {
    refs.photosContainer.innerHTML = '';
  }

function photosMap(photos){
  return  photos.map(CardTpl).join('');
}
function scrollPage(){
  window.scrollTo({
    top: window.pageYOffset + documentHeight,
    width: 0,
    behavior: "smooth",
  });
}
