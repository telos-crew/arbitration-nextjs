import nextConnect from 'next-connect'
import multer from 'multer'
import axios from 'axios'
import FormData from 'form-data'

const DSTOR_API_KEY = process.env.DSTOR_API_KEY
const DSTOR_UPLOAD_ENDPOINT = process.env.DSTOR_UPLOAD_ENDPOINT
const DSTOR_TOKEN_ENDPOINT = process.env.DSTOR_TOKEN_ENDPOINT

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
	console.log('apiRoute.post, req.file: ', req.file);
	const token = await getAccessTokenWithApiKey()
	const data = uploadFile(token, req.file, 'Uploaded via Telos Arbitration')
  res.status(200).json(data);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const getAccessTokenWithApiKey = async (): Promise<string | undefined> => {
	try {
			if(!DSTOR_API_KEY) throw new Error("api key not found.");
			
			if(!DSTOR_TOKEN_ENDPOINT) throw new Error("token endpoint not found.");

			const { data: { access_token } } = await axios(DSTOR_TOKEN_ENDPOINT, {
					method: 'get',
					headers: {
							'Content-Type': 'application/json',
							'api-key': DSTOR_API_KEY // insert 64-character developer API key obtained from 'Account' tab of UI dashboard
					}
			});

			if(!access_token) throw new Error("Error getting token");

			console.log('access_token from API key: ', access_token);

			return access_token;
	} catch (error) {
			console.log('login error: ', error);
			return undefined;
	}
}

const uploadFile = async (token: string, file: any, comment: string):Promise<any> => {
	try {
			if(!DSTOR_UPLOAD_ENDPOINT) throw new Error("add file endpoint not found.");
			console.log(1)
			const fd = new FormData();
			console.log('uploadFile file: ', file)
			fd.append('', file);
			console.log(2)
			const { data: uploadedFileData } = await axios(DSTOR_UPLOAD_ENDPOINT, {
					method: 'POST',
					headers: {
							Authorization: `Bearer ${token}`,
							'Access-Control-Allow-Origin': '*',
							'Content-Type': 'multipart/form-data',
							'x-dstor-parent-id': 0, // root folder,
							'x-dstor-comment': comment,
							...fd.getHeaders()
					},
					data: fd
			});

			console.log('uploadedFileData: ', uploadedFileData);

			return uploadedFileData
	} catch (err) {
			console.log('uploadFile error: ', err.message);
			return undefined;
	}
}