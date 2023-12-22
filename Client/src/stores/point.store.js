// import { defineStore } from 'pinia'
// import axios from "axios"

// const API_URL = 'http://localhost:8080/api'

// export const usePointStore = defineStore('point', {
//     state: () => ({
//         points: []
//     }),
//     getters: {
//         getPoints(state) {
//             return state.points
//         }
//     },
//     actions: {
        
//         async fetchPoints() {
//             try {
//                 this.points = { loading: true }
//                 const response = await axios.get(`${API_URL}/points/all`)
//                 this.points = response.data
//             } catch (e) {
//                 this.points = { e }
//             }
//         },
        
//         async addPoint(coords, mapId ) {
//             console.log(`coords:${coords}`)
//             let data = {
//                 mapId: mapId,
//                 x: coords.x,
//                 y: coords.y
//             }

//             const res = await axios.post(`${API_URL}/point/addPoint`, data)
//             await this.points.push(res.data)
//         },

//         async deletePoint(id) {
//             console.log("Deleting a point from points store")
//             await axios.delete(`${API_URL}/point/deletePoint/${id}`)
//             let index = this.points.findIndex(point => point._id === id)
//             this.points.splice(index, 1)
//         }
//     }
// })