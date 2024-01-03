import { defineStore } from 'pinia'
import axios from "axios"

const API_URL = 'http://localhost:8080/api'

export const useMapStore = defineStore('map', {
    state: () => ({
        allMaps: [],
        points: []
    }),
    getters: {
        getMaps(state) {
            return state.allMaps
        }
    },
    actions: {

        async fetchMaps() {
            try {
                this.allMaps = { loading: true }
                const response = await axios.get(`${API_URL}/map/all`)
                this.allMaps = response.data
            } catch (e) {
                this.allMaps = { e }
            }
        },

        async addMap(map) {
            const mapRes = await axios.post(`${API_URL}/map/addMap`, map)
            await this.allMaps.push(mapRes.data)
        },

        async deleteMap(id) {
            await axios.delete(`${API_URL}/map/deleteMap/${id}`)
            let index = this.allMaps.findIndex(map => map._id === id)
            this.allMaps.splice(index, 1)
        },

        async deletePointFromMap(mapId, pointId) {
            await axios.delete(`${API_URL}/map/deletePointFromMap/${mapId}/${pointId}`)
            let map = this.allMaps.filter(map => map._id === mapId)[0]
            let index = map.points.findIndex(point => point._id === pointId)
            map.points.splice(index, 1)
        },

        async fetchPoints() {
            try {
                this.points = { loading: true }
                const response = await axios.get(`${API_URL}/points/all`)
                this.points = response.data
            } catch (e) {
                this.points = { e }
            }
        },
        
        async addPoint(coords, mapId ) {
            console.log(`coords:${coords.x}, ${coords.y}`)
            console.log(`mapId:${mapId}`)
            let data = {
                mapId: mapId,
                mapX: coords.mapX,
                mapY: coords.mapY,
                x: coords.x,
                y: coords.y
            }

            let map = this.allMaps.filter(map => map._id === mapId)[0]
            let point = await axios.post(`${API_URL}/point/addPoint`, data)
            await map.points.push(point.data)
        },

        async deletePoint(id) {
            
            await axios.delete(`${API_URL}/point/deletePoint/${id}`)
            let index = this.points.findIndex(point => point._id === id)
            this.points.splice(index, 1)
        }




    }
})