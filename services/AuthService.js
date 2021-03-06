  
import $api from "../http";

export default class AuthService {
    static async login(email, password) {
        return $api.post('/login', {email, password})
    }

    static async registration(email, password, nickname) {
        return $api.post('/registration', {email, password, nickname})
    }

    static async logout(){
        return $api.post('/logout')
    }

    static async about(){
        return $api.post('/logout')
    }

    static async getPosts(){
        return $api.get('/posts')
    }

}
