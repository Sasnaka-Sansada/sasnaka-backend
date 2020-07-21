const Errors = require('../helpers/errors');
const { fileUpload } = require('../helpers/file_upload_handler');

/**
 * Service that manages asset uploads
 * @abstract
 * @category Services
 */
class AssetService {
  /**
     * Uploads an image array and returns a URL list
     * @param {File}[] images images to be uploaded
     * @returns {string}[] imageUrls image url array
  */
  static async UploadImage({ images }) {
    const promises = images.map(async (image) => {
      const url = await fileUpload({ file: image, folder: 'Images' });
      return { name: image.originalname, url };
    });

    const imageUrls = await Promise.all(promises);

    const fileError = imageUrls.some((url) => (!(url)));

    if (fileError) {
      throw new Errors.InternalServerError('Image upload failed');
    }

    return imageUrls;
  }

  /**
     * Uploads an document array and returns a URL list
     * @param {File}[] documents documents to be uploaded
     * @returns {string}[] documentUrls document url array
  */
  static async UploadDocument({ documents }) {
    const promises = documents.map(async (document) => {
      const url = await fileUpload({ file: document, folder: 'Documents' });
      return { name: document.originalname, url };
    });

    const documentUrls = await Promise.all(promises);

    const fileError = documentUrls.some((url) => (!(url)));

    if (fileError) {
      throw new Errors.InternalServerError('Document upload failed');
    }

    return documentUrls;
  }
}

module.exports = AssetService;
