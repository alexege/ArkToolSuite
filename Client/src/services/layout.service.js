// // import axios from "axios";
// import api from './api';

// // const API_URL = "http://localhost:8080/api/layout/";

// class LayoutService {

//     findOne(id) {
//         return api.get(`/layouts/findOne/${id}`);
//     }

//     findAll() {
//         return api.get("/layouts/all");
//     }

//     addLayout(data) {
//         console.log("adding layout: ", data)
//         return api.post("/layouts/addLayout", data);
//     }

//     update(layout) {
//         console.log("updating layout ----------:", layout)
//         return api.patch("/layouts/update/" + layout._id, {
//             title: layout.title,
//             url: layout.url,
//             description: layout.description,
//             gridPosition: layout.gridPosition
//         })
//         .catch(err => {
//             console.log('error:', err);
//         })
//     }

//     delete(id) {
//         return api.delete("/layouts/delete/" + id)
//         .catch(err => {
//             console.log('err:', err);
//         })
//     }
// }

// export default new LayoutService();