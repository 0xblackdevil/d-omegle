import axios from "axios";

const sessionData = await axios.post(
    'https://api.huddle01.com/api/v1/create-room',
    {
        "title": "Test Meeting",
        "tokenType": "ERC1155",
        "chain": "POLYGON",
        "contractAddress": ["0xADC327CC02d3230af723C47eCd91a73F600d7E3A"]
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.HUDDLE_API_KEY,
        },
    }
);

export { sessionData }