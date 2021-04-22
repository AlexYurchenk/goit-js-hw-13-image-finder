import NewApiService from './new-api.js';
import LoadMoreBtn from './load-more-btn.js';
import '../css/styles.css';
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
    if(newApiService.query ===''){
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
  return  photos.map(({webformatURL , likes, views,comments ,downloads}) => {
    return `    <div class="photo-card">
    <img src="${webformatURL}" alt="" />

    <div class="stats">
        <p class="stats-item">
        <i class="material-icons">thumb_up</i>
        ${likes}
        </p>
        <p class="stats-item">
        <i class="material-icons">visibility</i>
        ${views}
        </p>
        <p class="stats-item">
        <i class="material-icons">comment</i>
        ${comments}
        </p>
        <p class="stats-item">
        <i class="material-icons">cloud_download</i>
        ${downloads}
        </p>
    </div>
    </div>`
}).join('');
}
function scrollPage(){
  window.scrollTo({
    top: window.pageYOffset + documentHeight,
    width: 0,
    behavior: "smooth",
  });
}
