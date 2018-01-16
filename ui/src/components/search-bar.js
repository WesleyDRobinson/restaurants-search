import ResultsList from './results-list'
class SearchBar extends HyperHTMLElement {
    created() {
        this.className = 'db ph4 pv3 bg-dark-blue'
        this.render()
    }

    render() {
        return this.html`
            <label class="clip" for="search-input">Search for Restaurants by Name, Cuisine, Location</label>
            <input id="search-input" name="search-input"
                   type="text" class="f6 f5-ns input-reset bn black-80 bg-white pa3 lh-solid w-100 br2"
                   placeholder="Search for Restaurants by Name, Cuisine, Location" value=""
                   onkeyup=${this}>
`
    }

    onkeyup(e) {
        // basic debounce
        if (this.searching) return
        this.searching = true
        setTimeout(() => this.searching = false, 400)

        // todo -- add loader

        const curr = document.querySelector('results-list')
        const main = document.getElementById('main')
        main.innerHTML = ''

        const results = document.createElement('results-list')
        results.filters = curr.filters
        results.query = e.target.value

        main.appendChild(results)
    }
}

SearchBar.define('search-bar')
