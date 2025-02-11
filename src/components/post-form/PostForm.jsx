// import React, { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
// import appwriteService from "../../appwrite/configur";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);

//     const submit = async (data) => {

//         if (!userData || !userData.$id) {
//             console.error("User data is missing or user is not logged in.");
//             return;
//         }
        
//         if (post) {
//             const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

//             if (file) {
//                 appwriteService.deleteFile(post.featuredImage);
//             }

//             const dbPost = await appwriteService.updatePost(post.$id, {
//                 ...data,
//                 featuredImage: file ? file.$id : undefined,
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             }
//         }
        
        
//         else {
//             const file = await appwriteService.uploadFile(data.image[0]);

//             if (file) {
//                 const fileId = file.$id;
//                 data.featuredImage = fileId;


              





//                 const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     };

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, []);

//     React.useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, slugTransform, setValue]);

//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                     }}
//                 />
//                 <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
//             </div>
//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 />
//                 {post && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={appwriteService.getFilePreview(post.featuredImage)}
//                             alt={post.title}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status", { required: true })}
//                 />
//                 <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     );
// }


// import React, { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
// import appwriteService from "../../appwrite/configur";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);

//     const submit = async (data) => {
//         // ✅ Ensure user is logged in
//         if (!userData || !userData.$id) {
//             console.log("User Data from Redux:", userData);

//             console.error("User data is missing or user is not logged in.");
//             return;
//         }

//         try {
//             let featuredImage = post?.featuredImage || null; // Preserve old image if available

//             // ✅ If a new image is uploaded, replace the old one
//             if (data.image?.[0]) {
//                 const file = await appwriteService.uploadFile(data.image[0]);

//                 if (!file || !file.$id) {
//                     console.error("File upload failed. Cannot proceed.");
//                     return;
//                 }

//                 featuredImage = file.$id;

//                 // ✅ Delete old image only if it's different
//                 if (post?.featuredImage) {
//                     await appwriteService.deleteFile(post.featuredImage);
//                 }
//             }

//             // ✅ Add `featuredImage` to data to ensure Appwrite validation passes
//             data.featuredImage = featuredImage;

//             console.log("Submitting Post Data:", data);

//             let dbPost;
//             if (post) {
//                 dbPost = await appwriteService.updatePost(post.$id, {
//                     ...data,
//                     featuredImage,
//                 });
//             } else {
//                 dbPost = await appwriteService.createPost({
//                     ...data,
//                     userId: userData.$id,
//                 });
//             }

//             console.log("API Response:", dbPost);

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             } else {
//                 console.error("Post creation/update failed. Check Appwrite permissions.");
//             }
//         } catch (error) {
//             console.error("Error submitting post:", error);
//         }
//     };

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, []);

//     React.useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, slugTransform, setValue]);

//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                     }}
//                 />
//                 <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
//             </div>
//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image")}
//                 />
//                 {post?.featuredImage && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={appwriteService.getFilePreview(post.featuredImage)}
//                             alt={post.title}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status", { required: true })}
//                 />
//                 <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     );
// }
// import React, { useCallback, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
// import appwriteService from "../../appwrite/configur";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);

//     // 🔹 State for managing file upload
//     const [uploading, setUploading] = useState(false);
//     const [featuredImageId, setFeaturedImageId] = useState(post?.featuredimage || null);

//     const submit = async (data) => {
//         if (!userData || !userData.$id) {
//             console.error("User data is missing or user is not logged in.");
//             return;
//         }

//         try {
//             setUploading(true);

//             let newFeaturedImageId = featuredImageId; // Keep old image if no new one is uploaded

//             // 🔹 Upload new image if selected
//             if (data.image?.[0]) {
//                 console.log("Uploading new image:", data.image[0]);

//                 const file = await appwriteService.uploadFile(data.image[0]);

//                 if (!file || typeof file !== "object" || !file.$id) {
//                     console.error("File upload failed. Cannot proceed. Received:", file);
//                     setUploading(false);
//                     return;
//                 }

//                 newFeaturedImageId = file.$id;
//                 await setFeaturedImageId(newFeaturedImageId); // Ensure state updates before submission
//                 console.log("File uploaded successfully, ID:", newFeaturedImageId);

//                 // Delete old image if it's different
//                 if (post?.featuredimage && post.featuredimage !== newFeaturedImageId) {
//                     await appwriteService.deleteFile(post.featuredimage);
//                 }
//             }

//             // 🔹 Ensure `featuredImageId` is updated before submitting
//             if (!newFeaturedImageId) {
//                 console.error("No featured image found. Aborting submission.");
//                 setUploading(false);
//                 return;
//             }

//             const postData = {
//                 ...data,
//                 userid: userData.$id,
//                 featuredimage: newFeaturedImageId,
//             };

//             console.log("Final Post Data Before Submission:", postData);

//             let dbPost;
//             if (post) {
//                 dbPost = await appwriteService.updatePost(post.$id, postData);
//             } else {
//                 dbPost = await appwriteService.createPost(postData);
//             }

//             console.log("API Response:", dbPost);

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             } else {
//                 console.error("Post creation/update failed. Check Appwrite permissions.");
//             }
//         } catch (error) {
//             console.error("Error submitting post:", error);
//         } finally {
//             setUploading(false);
//         }
//     };

//     // 🔹 Slug generation from title
//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");
//         return "";
//     }, []);

//     React.useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, slugTransform, setValue]);

//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                     }}
//                 />
//                 <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
//             </div>
//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image")}
//                 />
//                 {featuredImageId && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={appwriteService.getFilePreview(featuredImageId)}
//                             alt="Featured Preview"
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status", { required: true })}
//                 />
//                 <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" disabled={uploading}>
//                     {uploading ? "Uploading..." : post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     );
// }
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/configur";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredimage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredimage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userid: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}