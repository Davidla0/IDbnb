
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

import { httpService } from './http.service'
const BASE_URL = `stay/`

// import { userService } from './user.service.js'
const fs = require('fs')
// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'stay'

// var gUsers = require('../data/user.json')
var gStays = require('../data/stay.json')

export const stayService = {
    query,
    getById,
    save,
    remove,
    avgRate
}
window.cs = stayService

function query(filterBy ) {
  return httpService.get(BASE_URL,  filterBy ).then((res) => {
    // res.forEach(stay => stay.reviews.map(review => {
    //     review.rate = utilService.getRandomIntInclusive(3, 4)
    //     return review
    //   }))
      res.forEach(stay => stay.beds = Math.round(stay.capacity / utilService.getRandomIntInclusive(1, 2)))
      return res
    
  })
}

// function query(filterBy) {
//   return storageService.query(STORAGE_KEY).then(stays => {
//     if (!stays[0]) {
//       gStays.forEach(stay => stay.reviews.map(review => {
//         review.rate = utilService.getRandomIntInclusive(3, 5)
       
//         // review.by.imgUrl = gUsers.map(user => user._id === review.by._id ? user.imgUrl : review.by.imgUrl)
//         return review
//       }))
//       gStays.forEach(stay => stay.beds = Math.round(stay.capacity / utilService.getRandomIntInclusive(1, 2)))
//       stays = storageService.postMany(STORAGE_KEY, gStays).then(x => console.log(x))
//     }

//     if (filterBy) {
//       let { maxPrice, minPrice, label } = filterBy
//       if (!maxPrice) maxPrice = Infinity
//       if (!minPrice) minPrice = 0
//       if (!label) label = ''
//       stays = stays.filter(stay => stay.price <= maxPrice && stay.price >= minPrice &&
//         stay.type.toLowerCase().includes(label.toLowerCase()) 
//         )

//         const { Wifi, Washer, Kitchen, Dryer, Heating , EntirePlace, PrivateRoom, SharedHome} = filterBy
//         stays = stays.filter(stay => !Wifi || stay.amenities.includes('Wifi') && 
//         !Washer || stay.amenities.includes('Washer') &&
//         !Kitchen || stay.amenities.includes('Kitchen') &&
//         !Dryer || stay.amenities.includes('Dryer') &&
//         !Heating || stay.amenities.includes('Heating') &&
        
//         !EntirePlace || stay.amenities.includes('Entire home/apt') &&
//         !PrivateRoom || stay.amenities.includes('Private room') &&
//         !SharedHome || stay.amenities.includes('Shared homes') 
//           )

//       if (filterBy.where) {
//         stays = stays.filter(stay => stay.loc.country.toLowerCase().includes(filterBy.where.toLowerCase()) 
//         // ||
//         //   stay.loc.city.toLowerCase().includes(filterBy.where.toLowerCase()) ||
//         //   stay.loc.address.toLowerCase().includes(filterBy.where.toLowerCase())
//           // stay.name.toLowerCase().includes(filterBy.where.toLowerCase())
//         )
//       }
//       return stays
//     }
//     return stays
//   }
//   )
// }

function getById(stayId) {
  // return storageService.get(STORAGE_KEY, stayId)
  return httpService.get(BASE_URL + stayId).then((res) =>  res)
}
async function remove(stayId) {
  // await storageService.remove(STORAGE_KEY, stayId)
  return httpService.delete(BASE_URL + stayId).then((res) => res)
}
async function save(stay) {
  var savedStay
  if (stay._id) {
    savedStay = await storageService.put(STORAGE_KEY, stay)

  } else {
    // Later, owner is set by the backend
    let newStay = _getEmptyStay()
    newStay.name = stay.name
    newStay.price = stay.price
    gStays.push(newStay)
    savedStay = await storageService.post(STORAGE_KEY, newStay)
  }
  return _saveStayToFile()
    .then(() => savedStay)
}

function _saveStayToFile() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(gStays, null, 2)
    fs.writeFile('data/stay.json', data, (err) => {
      if (err) return reject('Cannot save to file')
      resolve()
    })
  })
}

function _getEmptyStay() {
  return {
    "type": "House",
    "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
    "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
    "capacity": 8,
    "amenities": [
      "TV",
      "Wifi",
      "Kitchen",
      "Smoking allowed",
      "Pets allowed",
      "Cooking basics"
    ],
    "host": {
      "_id": "u101",
      "fullname": "Davit Pok",
      "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
    },
    "loc": {
      "country": "Portugal",
      "countryCode": "PT",
      "city": "Porto",
      "address": "17 Kombo st",
      "lat": -8.61308,
      "lng": 41.1413
    },
    "reviews": [
      {
        "id": "madeId",
        "txt": "Very helpful hosts. Cooked traditional...",
        "rate": 4,
        "by": {
          "_id": "u102",
          "fullname": "user2",
          "imgUrl": "/img/img2.jpg"
        }
      }
    ],
    "likedByUsers": ['mini-user'] // for user-wishlist : use $in
  }

}

function avgRate(stay){
  let rates = stay.reviews.map(review => review.rate)
  rates = rates.reduce((a, b) => a + b, 0)

  const avgRate = (rates / stay.reviews.length).toFixed(2)
  return avgRate
}


