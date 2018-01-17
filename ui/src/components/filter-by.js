import ResultsList from './results-list'

class ListItem extends HyperHTMLElement {
    static get observedAttributes() {
        return ['count', 'value', 'filters'];
    }

    created() {
        this.className = 'db'
    }

    attributeChangedCallback(attr) {
        this.render()
    }

    render() {
        return this.html`
                <li class="flex justify-between ph2 pv1 pointer br1 hover-light-red hover-bg-washed-blue"
                    onclick="${this}">
                    <span>${this.value}</span>
                    <span class="black-40">${this.count}</span>
                </li>
`
    }

    onclick() {
        // UI : hover state
        for (let el of this.parentElement.children) {
            el.classList.remove('bg-blue-special', 'near-white')
        }

        // apply filter and print new results table
        const getCurrentFiltersAndQuery = () => {
            const curr = document.querySelector('results-list')
            const main = document.getElementById('main')
            const results = document.createElement('results-list')
            results.filters = this.filters || ''
            results.query = curr.query || ''
            main.innerHTML = ''
            main.appendChild(results)
        }

        if (this.active) {
            this.active = null
            this.filters = ''
            getCurrentFiltersAndQuery()
        } else {
            this.classList.add('bg-blue-special', 'near-white')
            this.active = true
            getCurrentFiltersAndQuery()
        }

    }
}

ListItem.define('list-item')

class StarItem extends HyperHTMLElement {
    static get observedAttributes() {
        return ['count', 'value', 'filters'];
    }

    created() {
        this.className = 'db'
    }

    attributeChangedCallback(attr) {
        this.render()
    }

    render() {
        let liClass = `stars-container stars-${this.value}`
        let starSpan = hyperHTML`<div><span class="${liClass}">★★★★★</span></div>`
        return this.html`
                <li class="flex justify-between ph2 pv1 pointer br1 hover-light-red hover-bg-washed-blue"
                    onclick="${this}">
                    <span>${starSpan}</span>
                    <span class="black-40">${this.count}</span>
                </li>
`
    }

    onclick() {
        // UI : hover state
        for (let el of this.parentElement.children) {
            el.classList.remove('bg-blue-special', 'near-white')
        }

        // apply filter and print new results table
        const getCurrentFiltersAndQuery = () => {
            const curr = document.querySelector('results-list')
            const main = document.getElementById('main')
            const results = document.createElement('results-list')
            results.filters = this.filters || ''
            results.query = curr.query || ''
            main.innerHTML = ''
            main.appendChild(results)
        }

        if (this.active) {
            this.active = null
            this.filters = ''
            getCurrentFiltersAndQuery()
        } else {
            this.classList.add('bg-blue-special', 'near-white')
            this.active = true
            getCurrentFiltersAndQuery()
        }

    }
}

StarItem.define('star-item')

class FilterBy extends HyperHTMLElement {

    static get observedAttributes() {
        return ['facet', 'title', 'name']
    }

    created() {
        this.className = 'db pa2 pb0 overflow-hidden'
    }

    attributeChangedCallback(attr) {
        if ('title' === attr || 'name' === attr) return this.render()

        this.parsedFacet = JSON.parse(this.facet)
        let values = Object.keys(this.parsedFacet)

        const ul = document.createElement('ul')
        ul.className = 'list f7 pl2 lh-title'

        // special handle: Rating/ stars_count
        if ('Rating' === this.title) {
            // round star_count (down) and group
            let wholeStars = values.reduce((acc, rating) => {
                let floor = Math.floor(rating)
                acc[floor] = 'number' === typeof acc[floor] ? acc[floor] += this.parsedFacet[rating] : this.parsedFacet[rating]
                return acc
            }, {})

            Object.keys(wholeStars).forEach(value => {
                let starLi = document.createElement('star-item')
                starLi.value = value
                starLi.count = wholeStars[value]
                starLi.filters = `"${this.name} > ${value}"`
                ul.appendChild(starLi)
            })
        } else {
            values.forEach(value => {
                const li = document.createElement('list-item')
                li.value = value
                li.count = this.parsedFacet[value]
                li.filters = `${this.name}:"${value}"`
                ul.appendChild(li)
            })
        }

        this.appendChild(ul)
        this.render()
    }

    render() {
        return this.html`
            <h1 class="f6 fw4 ttc ma0">${this.title}</h1>
`
    }
}

FilterBy.define('filter-by')