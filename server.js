const express=require("express")
const app=express()
const http=require("http").createServer(app)
const io=require("socket.io")(http)
const PORT=process.env.PORT || 3000

// when user enter the page then board.html shows
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/board.html")
})

// when user open localhost:3000/admin page then admin.html shows
app.get("/admin",(req,res)=>{
    res.sendFile(__dirname+"/public/admin.html")
})

// when user open the page
io.on("connection",(socket)=>{
    console.log("New user connected");

    // when user close the page
    socket.on("disconnect",()=>{
        console.log("User disconnected!");
    })

    // when server get the message from admin (access using the key("message") specific in admin page)
    socket.on("message",(msg)=>{
        console.log(msg);

        // send message to the board page with key "message"
        io.emit("message",msg)
    })
})


http.listen(PORT,()=>{
    console.log("connected to server");
})