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