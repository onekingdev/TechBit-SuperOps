import { request } from "graphql-request";

export const fetchQuery = async ( query, input ) => {
    const API_TOKEN = 'api-eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI2MDI3MTc4MDY2ODA2ODQ5NTM2IiwicmFuZG9taXplciI6Ilx1MDAxMO-_vWRcdTAwMTbvv70277-9RVxiXHUwMDE3In0.IiW_of6eHWw4hcXfLDHcjZRSA5cIfcDuaFReWG1zq06i5fbthJiT57ldLecqGspT7y-FMETYkNksCHE-dylOr4xvZWu8Ij4hNxheqLIj_xWdkvJEPtQO8v4tKuK-kJquDjy6bzJ9z8tOw_-gXV5tCuOBwd-CQ8ZMnv20l4YjoLIwm3-WrE7PZrQpQ4zT9loNof1qK1HdIBN0L8tRHjoIaRCF0tK82p_1l-Dvd-r0jQfLPtaOducK3n_L9CQAUINIvL8v9pCPUMAq-E6wCPh46Lf5X514nRwU5Cxb2AUvFgN8X5cUqyyNccHHuMvVkMGCSiZwqE1AjWMtQe_qrQHj_w';
    const headers = {
        Authorization: `Bearer ${API_TOKEN}`,
        CustomerSubDomain: 'techbitusa'
    };
    const data = await request('https://api.superops.ai/msp', query, input, headers);
    return data;
};
