export const BusinessFunctionList_query = `query getBusinessFunctionList {
    getBusinessFunctionList {
        businessFunctionId
        name
    }
}`;

export const TechnicianList_query = `query getTechnicianList($input: ListInfoInput!) {
    getTechnicianList(input: $input) {
        userList {
            userId,
            firstName,
            lastName,
            name,
            email,
            contactNumber,
            emailSignature,
            designation,
            businessFunction,
            team,
            reportingManager,
            role,
            groups
        }
        listInfo {
            page,
            pageSize,
            condition,
            hasMore,
            totalCount
        }
    }
}`;

export const TicketList_query = `query getTicketList($input: ListInfoInput!) {
    getTicketList(input: $input) {
        tickets {
            ticketId,
            technician,
            requester,
            additionalRequester,
            followers,
            techGroup,
            site,
            client,
            displayId,
            ticketType,
            status,
            source,
            createdTime,
            updatedTime,
            firstResponseDueTime,
            firstResponseTime,
            firstResponseViolated
            resolutionDueTime,
            resolutionTime,
            resolutionViolated,
            customFields,
            subject,
            priority,
            impact,
            urgency,
            category,
            subcategory,
            cause,
            subcause,
            resolutionCode,
            sla
        }
        listInfo {
            page,
            pageSize,
            condition,
            hasMore,
            totalCount
        }
    }
}
`;
