import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export default class UserService {

  private _url:string = 'http://localhost:4200'
  constructor(private http:HttpClient){ }
  
  fetchUsers(callback) {
    // fetch data from backend /server side
    this.http
    .get(this._url+'/users')
    .subscribe(data=>{
      callback(data)
    },error=>{
      console.log('Unable to load data ',error)
    })
    //return users
 }
 fetchUserByName(uName,callback){
    // fetch user from backend /server side
    this.http
    .get(this._url+'/users/findByName/'+uName)
    .subscribe(data=>{
      callback(data)
    },error=>{
      console.log('Unable to load data ',error)
    })
 }

 findUser(username,password,callback){
  this.http
    .get(this._url+'/users/find/'+username+'/'+password)
    .subscribe(data=>{
      callback(data)
    },error=>{
      console.log('Unable to Process the request')
    })
   }


 updateUser(_updatedUserObj,callback){
  this.http
  .put(this._url+'/user/edit',{
    _id: _updatedUserObj._id,
    name: _updatedUserObj.name,
    email: _updatedUserObj.email
  }).subscribe(res=>{
    callback(res)
  },error=>{
    console.log('Error Occured',error)
  })
 }

 getMaxId(callback){
  this.http
  .get(this._url+'/user/find/id/max')
  .subscribe(data=>{
    callback(data)
  },error=>{
    console.log('Unable to Process the request')
  })
 }
 createUser(userObj:any,callback){
  this.http
  .post(this._url+'/user/add',userObj).subscribe(response=>{
    callback(null)
  },error=>{
    callback(error)
  })
 }
 buildAndCreateUser(user:any,callback){
  this.getMaxId((data)=>{
    // build user object
    let userObj:any ={
      _id: parseInt(data.maxId) + 1,
      name: user.name,
      email: user.email
    }
    this.createUser(userObj,(err)=>{
      callback(err)
    })
  })
 }
}
