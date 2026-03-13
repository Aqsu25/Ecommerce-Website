import { useState } from "react";
import axios from "axios";

export default function AIChat(){

const [message,setMessage] = useState("");
const [reply,setReply] = useState("");

const sendMessage = async () => {

const res = await axios.post(
"http://localhost:8000/api/ai/chat",
{ message }
);

setReply(res.data.response);

}

return(

<div>

<h2>AI Shopping Assistant</h2>

<input
value={message}
onChange={(e)=>setMessage(e.target.value)}
placeholder="Ask about products"
/>

<button onClick={sendMessage}>
Ask AI
</button>

<p>{reply}</p>

</div>

)

}