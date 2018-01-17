import FilterBy from './filter-by'

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
