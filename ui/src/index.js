import RestaurantSearch from './components/restaurant-search'
import debounce from 'lodash.debounce'

const client = algoliasearch('CKTHGGSQ1L', '2178f7edde75bd5a50e74431a61df25e')
const index = client.initIndex('restaurants')

const debouncedSearch = debounce(search, 600)
const input = document.getElementById('search-input')
input.addEventListener('keyup', debouncedSearch)
function search(e) {
    console.log(e.target.value)
    index.search(e.target.value, (err, data) => {
        if (err) console.error(err)
        console.log(data)
    })
}

