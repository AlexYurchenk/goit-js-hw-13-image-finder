const API__KEY = '12&key=21255854-31bcf5c415a33cbe729d04b4b';
const BASE__URL = 'https://pixabay.com/api/';
export default class NewApiService{
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }
            
    fetchPhoto (){
        const url = `${BASE__URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API__KEY}`;
         
         return fetch(url)
            .then(r =>r.json())
            .then(({hits}) => {
                this.incrementPage();
                return hits
            });
    }

    incrementPage(){
        this.page +=1;
    }

    resetPage() {
        this.page = 1;
      }

    get query(){
        return this.searchQuery;
    }
    set query(newQuery){
        this.searchQuery = newQuery;
    }

}