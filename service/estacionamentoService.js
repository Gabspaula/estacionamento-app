import ApiService from "./apiService";

export default class estacionamentoService extends ApiService {
    constructor() {
        super("/estacionamento");
    }

    //post
    saveRegistroVeiculo(registroEstacionamento) {
        return this.post("/registrar", registroEstacionamento);
    }

    //get
    findAll() {
        return this.get("/all");
    }

    //get
    procuraRegistroPlaca(placaVeiculo) {
        return this.get(`/placaVeiculo?id=${placaVeiculo}`);
    }

    //delete
    deleteById(id) {
        return this.delete(`/${id}`);
    }

    //put
    updateRegistro(placaVeiculo) {
        return this.put(`/${placaVeiculo}`);
    }
}