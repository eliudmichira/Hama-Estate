import { db } from "../lib/firebase.js";
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where 
} from "firebase/firestore";
import bcrypt from "bcrypt";

export const getUsers = async(req, res)=>{
    try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);
        const users = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "failed to get users"});
    }
}

export const getUser = async (req, res) =>{
    const id = req.params.id;
    try {
        const userDoc = doc(db, "users", id);
        const userSnapshot = await getDoc(userDoc);
        
        if (!userSnapshot.exists()) {
            return res.status(404).json({message: "User not found"});
        }
        
        const user = { id: userSnapshot.id, ...userSnapshot.data() };
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "failed to get user"});
    }
}

export const updateUser = async(req, res) =>{
    const id = req.params.id;
    const tokenUserId = req.userId;
    const {password, avatar, username, email, ...inputs} = req.body;   

    if (username == null) {
        return res.status(403).json({message:"username cannot be null"});
    } 

    if (id !== tokenUserId) {
        return res.status(403).json({message:" Not authorized! "});
    }
    
    let updatedPassword = null;
    try {
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }
        
        const userRef = doc(db, "users", id);
        const updateData = {
            ...inputs,
            ...(username && {username}),
            ...(email && {email}),
            ...(updatedPassword && {password: updatedPassword}),
            ...(avatar && {avatar})
        };
        
        await updateDoc(userRef, updateData);
        
        // Get updated user data
        const updatedUserDoc = await getDoc(userRef);
        const updatedUser = { id: updatedUserDoc.id, ...updatedUserDoc.data() };
        const {password: userPassword, ...restOfData} = updatedUser;
        
        res.status(200).json(restOfData);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "failed to update user"});
    }
}

export const deleteUser = async(req, res) =>{
    const id = req.params.id;
    const tokenUserId = req.userId;
    
    if (id !== tokenUserId) {
        return res.status(403).json({message: "Not authorized"});
    }
    
    try {
        const userRef = doc(db, "users", id);
        await deleteDoc(userRef);
        res.status(200).json({message: "User deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "failed to delete user"});
    }
}