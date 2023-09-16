// import axios from "axios";
import api from './api';

// const API_URL = "http://localhost:8080/api/item/";

class ItemService {
    findAll() {
        return api.get("/items/all");
    }

    addItem(data) {
        console.log("adding item: ", data)
        return api.post("/items/addItem", data);
    }

    update(item) {
        console.log("updating item ----------:", item)
        return api.patch("/items/update/" + item._id, {
            title: item.title,
            url: item.url,
            description: item.description,
            gridPosition: item.gridPosition
        })
        .catch(err => {
            console.log('error:', err);
        })
    }

    delete(id) {
        return api.delete("/items/delete/" + id)
        .catch(err => {
            console.log('err:', err);
        })
    }
}

export default new ItemService();