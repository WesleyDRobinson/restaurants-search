import RestaurantResult from './restaurant-result'

class ResultsList extends HyperHTMLElement {
    static get observedAttributes() {
        return ['query', 'filters'];
    }

    get defaultState() {
        return {
            page: 0
        }
    }

    created() {
        // create Algolia client and index
        const client = algoliasearch('CKTHGGSQ1L', '2178f7edde75bd5a50e74431a61df25e')
        this.index = this.index || client.initIndex('restaurants')
        this.className = 'pa2'
    }

    attributeChangedCallback(attr) {
        if ('filters' === attr) return this.render()

        let restaurantSearch = document.querySelector('restaurant-search')

        this.index
            .search({
                filters: this.filters || '',
                query: this.query || '',
                aroundLatLng: restaurantSearch.coords || '',
                aroundLatLngViaIP: true,
                hitsPerPage: 3
            })
            .then(data => {
                const statsDiv = hyperHTML.bind(document.createElement('div'))`
                    <div class="dib">
                        <span class="f6">${data.nbHits} results found</span>
                        <span class="f7"> in ${data.processingTimeMS / 1000} seconds</span>
                    </div>
                    <div class="self-end bb bb-1 b--black-20 pa2 w-50"></div>`
                statsDiv.className = 'flex w-100 justify-between'
                statsDiv.id = 'search-stats'

                const resultsDiv = document.createElement('div')
                data.hits.forEach((restaurant, i) => {
                    const result = document.createElement('restaurant-result')
                    result.restaurant = JSON.stringify(restaurant)
                    resultsDiv.appendChild(result)
                })
                resultsDiv.id = 'results'

                const showMore = hyperHTML.bind(document.createElement('div'))`
                    <div class="pointer dim mv3 pv2 ph3 mw4 br2 ba b--black-40 black-60 f6 tc center" onclick="${this}">Show More</div>
                `
                showMore.className = 'dt w-100'

                this.appendChild(statsDiv)
                this.appendChild(resultsDiv)
                this.appendChild(showMore)
            })
            .catch(err => console.error(err))

        this.render()
    }

    render() {
        return this
    }

    onclick() {
        this.setState({page: this.state.page + 1})
        this.index
            .search({
                filters: this.filters || '',
                query: this.query || '',
                page: this.state.page,
                hitsPerPage: 3,
                aroundLatLngViaIP: true
            })
            .then(data => {
                const resultsDiv = document.getElementById('results')
                data.hits.forEach((restaurant, i) => {
                    const result = document.createElement('restaurant-result')
                    result.restaurant = JSON.stringify(restaurant)
                    resultsDiv.appendChild(result)
                })
            })
            .catch(err => console.error(err))

    }
}

ResultsList.define('results-list')
