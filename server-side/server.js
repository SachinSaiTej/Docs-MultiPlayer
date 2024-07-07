const mongoose = require("mongoose");
const Document = require("./Document");

mongoose.connect(
  "mongodb+srv://sai:sai@cluster0.xmknaze.mongodb.net/google-docs-clone",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // React app URL
    methods: ["GET", "POST"],
  },
});

const defaultValue = "";

async function findOrCreateDoc(id) {
  if (id == null) return;
  const doc = await Document.findById(id);
  if (doc) return doc;
  return await Document.create({ _id: id, data: defaultValue });
}

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("get-document", async (documentId) => {
    const doc = await findOrCreateDoc(documentId);
    socket.join(documentId);
    socket.emit("load-document", doc.data);

    socket.on("send-changes", (delta) => {
      console.log("Delta", delta);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data: data });
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
