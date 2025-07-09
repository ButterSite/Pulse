import axios from 'axios';
class ApiFetcher {
    constructor() {
        this.api = axios.create({
        baseURL: 'http://localhost:3001/api', 
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        },
        });

        this.postApi = axios.create({
        baseURL: 'http://localhost:3001/api', 
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        },
        });

        this.postApi.interceptors.request.use(config => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
        });
    }


    publicPost = async (postData) => {
        try {
            const response = await this.postApi.post(`create-post`, {
                postData
            })
            const {post, success} = response.data;
            return {post,success};
        }catch(error) {
            throw error
        }
    }

    handleLike = async (postId) => {
        try {
            const response = await this.postApi.get(`handle-like`,{
                params: {postId: postId}
            });
            return response.data
        }catch(error) {
            throw error;
        }
    }

    signIn = async (userData) => {
        try {
            const {username,password} = userData
            const response = await this.api.post(`sign-in`,{
                username: username,
                password: password
            });

            const {success, message,token} = response.data;
            if(!success) {
                return {success, message};
            }

            return {success,token};
        }catch(error) {
            throw error
        }
    }


    getPosts = async (page,pageSize,postFilter) => {
        try {
            const params = !postFilter.filterName && !postFilter.filterValue ? {
                page: page,
                pageSize: pageSize
            }:
            {
                page: page,
                pageSize: pageSize,
                filterName: postFilter.filterName,
                filterValue: postFilter.filterValue
            }

            const response = await this.postApi.get(`get-posts`,{
                params: params
            });
            return response.data;
        }catch(error) {
            throw error
        }
    }


    signUp = async (userData) => {
    const {username, email, password, firstName, lastName} = userData
    try {
    const response = await this.api.post(`sign-up`,{
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    });

    const {success, message,token} = response.data;
    if(!success) {
        return {success, message};
    }

    return {success,token};
    }catch(error) {
        throw error
    }


}
}


export default new ApiFetcher();