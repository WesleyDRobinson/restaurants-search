'use strict'
const fs = require('fs')
const zip = require('lodash.zipobject')
const find = require('lodash.find')
const mergeWith = require('lodash.mergewith')
const algolia = require('algoliasearch')
const client = algolia('CKTHGGSQ1L', '00fa0dcb5ab894be32dada18d494c65e')

const restaurants = require('./restaurants_list')
const csvFilePath = './restaurants_info.csv'

// todo - extract and export CSV parser and Object merger
const mergeAndPush = () => {
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) console.error(err)

        // process CSV
        let splitLines = data.split('\n').map(line => line.split(';'))
        let keys = splitLines.shift()
        let extraInfo = splitLines.map(line => zip(keys, line))

        // enrich restarurants.json with info from CSV
        let enriched = restaurants.map(restaurant => {
            const id = restaurant.objectID.toString(10)
            const extra = find(extraInfo, {objectID: id})
            return mergeWith(restaurant, extra)
        })

        const index = client.initIndex('restaurants')
        index.addObjects(enriched, (err, content) => {
            if (err) console.error(err)
            // content = { objectIDs: [], taskID: Number }
        })
    })
}
