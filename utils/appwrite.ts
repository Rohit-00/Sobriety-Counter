import { Client, Account, ID, Databases } from 'react-native-appwrite';

const client = new Client()
    .setProject('Project ID')
    .setEndpoint('Endpoint')
    .setPlatform('com.cascade.counter')
 

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
    reasons:reason[]
}

type reason = {
reason:string;
date  :Date;
time  :string;
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
        return database.createDocument('673983de001e30456ac0','6739846c0021436ce420',userId,{userId,totalCount,reasons})
       
        } catch(error){
            throw error
        }
    }
    async fetchCount({userId}:{userId:string}){
        try{
            return database.getDocument('673983de001e30456ac0','6739846c0021436ce420',userId)
        } catch(error){
            throw error
        }
    }

    async addCount({userId,count,reasons}:{userId:string,count:number,reasons:string[]}){
        try{
            return database.updateDocument('673983de001e30456ac0','6739846c0021436ce420',userId,{totalCount:count+1,reasons:reasons})
            
        
        }
        catch(error){
            console.log()
        }
    }

    async addReason({userId,reasons}:{userId:string,reasons:string[]}){
        try{
            return database.updateDocument('673983de001e30456ac0','6739846c0021436ce420',userId,{reasons:reasons})
        } catch(error){
            console.log(error)
        }
        
    }
}

const appwriteService = new AppwriteService()

export default appwriteService