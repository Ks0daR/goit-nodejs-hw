import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import path from 'path';

export async function imgCompressor(req, res, next) {
  const { path: uncompressedFilePath, filename } = req.file;
  const FILE_DESTINATION = `${__dirname}../../../public/images`;

  const file = imagemin([`../../tmp/${filename}`], {
    destination: FILE_DESTINATION,
    plugins: [imageminJpegtran(), imageminPngquant({ quality: [0.6, 0.8] })],
  });

  req.file.path = path.join(FILE_DESTINATION, filename);

  next();
}
