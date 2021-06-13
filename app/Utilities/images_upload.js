
/* Params configuration */
const upload_preset = '_upload_images';
const cloud_name = 'ap-proyecto';
const api_base_url = 'https://api.cloudinary.com/v1_1/ap-proyecto/image/upload';

/**
 * To upload an image to Cloudinary
 * Receives an object call photo with next information:
 *       photo = {
 *           uri: <phone file directory>,
 *           type: <'image/jpg'>,
 *           name: <'mi_image.jpg'>
 *       }
 **/
const handleUpdate = async (photo) => {

    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', upload_preset);
    data.append('cloud_name', cloud_name);

    const img_url = await fetch(api_base_url, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.json();
    }).then(data => {
        return data.secure_url;
    }).catch(error => {
        console.log(error);
    });
    return img_url;
}

/**
 * Receives an array with the objects of the pictures
 * For every picture update photos to Cloudinary
 **/
const uploadImages = async (imagesSelected) => {

    let img_urls = [];

    for await (let photo of imagesSelected) {
        const img = await handleUpdate(photo);
        img_urls.push(img);
    }
    return img_urls
}

export {
    uploadImages,
    handleUpdate
}