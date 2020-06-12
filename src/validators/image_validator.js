const Errors = require('../helpers/errors');

const validateType = (
  imageBufferHeaders, fileBuffer, mimetype,
) => imageBufferHeaders.some(
  (imageBufferHeader) => {
    let isEqual;
    // Determine if the mime type is equal
    isEqual = (imageBufferHeader.mimetype === mimetype);

    // Determine the header prefix of the logo
    if (isEqual && imageBufferHeader.prefix) {
      const buf = Buffer.from(imageBufferHeader.prefix);

      isEqual = buf.equals(
      // Using buffer.slice method to cut buffers in bytes
        fileBuffer.slice(0, imageBufferHeader.prefix.length),
      );
    }

    // Determine the header suffix of the logo
    if (isEqual && imageBufferHeader.suffix) {
      const buf = Buffer.from(imageBufferHeader.suffix);
      isEqual = buf.equals(fileBuffer.slice(-imageBufferHeader.suffix.length));
    }

    return (!!isEqual);
  },
);

const ImageValidator = (imageArray) => {
  const imageVufferHeaders = [
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

  const errorItem = imageArray.find((
    image,
  ) => (validateType(imageVufferHeaders, image.buffer, image.mimetype) === false));

  if (errorItem) {
    const imageError = new Errors.BadRequest(`Image ${errorItem.fieldname} has unacceptable format`);
    return { imageError, images: null };
  }

  const images = imageArray.reduce((obj, image) => ({ ...obj, [image.fieldname]: image }), {});

  return { imageError: null, images };
};

module.exports = { ImageValidator };
