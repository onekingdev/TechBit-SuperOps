/*  SuperOps Data Operation Functions  */

export const get_tickets_per_user_for_chart = ( tickets, technicians, time_range ) => {
    const ticketCount = {};
    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i]; //updatedTime, resolutionTime
        if (ticket.status === 'Closed' && ticket.createdTime >= time_range.start && ticket.createdTime <= time_range.end) {
            const technicianId = ticket.technician?.userId;
            if (technicianId) {
                const technician = technicians.find(user => user.userId === technicianId);
                if (technician) {
                    ticketCount[technician.name] = (ticketCount[technician.name] || 0) + 1;
                }
            }
        }
    }
    console.log(time_range)
    console.log(ticketCount)
    const result = {
        "labels" : Object.keys(ticketCount),
        "data" : Object.values(ticketCount)
    }
    return result;
}


/*  Date Operation Functions  */

export const nlastWeek = i => {
    const today = new Date();
    const lastSunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7 * i - today.getDay());
    lastSunday.setHours(0);
    lastSunday.setMinutes(0);
    lastSunday.setSeconds(0);
    lastSunday.setMilliseconds(0);
    
    const lastSaturday = new Date(lastSunday.getFullYear(), lastSunday.getMonth(), lastSunday.getDate() + 6);
    lastSaturday.setHours(23);
    lastSaturday.setMinutes(59);
    lastSaturday.setSeconds(59);
    lastSaturday.setMilliseconds(999);

    return { start: lastSunday, end:lastSaturday };
}


/*  API Request Functions  */

export const request_api = async (type, input) => {
    const data = await fetch('/api/v1/superops', {
        method: 'POST',
        body: JSON.stringify({type, input}),
        headers: {
        'Content-Type': 'application/json'
        }
    })
    const result = await data.json();
    return result;
}