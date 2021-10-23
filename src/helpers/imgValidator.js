const isImageURL = require('image-url-validator').default;

const imgValidator = async (image) => {
    // Si se proporciona image, verificar que existe y se trata de una imagen
    if (image != null) {
        const imgValid = await isImageURL(image);

        if (!imgValid) {
            const error = new Error(`La url proporcionada no es valida o no contiene un archivo de imagen: ${image}`);
            error.status = 418;
            throw error;
        }
    }

    // si ok, sigue...
}

module.exports = imgValidator;
