import nextConnect from 'next-connect'
import multer from 'multer'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

const NEXT_PUBLIC_DSTOR_API_KEY = process.env.NEXT_PUBLIC_DSTOR_API_KEY
const NEXT_PUBLIC_DSTOR_UPLOAD_ENDPOINT = process.env.NEXT_PUBLIC_DSTOR_UPLOAD_ENDPOINT
const NEXT_PUBLIC_DSTOR_TOKEN_ENDPOINT = process.env.NEXT_PUBLIC_DSTOR_TOKEN_ENDPOINT

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
	const { path } = req.file
	const readStream = fs.createReadStream(path)
	const token = await getAccessTokenWithApiKey()
	const response = await uploadFile(token, readStream, 'Uploaded via Telos Arbitration')
// Assuming that 'path/file.txt' is a regular file.
	fs.unlink(path, (err) => {
		if (err) throw err;
		res.status(200).json(response);
	})
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const getAccessTokenWithApiKey = async (): Promise<string | undefined> => {
	try {
			if(!NEXT_PUBLIC_DSTOR_API_KEY) throw new Error("api key not found.");
			if(!NEXT_PUBLIC_DSTOR_TOKEN_ENDPOINT) throw new Error("token endpoint not found.");

			const { data: { access_token } } = await axios(NEXT_PUBLIC_DSTOR_TOKEN_ENDPOINT, {
					method: 'get',
					headers: {
							'Content-Type': 'application/json',
							'api-key': NEXT_PUBLIC_DSTOR_API_KEY // insert 64-character developer API key obtained from 'Account' tab of UI dashboard
					}
			});

			if(!access_token) throw new Error("Error getting token");

			return access_token;
	} catch (error) {
			console.log('login error: ', error);
			return undefined;
	}
}

const uploadFile = async (token: string, file: any, comment: string):Promise<any> => {
	try {
			if(!NEXT_PUBLIC_DSTOR_UPLOAD_ENDPOINT) throw new Error("add file endpoint not found.");
			const fd = new FormData();
			fd.append('', file);
			const { data: uploadedFileData } = await axios(NEXT_PUBLIC_DSTOR_UPLOAD_ENDPOINT, {
					method: 'POST',
					headers: {
							Authorization: `Bearer ${token}`,
							'Access-Control-Allow-Origin': '*',
							'Content-Type': 'multipart/form-data',
							'x-dstor-parent-id': 0, // root folder,
							'x-dstor-comment': comment,
							...fd.getHeaders()
					},
					maxContentLength: 100000000,
					maxBodyLength: 100000000,
					data: fd,
			});

			return uploadedFileData
	} catch (err) {
			console.log('uploadFile error: ', err.message);
			return undefined;
	}
}