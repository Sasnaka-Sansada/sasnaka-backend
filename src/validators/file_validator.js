const Errors = require('../helpers/errors');

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

const FileValidator = (fileArray, requiredImages, requiredDocs) => {
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

  const imageArray = [];
  const docArray = [];

  const errorItem = fileArray.find((file) => {
    if (requiredImages.includes(file.fieldname)
    && validateType(imageBufferHeaders, file.buffer, file.mimetype)) {
      imageArray.push(file);
      return false;
    } if (requiredDocs.includes(file.fieldname)
    && validateType(docBufferHeaders, file.buffer, file.mimetype)) {
      docArray.push(file);
      return false;
    } return true;
  });

  if (errorItem) {
    const fileError = new Errors.BadRequest(`File ${errorItem.fieldname} has unacceptable format`);
    return { fileError, images: null, docs: null };
  }

  const images = imageArray.reduce((obj, image) => {
    if ([image.fieldname] in obj) {
      if (Array.isArray(obj[image.fieldname])) {
        return { ...obj, [image.fieldname]: [...obj[image.fieldname], image] };
      }
      return { ...obj, [image.fieldname]: [obj[image.fieldname], image] };
    }
    return { ...obj, [image.fieldname]: image };
  }, {});
  const docs = docArray.map((doc) => ({ name: doc.originalname, doc }));

  return { fileError: null, images, docs };
};

module.exports = { FileValidator };
