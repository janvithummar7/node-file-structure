import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/routes'; 
const methodNames = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'connect', 'trace'];

const App = () => {
  console.log("Heyy")
  const [routes, setRoutes] = useState([]);
  const [emptyField, setEmptyField] = useState([]);
  const [invalidMethod, setInvalidMethod] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setRoutes(response.data);

      const emptyIndices = [];
      const invalidIndices = [];

      response.data.forEach((route, index) => {
        const emptyFields = Object.entries(route).filter(([key, value]) => !value);
        if (emptyFields.length > 0) {
          emptyIndices.push({ index, fields: emptyFields.map(([key]) => key) });
        }

        if (!methodNames.includes(route.method.toLowerCase())) {
          invalidIndices.push(index);
        }
      });

      setEmptyField(emptyIndices);
      setInvalidMethod(invalidIndices);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  return (
    <div>
      {(
        <div>
          {emptyField && (
            <div>
              <h2>Empty Field</h2>
              <ul>
                {emptyField.map(({ index, fields }) => (
                  <li key={index}>
                    Index: {index}, Empty Fields: {fields.join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {invalidMethod && (
            <div>
              <h2>Invalid Method</h2>
              <ul>
                {invalidMethod.map((index) => (
                  <li key={index}>
                    Index: {index}, Method: {routes[index].method ? routes[index].method : "null" }
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
