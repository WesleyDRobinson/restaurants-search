import SearchBar from './search-bar'
import SidebarFilter from './sidebar-filter'
import ResultsList from './results-list'

class RestaurantSearch extends HyperHTMLElement {
    created() {
        // <!-- 1024/ 649 : 820/517 = ~80% width, 75-vh ok-->
        this.className = 'db vh-100 vh-75-ns w-100 w-80-ns center shadow-2 overflow-scroll bg-near-white overflow-x-hidden overflow-y-auto'
        // async so not available immediately, using around IP search as fallback
        navigator.geolocation.getCurrentPosition((location) => {
            this.coords = `${location.coords.latitude}, ${location.coords.longitude}`
        })
        this.render()
    }

    render() {
        return this.html`
            <search-bar></search-bar>
            <div class="flex w-100">
                <sidebar-filter></sidebar-filter>
                <div id="main" class="flex flex-column w-100 w-75-ns h-100 pa3">
                    <results-list query=""></results-list>
                </div>
            </div>
`
    }
}

RestaurantSearch.define('restaurant-search')
