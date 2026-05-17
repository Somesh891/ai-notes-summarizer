require("dotenv").config();

const express=require("express");
const cors= require("cors");
const OpenAi=require("openai");

const app=express();

app.use(cors());
app.use(express.json());
 
const client= new OpenAi({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
})

app.post("/summarize", async(req,res)=>{
    const notes=req.body.notes;

    try{
        const completion = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",

            messages: [
                {
                    role: "user",
                    content: `Summarize these notes clearly:\n\n${notes}`
                },
            ],
        });
        
        const summary = completion.choices[0].message.content;
        res.json({
            summary: summary
        });

        } catch (error) {
          console.log(error);

          res.status(500).json({
                error: "Something went wrong"
            });
        }
    });
    
app.listen(3000, () => {
  console.log("Server running on port 3000");
});