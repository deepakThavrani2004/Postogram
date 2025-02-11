// import conf from '../conf/conf.js';
// import { Client, ID, Databases, Storage, Query } from "appwrite";

// export class Service{
//     client = new Client();
//     databases;
//     bucket;
    
//     constructor(){
//         this.client
//         .setEndpoint(conf.appwriteUrl)
//         .setProject(conf.appwriteProjectId);
//         this.databases = new Databases(this.client);
//         this.bucket = new Storage(this.client);
//     }

//     async createPost({title, slug, content, featuredimage, status, userid}){
//         try {
//             return await this.databases.createDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug,
//                 {
//                     title,
//                     content,
//                     featuredimage,
//                     status,
//                     userid,
//                 }
//             )
//         } catch (error) {
//             console.log("Appwrite serive :: createPost :: error", error);
//         }
//     }

//     async updatePost(slug, {title, content, featuredimage, status}){
//         try {
//             return await this.databases.updateDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug,
//                 {
//                     title,
//                     content,
//                     featuredimage,
//                     status,

//                 }
//             )
//         } catch (error) {
//             console.log("Appwrite serive :: updatePost :: error", error);
//         }
//     }

//     async deletePost(slug){
//         try {
//             await this.databases.deleteDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug
            
//             )
//             return true
//         } catch (error) {
//             console.log("Appwrite serive :: deletePost :: error", error);
//             return false
//         }
//     }

//     async getPost(slug){
//         try {
//             return await this.databases.getDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug
            
//             )
//         } catch (error) {
//             console.log("Appwrite serive :: getPost :: error", error);
//             return false
//         }
//     }

//     async getPosts(queries = [Query.equal("status", "active")]){
//         try {
//             return await this.databases.listDocuments(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 queries,
                

//             )
//         } catch (error) {
//             console.log("Appwrite serive :: getPosts :: error", error);
//             return false
//         }
//     }

//     // file upload service

//     async uploadFile(file){
//         try {
//             return await this.bucket.createFile(
//                 conf.appwriteBucketId,
//                 ID.unique(),
//                 file
//             )
//         } catch (error) {
//             console.log("Appwrite serive :: uploadFile :: error", error);
//             return false
//         }
//     }

//     async deleteFile(fileId){
//         try {
//             await this.bucket.deleteFile(
//                 conf.appwriteBucketId,
//                 fileId
//             )
//             return true
//         } catch (error) {
//             console.log("Appwrite serive :: deleteFile :: error", error);
//             return false
//         }
//     }

//     getFilePreview(fileId){
//         return this.bucket.getFilePreview(
//             conf.appwriteBucketId,
//             fileId
//         )
//     }
// }


// const service = new Service()
// export default service


// import conf from '../conf/conf.js';
// import { Client, ID, Databases, Storage, Query } from "appwrite";

// export class Service{
//     client = new Client();
//     databases;
//     bucket;
    
//     constructor(){
//         this.client
//         .setEndpoint(conf.appwriteUrl)
//         .setProject(conf.appwriteProjectId);
//         this.databases = new Databases(this.client);
//         this.bucket = new Storage(this.client);
//     }

//     async createPost({title, slug, content, featuredimage, status, userid}) {
//         try {
//             // Ensure featuredimage is valid (it can be null or a file ID)
//             const postData = {
//                 title,
//                 content,
//                 featuredimage: featuredimage || null, // Add validation to ensure it's not undefined
//                 status,
//                 userid,
//             };

//             // Create a document in the database
//             return await this.databases.createDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug,
//                 postData
//             );
//         } catch (error) {
//             console.log("Appwrite service :: createPost :: error", error);
//         }
//     }

//     async updatePost(slug, {title, content, featuredimage, status}) {
//         try {
//             // Update the document with the new data, ensuring featuredimage is passed correctly
//             const postData = {
//                 title,
//                 content,
//                 featuredimage: featuredimage || null, // Add validation
//                 status,
//             };

//             return await this.databases.updateDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug,
//                 postData
//             );
//         } catch (error) {
//             console.log("Appwrite service :: updatePost :: error", error);
//         }
//     }

//     async deletePost(slug) {
//         try {
//             // Delete the document from the database
//             await this.databases.deleteDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug
//             );
//             return true;
//         } catch (error) {
//             console.log("Appwrite service :: deletePost :: error", error);
//             return false;
//         }
//     }

//     async getPost(slug) {
//         try {
//             return await this.databases.getDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug
//             );
//         } catch (error) {
//             console.log("Appwrite service :: getPost :: error", error);
//             return false;
//         }
//     }

//     async getPosts(queries = [Query.equal("status", "active")]) {
//         try {
//             return await this.databases.listDocuments(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 queries
//             );
//         } catch (error) {
//             console.log("Appwrite service :: getPosts :: error", error);
//             return false;
//         }
//     }

//     // File upload service
//     // async uploadFile(file) {
//     //     try {
//     //         const uploadedFile = await this.bucket.createFile(
//     //             conf.appwriteBucketId,
//     //             ID.unique(),
//     //             file
//     //         );

//     //         // Ensure that the file's unique ID is returned
//     //         if (uploadedFile && uploadedFile.$id) {
//     //             return uploadedFile.$id; // Return only the file ID
//     //         }
//     //         return false;
//     //     } catch (error) {
//     //         console.log("Appwrite service :: uploadFile :: error", error);
//     //         return false;
//     //     }
//     // }

//     async uploadFile(file) {
//         try {
//             console.log("Uploading file:", file);
    
//             const uploadedFile = await this.bucket.createFile(
//                 conf.appwriteBucketId,
//                 ID.unique(),
//                 file
//             );
    
//             console.log("Upload response from Appwrite:", uploadedFile); // Log full response
    
//             if (uploadedFile && uploadedFile.$id) {
//                 console.log("File uploaded successfully, ID:", uploadedFile.$id);
//                 return uploadedFile.$id;
//             }
    
//             console.error("Upload failed, no file ID returned.");
//             return false;
//         } catch (error) {
//             console.log("Appwrite service :: uploadFile :: error", error);
//             return false;
//         }
//     }
    

//     // async uploadFile(file) {
//     //     try {
//     //         console.log("Uploading file:", file); // Debugging step
//     //         const uploadedFile = await this.bucket.createFile(
//     //             conf.appwriteBucketId,
//     //             ID.unique(),
//     //             file
//     //         );
    
//     //         console.log("Upload response:", uploadedFile); // Log full response
    
//     //         if (uploadedFile && uploadedFile.$id) {
//     //             console.log("File uploaded successfully, ID:", uploadedFile.$id);
//     //             return uploadedFile.$id;
//     //         }
    
//     //         console.error("Upload failed, no file ID returned.");
//     //         return false;
//     //     } catch (error) {
//     //         console.log("Appwrite service :: uploadFile :: error", error);
//     //         return false;
//     //     }
//     // }
    
//     async deleteFile(fileId) {
//         try {
//             // Ensure that fileId is passed correctly

        
//             if (!fileId) {
//                 console.error("Invalid fileId provided.");
//                 return false;
//             }

//             await this.bucket.deleteFile(
//                 conf.appwriteBucketId,
//                 fileId
//             );
//             return true;
//         } catch (error) {
//             console.log("Appwrite service :: deleteFile :: error", error);
//             return false;
//         }
//     }

//     getFilePreview(fileId) {
//         try {
//             const previewUrl = service.getFilePreview(fileId);
//             console.log("fileId before getFilePreview:", fileId);

//             // Ensure the fileId is valid before calling Appwrite API
//             if (!fileId) {
//                 console.error("Invalid fileId provided.");
//                 return null;
//             }
//             return this.bucket.getFilePreview(
//                 conf.appwriteBucketId,
//                 fileId
//             );
//         } catch (error) {
//             console.log("Appwrite service :: getFilePreview :: error", error);
//             return null;
//         }
//     }
// }

// const service = new Service();
// export default service;
import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredimage, status, userid}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredimage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service