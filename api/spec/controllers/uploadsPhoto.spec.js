const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const { post } = require("superagent");
const secret = process.env.JWT_SECRET;

describe('UploadPhotos', () => {
    it('should upload a file successfully', async () => {

      const mockUploadMiddleware = jest.fn().mockImplementation((req, res, next) => {
        req.body = { title: req.query.title };
        req.file = [{ originalname: 'sample.name', mimetype: 'sample.type', path: 'sample.url' }];
        return next();
      });
  
      const uploadMock = {
        single: jest.fn().mockImplementation(() => mockUploadMiddleware),
      };

      jest.doMock('multer', () => uploadMock);

      const response = await request(app)
        .post('/uploadPhotos')    
        .attach('image', '../frontend/public/images/test.jpeg');
  
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('File uploaded successfully');
    });
  });
  