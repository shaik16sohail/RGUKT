const getHomePage=(req,res)=>{
    const Outpasses=[
        { type: "Regular", status: "Pending", date: "2024-02-12" },
        { type: "Emergency", status: "Approved", date: "2024-02-12" },
        { type: "Regular", status: "Pending", date: "2024-02-12" },
        { type: "Emergency", status: "Approved", date: "2024-02-12" },
        { type: "Regular", status: "Pending", date: "2024-02-12" },
        { type: "Emergency", status: "Approved", date: "2024-02-12" },
        { type: "sohail", status: "Pending", date: "2024-02-12" },
    ];
    const Issues=[
        {type:"Maintainance",status:"Solved",date:"2024-02-12"},
        {type:"Electricity",status:"Pending",date:"2024-02-12"},
        {type:"Sanitation",status:"solved",date:"2024-02-12"},
        {type:"Mess",status:"solved",date:"2024-02-12"},
        
    ];
    res.status(200).json({Outpasses,Issues});
}
module.exports={getHomePage};