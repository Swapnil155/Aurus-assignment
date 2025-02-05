import multer, { StorageEngine } from 'multer';
import ApiError from '../utils/helper/ApiError';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
const maxFileSize = 10 * 1024 * 1024; // 10 MB (in bytes)
const allowedFileTypes = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'video/mp4',
	'video/x-msvideo',
	'video/x-matroska',
	'video/webm',
	'video/ogg',
	'video/quicktime',
];

const createFolder = (folderPath: string): void => {
	if (!existsSync(folderPath)) {
		try {
			mkdirSync(folderPath, { recursive: true });
		} catch (err) {
			throw new Error(
				`Failed to create folder at ${folderPath}: ${err instanceof Error ? err.message : 'Unknown error'}`
			);
		}
	}
};

const storage = (folderName: string = 'asset'): StorageEngine =>
	multer.diskStorage({
		destination: (
			req,
			file,
			cb: (error: Error | null, destination: string) => void
		): void => {
			try {
				const basePath = path.resolve('public');
				createFolder(basePath);
				const targetPath = path.join(basePath, folderName);
				createFolder(targetPath);
				cb(null, targetPath);
			} catch (err) {
				cb(err as Error, '');
			}
		},
		filename: (req, file, cb) => {
			const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
			const ext = path.extname(file.originalname);
			const baseName = path.basename(file.originalname, ext);
			cb(null, `${baseName}-${uniqueSuffix}${ext}`);
		},
	});

const fileFilter =
	(allowedTypes: string[]) =>
	(
		req: Express.Request,
		file: Express.Multer.File,
		cb: multer.FileFilterCallback
	): void => {
		if (allowedTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			const error = new ApiError(
				400,
				`File type ${file.mimetype} is not allowed`
			);
			cb(error as unknown as null, false);
		}
	};

interface UploaderOptions {
	fileSize?: number;
	[key: string]: unknown;
}

export const uploader = (
	folderName: string = 'uploads',
	allowedTypes: string[] = allowedFileTypes,
	options: UploaderOptions = {}
): multer.Multer => {
	const { fileSize = maxFileSize, ...otherOptions } = options;

	return multer({
		storage: storage(folderName),
		limits: { fileSize },
		fileFilter: fileFilter(allowedTypes),
		...otherOptions,
	});
};
