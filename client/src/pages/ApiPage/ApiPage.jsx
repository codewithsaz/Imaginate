import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import NavbarComponent from "../../components/navbarComponent/navbarComponent";

const TABLE_HEAD = ["Name", "Domain", "API KEY", "Actions"];

const TABLE_ROWS = [
  {
    name: "Api key one",
    domain: "http://localhost:5173/",
    key: "GsRuw/iQZbxbHZ//QBBW5OMzSIjya70r1AiAijP/rXJdyLKU7lLAIboP1oHDr7aE",
  },
  {
    name: "Api key one",
    domain: "http://localhost:5173/",
    key: "GsRuw/iQZbxbHZ//QBBW5OMzSIjya70r1AiAijP/rXJdyLKU7lLAIboP1oHDr7aE",
  },
];

const ApiPage = () => {
  const theUser = localStorage.getItem("user");
  let theUserObj = JSON.parse(theUser);

  const [apiName, setapiName] = useState("");
  const [apiPurpose, setapiPurpose] = useState("");
  const [apiDomain, setApiDomain] = useState("");
  const [apiList, setApiList] = useState([]);
  const [newApi, setNewApi] = useState(null);
  const addApiToList = () => {
    if (newApi) {
      setApiList((prevApiList) => [...prevApiList, newApi]);
      setNewApi(null); // Clear the newApi state after adding it to the list
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8080/api/get", {
        headers: {
          Authorization: theUserObj.token,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        console.log(response.data);
        setApiList(response.data.apiKeys);
      }
    }
    fetchData();
  }, []);

  async function handleCreate() {
    const apiObj = {
      apiName: apiName,
      apiPurpose: apiPurpose,
      apiDomain: apiDomain,
    };
    console.log(apiObj);

    const response = await axios.post(
      "http://localhost:8080/api/create",
      apiObj,
      {
        headers: {
          Authorization: theUserObj.token,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      console.log(response.data.api);
      setApiList((prevApiList) => [...prevApiList, response.data.api]);
    }
  }

  async function handleDelete(apiKey) {
    const response = await axios.delete("http://localhost:8080/api/delete", {
      headers: {
        Authorization: theUserObj.token,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        apiKey,
      },
    });

    if (response.data.success) {
      console.log(response.data);
      const updatedApiList = apiList.filter((api) => api.apiKey !== apiKey);
      setApiList(updatedApiList);
    }
  }
  return (
    <>
      <NavbarComponent />
      <div className="w-full min-h-[90vh] flex  p-2 gap-5">
        <div className=" w-56 min-h-full flex flex-col gap-2 bg-gray-800 rounded-md p-2">
          <button className="w-full py-2 px-4 hover:bg-gray-700 rounded-md">
            Generate Keys
          </button>
          <button className="w-full py-2 px-4 hover:bg-gray-700 rounded-md">
            Api Endpoints
          </button>
        </div>
        <div className="w-full h-full flex flex-col">
          <section
            id="Prompts"
            className="w-full p-2 lg:w-3/5 flex flex-col gap-2 items-center text-white"
          >
            <Card className=" bg-blue-gray-900 p-4" shadow={false}>
              <Typography variant="h4" color="white">
                Create API key
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Enter details to get API Key.
              </Typography>
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                  <Input
                    size="lg"
                    label="Name"
                    color="white"
                    onChange={(e) => {
                      setapiName(e.target.value);
                    }}
                    required
                  />
                  <Input
                    size="lg"
                    label="Purpose"
                    color="white"
                    onChange={(e) => {
                      setapiPurpose(e.target.value);
                    }}
                    required
                  />
                  <Input
                    size="lg"
                    label="domain"
                    color="white"
                    onChange={(e) => {
                      setApiDomain(e.target.value);
                    }}
                    required
                  />
                </div>

                <Button
                  className="mt-6 bg-blue-gray-700"
                  fullWidth
                  onClick={handleCreate}
                >
                  Get Api Key
                </Button>
              </form>
            </Card>
          </section>
          <section
            id="Prompts"
            className=" w-full  lg:w-3/5 flex  items-center"
          >
            {apiList.length > 0 && (
              <Card className="h-full w-full overflow-auto bg-blue-gray-900 text-white ">
                <table className="w-full min-w-max table-auto text-center">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-black"
                        >
                          <Typography
                            variant="small"
                            className="font-normal leading-none "
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {apiList.map(({ apiName, apiDomain, apiKey }, index) => (
                      <tr key={index} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography variant="small" className="font-normal">
                            {apiName}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" className="font-normal">
                            {apiDomain}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" className="font-normal">
                            {apiKey}
                          </Typography>
                        </td>
                        <td className="p-4 ">
                          <Button
                            className=" bg-red-800"
                            onClick={() => {
                              handleDelete(apiKey); // Pass apiKey directly, without an object
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default ApiPage;
