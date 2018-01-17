/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__restaurant_result__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__restaurant_result___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__restaurant_result__);


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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_restaurant_search__ = __webpack_require__(2);



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search_bar__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sidebar_filter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__results_list__ = __webpack_require__(0);




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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__results_list__ = __webpack_require__(0);

class SearchBar extends HyperHTMLElement {
    created() {
        this.style.backgroundColor = '#1C688E'
        this.className = 'db pa3'
        this.render()
    }

    render() {
        return this.html`
            <label class="clip" for="search-input">Search for Restaurants by Name, Cuisine, Location</label>
            <input id="search-input" name="search-input"
                   type="text" class="f6 input-reset bn black-80 bg-white pa3 lh-title w-100 br2"
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
        results.filters = curr.filters || ''
        results.query = e.target.value || ''

        main.appendChild(results)
    }
}

SearchBar.define('search-bar')


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class RestaurantResult extends HyperHTMLElement {
    static get observedAttributes() {
        return ['restaurant'];
    }

    created() {
        this.restaurant = this.restaurant || "{}"
        this.output = JSON.parse(this.restaurant)
        this.className = 'link dt w-100 pv2 mt2'
        this.render()
    }

    render() {
        let value = (Math.round(this.output.stars_count * 2) / 2).toFixed(1).split('.').join('')
        let liClass = `stars-container stars-${value}`
        let stars = hyperHTML`<span class="${liClass}">★★★★★</span>`
        return this.html`
            <a class="link" href="${this.output.reserve_url}">
                <div class="dtc v-mid w3">
                    <img src="${this.output.image_url}"
                         class="ba b--black-10 db br2 w3 h3"/>
                </div>
                <div class="dtc v-top pl3 pb2">
                    <h2 class="f6 f5-ns fw5 lh-title black mv0">${this.output.name}</h2>
                    <p class="f6 fw4 mt2 mb0 black-40"><span class="special-gold">${this.output.stars_count} ${stars}</span> (${this.output.reviews_count} reviews)</p>
                    <p class="f6 fw4 mt2 mb0 black-40">${this.output.food_type} | ${this.output.area} | ${this.output.price_range}</p>
                </div>
            </a>
`
    }
}

RestaurantResult.define('restaurant-result')

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__filter_by__ = __webpack_require__(6);


class SidebarFilter extends HyperHTMLElement {
    created() {
        const client = algoliasearch('CKTHGGSQ1L', '2178f7edde75bd5a50e74431a61df25e')
        const index = client.initIndex('restaurants')

        const facets = ['food_type', 'stars_count', 'payment_options']
        index
            .search({
                facets
            })
            .then(res => {
                // build sidebar
                let foodType = document.createElement('filter-by')
                foodType.name = 'food_type'
                foodType.title = 'Cuisine/ Food Type'
                foodType.facet = JSON.stringify(res.facets['food_type'])
                foodType.lastElementChild.classList.add('h4', 'overflow-y-scroll')
                this.appendChild(foodType)

                let starsCount = document.createElement('filter-by')
                starsCount.name = 'stars_count'
                starsCount.title = 'Rating'
                starsCount.facet = JSON.stringify(res.facets['stars_count'])
                this.appendChild(starsCount)


                const allowed = ['AMEX', 'MasterCard', 'Visa', 'Discover']
                let payments = allowed.reduce((acc, option) => {
                    acc[option] = res.facets['payment_options'][option]
                    return acc
                }, {})
                let paymentOptions = document.createElement('filter-by')
                paymentOptions.name = 'payment_options'
                paymentOptions.title = 'Payment Options'
                paymentOptions.facet = JSON.stringify(payments)
                this.appendChild(paymentOptions)

            })
            .catch(err => console.error(err))

        this.className = 'flex flex-column w-100 w-25-ns pa3 br b--black-20 overflow-x-hidden'
        this.render()
    }

    render() {
        return this
    }

}

SidebarFilter.define('sidebar-filter')


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__results_list__ = __webpack_require__(0);


// todo -- implement Stars :/
// class RatedStar extends HyperHTMLElement {
//     static get observedAttributes() {
//         return ['stars'];
//     }
//
//     attributeChangedCallback() {
//         this.className = `f6 stars-container stars-${this.stars}`
//         this.render()
//     }
//
//     render() {
//         return this.html`<span class="${this.className}">★★★★★</span>`
//     }
//
// }
//
// RatedStar.define('rated-star')

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

/***/ })
/******/ ]);