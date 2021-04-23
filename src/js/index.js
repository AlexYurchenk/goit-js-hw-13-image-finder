import NewApiService from './new-api.js';
import LoadMoreBtn from './load-more-btn.js';
import CardTpl from '../templates/card.hbs'
import {error} from '../../node_modules/@pnotify/core/dist/PNotify';
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
    
    loadMoreBtn.show();
    newApiService.resetPage();
    clearPhotosContainer();
    onLoadMore();
}

 function  onLoadMore(){

    loadMoreBtn.disable();
    if(newApiService.fetchPhoto() === undefined){
      error({
        text: 'Таких картинок нет , введите что то нормальное!',
        delay: 800,
      });
      loadMoreBtn.hide();
      refs.searchForm.query.value = '';
      return
    }
    newApiService.fetchPhoto()
    .then(photos =>{
      if(photos.length ===0 ){
        error({
          text: 'Таких картинок нет , введите что то нормальное!',
          delay: 800,
        });
        loadMoreBtn.hide(); 
        refs.searchForm.query.value = '';
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
