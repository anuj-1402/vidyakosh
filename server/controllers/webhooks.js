import { Webhook } from "svix";
import User from "../models/User.js";   
import { asyncHandler } from "../utils/asynchandler.js";

// manage clerk user wid db 

export const clerkWebhooks=asyncHandler(async (req, res) => {
    const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = await whook.verify(JSON.stringify(req.body), {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
    });
    
    const {data,type}=req.body;
    
    switch(type){
        case "user.created":
            await User.create({
                _id: data.id,
                name: data.first_name + " " + data.last_name,
                email: data.email_addresses[0].email_address,
                imageurl: data.image_url
            });
            break;
            
        case "user.updated":
            await User.findByIdAndUpdate(
                data.id,
                {
                    name: data.first_name + " " + data.last_name,
                    email: data.email_addresses[0].email_address,
                    imageurl: data.image_url
                }
            );
            break;
            
        case "user.deleted":
            await User.findByIdAndDelete(data.id);
            break;
            
        default:
            console.log('Unhandled webhook type:', type);
            break;
    }
    
    res.status(200).json({received: true});
});
