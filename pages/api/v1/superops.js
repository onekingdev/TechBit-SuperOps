import { fetchQuery } from "./get";
import { 
  BusinessFunctionList_query,
  TechnicianList_query,
  TicketList_query
} from "./queries";
import { TECHNICIANLIST, BUSINESSFUNCTIONLIST, TICKETLIST } from "../../types";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { type, input } = req.body;
  let data;  
  try {
    switch (type) {
      case TECHNICIANLIST:
        data = await fetchQuery(TechnicianList_query, input);
        break;
  
      case BUSINESSFUNCTIONLIST:
        data = await fetchQuery(BusinessFunctionList_query, input);
        break;
  
      case TICKETLIST:
        data = await fetchQuery(TicketList_query, input);
        break;
    
      default:
        data = [];
        break;
    }

    res.status(200)
    res.json({
      status: 'ok',
      message: 'success',
      data: data
    })
  } catch (error) {
    console.error(error); // Handle the exception
    res.status(500)
    res.json({
      status: 'no',
      message: 'Server has some problems now'
    })
  }
}