import { Client, Account, ID, Databases } from 'react-native-appwrite';

const client = new Client()
    .setProject('<projectID>')
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setPlatform('<packageName>')
 

export const account = new Account(client)
export const database = new Databases(client)

type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
}

type LoginUserAccount = {
    email: string;
    password: string;
}

type userData = {
    userId:string;
    totalCount:number;
    reasons:string[]
}
export class AppwriteService {
    async createUserAccount({email, password, name}: CreateUserAccount) {
        try{
            const userAccount = await account.create(ID.unique(),email,password,name)
            if(userAccount){
                return this.loginEmail({email,password})
            } else {
                return userAccount
            }
        }
        catch(error){
            throw error
        }   
    }
    async loginEmail({email,password}:LoginUserAccount){
        try{
           return await account.createEmailPasswordSession(email,password)
        }
        catch(error){
            throw error
        }
    }

    async isLoggedIn(): Promise<boolean>{
        try{
           const data = await this.getCurrentUser()
           return Boolean(data)
        }

        catch(error){
            return false
        }
        
    }

    async getCurrentUser(){
        try {
            return await account.get()
        } catch (error) {
            console.log("getCurrentUser",error)
        }

        return null
    }

    async logout(){
        try {
            return await account.deleteSession('current')
        } catch (error) {
            throw error
        }
    }

    async addUserData({userId,totalCount,reasons}:userData){
        try{
        return database.createDocument('<databaseID>','<collectionID>',ID.unique(),{userId,totalCount,reasons})   
        } catch(error){
            throw error
        }
        
    }
}

const appwriteService = new AppwriteService()

export default appwriteService