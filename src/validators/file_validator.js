const validateType = (
  fileBufferHeaders, fileBuffer, mimetype,
) => fileBufferHeaders.some(
  (fileBufferHeader) => {
    let isEqual;
    // Determine if the mime type is equal
    isEqual = (fileBufferHeader.mimetype === mimetype);

    // Determine the header prefix of the logo
    if (isEqual && fileBufferHeader.prefix) {
      const buf = Buffer.from(fileBufferHeader.prefix);

      isEqual = buf.equals(
      // Using buffer.slice method to cut buffers in bytes
        fileBuffer.slice(0, fileBufferHeader.prefix.length),
      );
    }

    // Determine the header suffix of the logo
    if (isEqual && fileBufferHeader.suffix) {
      const buf = Buffer.from(fileBufferHeader.suffix);
      isEqual = buf.equals(fileBuffer.slice(-fileBufferHeader.suffix.length));
    }

    return (!!isEqual);
  },
);

const imageBufferHeaders = [
  {
    prefix: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    mimetype: 'image/png',
  },
  {
    prefix: [0xff, 0xd8],
    suffix: [0xff, 0xd9],
    mimetype: 'image/jpg',
  },
  {
    prefix: [0xff, 0xd8],
    suffix: [0xff, 0xd9],
    mimetype: 'image/jpeg',
  },
];

const docBufferHeaders = [
  {
    prefix: [0x25, 0x50, 0x44, 0x46, 0x2d],
    mimetype: 'application/pdf',
  },
];

/**
 * Checks if the image has acceptable format and extension
 * @param {File}[] images image array to be validated
 * @returns {Boolean} valid/invalid
 */
const ImageValidator = (images) => images.length > 0 && images.every((image) => image.fieldname && image.fieldname === 'images' && validateType(
  imageBufferHeaders, image.buffer, image.mimetype,
));

/**
 * Checks if the document has acceptable format and extension
 * @param {File} document document to be validated
 */
const DocumentValidator = (documents) => documents.length > 0 && documents.every((document) => document.fieldname && document.fieldname === 'documents' && validateType(
  docBufferHeaders, document.buffer, document.mimetype,
));

module.exports = { ImageValidator, DocumentValidator };
