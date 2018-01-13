class RestaurantSearch extends HyperHTMLElement {
    created() {
        <!-- 1024/ 649 : 820/517 = ~80% width, 75-vh ok-->
        this.className = 'vh-100 vh-75-ns w-80 center shadow-2 overflow-scroll'
        this.render()
    }

    render() {
        return this.html`
<div id="header" class="ph4 pv3 bg-dark-blue">
    <label class="clip" for="search-input">Search for Restaurants by Name, Cuisine, Location</label>
    <input id="search-input"
           class="f6 f5-ns input-reset bn black-80 bg-white pa3 lh-solid w-100 br2"
           placeholder="Search for Restaurants by Name, Cuisine, Location" type="text" name="search-input"
           value="">
</div>
<div class="flex w-100 bg-near-white">
    <div id="sidebar" class="flex flex-column w-100 w-25-ns pa3 br b--black-20">
        <div class="pa2">
            <h1 class="f6 fw4">Cuisine/Food Type</h1>
            <ul class="f7 lh-title">
                <li>Indian</li>
                <li>French</li>
                <li>American</li>
            </ul>
        </div>
        <div>
            Rating
        </div>
        <div>
            Payment Options
        </div>
    </div>
    <div id="main" class="flex flex-column w-100 w-75-ns pa4">
        <div id="stats">
            <span class="f6">34 results found</span>
            <span class="f7"> in 0.002 seconds</span>
        </div>
        <div id="result-list">
            <article class="link dt w-100 pv2 mt2"
                     href="http://www.opentable.com/single.aspx?rid=99937">
                <div class="dtc v-mid w3">
                    <img src="https://www.opentable.com/img/restimages/99937.jpg"
                         class="ba b--black-10 db br2 w3 h3"/>
                </div>
                <div class="dtc v-top pl3 pb2">
                    <h2 class="f6 f5-ns fw4 lh-title black mv0">rest.name</h2>
                    <p class="f6 fw4 mt2 mb0 black-40">rest.stars_count (rest.reviews)</p>
                    <p class="f6 fw4 mt2 mb0 black-40">rest.food_type | rest.area | rest.price_range</p>
                </div>
            </article>
            <article class="link dt w-100 pv2 mt2"
                     href="http://www.opentable.com/single.aspx?rid=99937">
                <div class="dtc v-mid w3">
                    <img src="https://www.opentable.com/img/restimages/99814.jpg"
                         class="ba b--black-10 db br2 w3 h3"/>
                </div>
                <div class="dtc v-top pl3 pb2">
                    <h2 class="f6 f5-ns fw4 lh-title black mv0">rest.name</h2>
                    <p class="f6 fw4 mt2 mb0 black-40">rest.stars_count (rest.reviews)</p>
                    <p class="f6 fw4 mt2 mb0 black-40">rest.food_type | rest.area | rest.price_range</p>
                </div>
            </article>
            <article class="link dt w-100 pv2 mt2"
                     href="http://www.opentable.com/single.aspx?rid=99937">
                <div class="dtc v-mid w3">
                    <img src="https://www.opentable.com/img/restimages/99814.jpg"
                         class="ba b--black-10 db br2 w3 h3"/>
                </div>
                <div class="dtc v-top pl3 pb2">
                    <h2 class="f6 f5-ns fw4 lh-title black mv0">rest.name</h2>
                    <p class="f6 fw4 mt2 mb0 black-40">rest.stars_count (rest.reviews_count reviews)</p>
                    <p class="f6 fw4 mt2 mb0 black-40">rest.food_type | rest.area | rest.price_range</p>
                </div>
            </article>
        </div>
        <div id="show-more" class="dt w-100">
            <div class="pointer dim mv3 pv2 ph3 mw4 br2 ba b--black-40 black-60 f6 tc center">Show More</div>
        </div>
    </div>
</div>
`
    }
}

RestaurantSearch.define('restaurant-search')
