import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import path from 'path';
import fs from 'fs';

export async function imgCompressor(req, res, next) {
  const { path: uncompressedFilePath, filename } = req.file;
  const FILE_DESTINATION = `${__dirname}../../../public/images`;

  const files = await imagemin([uncompressedFilePath], {
    destination: FILE_DESTINATION,
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });

  console.log(files);

  console.log(
    fs.exists(uncompressedFilePath, (exists) => {
      console.log(exists);
    })
  );

  console.log(
    fs.exists(FILE_DESTINATION, (exists) => {
      console.log(exists);
    })
  );

  req.file.path = path.join(FILE_DESTINATION, filename);

  next();
}
