import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
// import "../App.css";
import axios from "axios";
import { Button, Flex, Input, Modal, Table } from "antd";

const Teacher = () => {
  const [items, setItems] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/teachers`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const addItem = (firstName, lastName, level) => {
    const newItem = {
      id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
      firstName,
      lastName,
      level,
    };
    setItems([...items, newItem]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && level) {
      addItem(firstName, lastName, level);
      setFirstName("");
      setLastName("");
      setLevel("");
    }
  };

  const updateItem = (id) => {
    const updatedFirstName = prompt("Enter the new firstName:");
    const updatedLastName = prompt("Enter the new lastName:");
    const updatedLevel = prompt("Enter the new level:");
    if (updatedFirstName && updatedLastName && updatedLevel) {
      const updatedItems = items.map((item) =>
        item.id === id
          ? {
              ...item,
              firstName: updatedFirstName,
              lastName: updatedLastName,
              level: updatedLevel,
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

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => updateItem(record.id)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => deleteItem(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const [open, setOpen] = React.useState < boolean > false;
  const [loading, setLoading] = React.useState < boolean > true;

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ display: "flex" }} className="container">
      <Dashboard />
      <Flex
        vertical
        sx={{
          paddingTop: "100px",
          flexDirection: "column",
          fontSize: "22px",
          gap: "15px",
        }}>
        <form onSubmit={handleSubmit} className="fetch_form">
          <Input
            showCount
            maxLength={20}
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            showCount
            maxLength={20}
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input
            showCount
            maxLength={20}
            type="text"
            name="level"
            placeholder="Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          />
          <Button
            type="primary"
            htmlType="submit"
            value="large"
            onClick={showLoading}
            sx={{ height: "53px" }}>
            Add Item
          </Button>
          <Modal
            title={<p>Loading Modal</p>}
            footer={
              <Button type="primary" onClick={showLoading}>
                Reload
              </Button>
            }
            loading={loading}
            open={open}
            onCancel={() => setOpen(false)}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </form>
        <Table
          dataSource={items}
          columns={columns}
          className="Table"
          rowKey="id"></Table>
      </Flex>
    </div>
  );
};

export default Teacher;
