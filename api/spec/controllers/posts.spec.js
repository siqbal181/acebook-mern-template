const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const { post } = require("superagent");
const secret = process.env.JWT_SECRET;

let token;

describe("/posts", () => {
  beforeAll(async () => {
    const user = new User({
      email: "test@test.com",
      password: "12345678",
      username: "username",
    });
    await user.save();

    token = JWT.sign(
      {
        user_id: user.id,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  });

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      expect(response.status).toEqual(201);
    });

    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      let posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].message).toEqual("hello world");
    });

    test("returns a new token", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });
      expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
      await request(app).post("/posts").send({ message: "hello again world" });
      let posts = await Post.find();
      expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      let response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });
      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("returns posts in order from newest to oldest", async () => {
      let post1 = new Post({
        message: "howdy!",
        dateCreated: "2023-05-10T20:51:59.427Z",
      });
      let post2 = new Post({
        message: "hola!",
        dateCreated: "2023-05-10T22:51:59.427Z",
      });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let messages = response.body.posts.map((post) => post.message);
      expect(messages).toEqual(["hola!", "howdy!"]);
    });

    test("the response code is 200", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      expect(response.status).toEqual(200);
    });

    test("returns a new token", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("returns no posts", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/posts");
      expect(response.body.posts).toEqual(undefined);
    });

    test("the response code is 401", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/posts");
      expect(response.status).toEqual(401);
    });

    test("does not return a new token", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/posts");
      expect(response.body.token).toEqual(undefined);
    });
  });


  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ imageUrl: "test/image.png", token: token });
      expect(response.status).toEqual(201);
    });

    test("creates a new post with image", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ imageUrl: "test/image.png", token: token });
      let posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].imageUrl).toEqual("test/image.png");
    });
  });

  describe("GET, when token is present", () => {
    test("find by author", async () => {
      let post1 = new Post({ message: "howdy!", dateCreated: "2023-05-10T20:51:59.427Z", author: "toppy"});
      let post2 = new Post({ message: "hola!", dateCreated: "2023-05-10T22:51:59.427Z", author: "mat"});
      
      await post1.save();
      await post2.save();

      const username = 'toppy';

      let response = await request(app)
        .get(`/posts/${username}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });

      console.log(response.body)

      expect(response.status).toBe(200);
      expect(response.body.posts[0].author).toEqual("toppy");
    });
  });

  describe("LikeByUser", () => {
    test("should add or remove username from likedBy array depending on its presence", async () => {

      const post = new Post({ message: "hola!", likedBy: ["toppy"], dateCreated: "2023-05-10T22:51:59.427Z", author: "mat"});
      
      await post.save();
  
      const postId = post._id;
      const username = "mat";
  
      const response = await request(app)
        .patch(`/posts/${postId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ username: username, token: token });
      
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("OK");
      expect(response.body.post).toBeDefined();
  
      const updatedPost = response.body.post;

      expect(updatedPost.likedBy).toContain(username);
    });

    test("likedBy array depending on its presence", async () => {

        const post = new Post({ message: "hola!", likedBy: ["toppy"], dateCreated: "2023-05-10T22:51:59.427Z", author: "mat"});
        
        await post.save();
    
        const postId = post._id;
        const username = "toppy";
    
        const response = await request(app)
          .patch(`/posts/${postId}`)
          .set("Authorization", `Bearer ${token}`)
          .send({ username: username, token: token });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("OK");
        expect(response.body.post).toBeDefined();
    
        const updatedPost = response.body.post;

        expect(updatedPost.likedBy).not.toContain(username);
      });
  });

});
