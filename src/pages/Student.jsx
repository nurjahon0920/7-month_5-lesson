import Dashboard from "./../components/Dashboard";
import React, { useState, useEffect } from "react";
import "../App.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  // TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";

const Student = () => {
  const [items, setItems] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [group, setGroup] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/students`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const addItem = (firstName, lastName, group) => {
    const newItem = { id: items.length + 1, firstName, lastName, group };
    setItems([...items, newItem]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && group) {
      addItem(firstName, lastName, group);
      setFirstName("");
      setLastName("");
      setGroup("");
    }
  };

  const updateItem = (id) => {
    const updatedFirstName = prompt("Enter the new firstName:");
    const updatedLastName = prompt("Enter the new lastName:");
    const updatedGroup = prompt("Enter the new group:");
    if (updatedFirstName && updatedLastName && updatedGroup) {
      const updatedItems = items.map((item) =>
        item.id === id
          ? {
              ...item,
              firstName: updatedFirstName,
              lastName: updatedLastName,
              group: updatedGroup,
            }
          : item
      );
      setItems(updatedItems);
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div style={{ display: "flex" }} className="container">
      <Dashboard />
      <div
        style={{
          paddingTop: "100px",
          display: "flex",
          flexDirection: "column",
          fontSize: "22px",
          gap: "15px",
        }}>
        <form onSubmit={handleSubmit} className="fetch_form">
          <TextField
            variant="outlined"
            type="text"
            name="firstName"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            type="text"
            name="lastName"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            type="text"
            name="group"
            label="Group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            required
          />
          <Button variant="contained" type="submit">
            Add Item
          </Button>
        </form>
        <Table sx={{ marginLeft: "0", marginTop: "0" }} className="Table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Group</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.group}</TableCell>
                <Button variant="contained" onClick={() => updateItem(item.id)}>
                  Edit
                </Button>
                <Button variant="contained" onClick={() => deleteItem(item.id)}>
                  Delete
                </Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Student;
