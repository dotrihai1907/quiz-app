import "antd/dist/antd.css";
import { SearchOutlined } from "@ant-design/icons";
import {
  Form,
  Button,
  Input,
  Space,
  Popconfirm,
  Table,
  Typography,
  Tag,
  Avatar,
} from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/user/selector";

function GetUsers() {
  const { Title } = Typography;
  const users = useSelector(selectUsers);

  const data = users.map((user, index) => ({
    key: index + 1,
    username: user.username,
    email: user.email,
    role: user.role,
    score: user.score,
    avatar: user.avatar,
  }));


  //-------------sort/search--------

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "20%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "15%",
      sorter: (a, b) => a.role.length - b.role.length,
      sortDirections: ["descend", "ascend"],
      render: (role) => {
        let color = role === "admin" ? "magenta" : "green";
        if (role === "user") {
          color = "purple";
        }
        return (
          <Tag style={{ minWidth: "50px", textAlign: "center" }} color={color}>
            {role}
          </Tag>
        );
      },
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      width: "15%",
      sorter: (a, b) => a.score.length - b.score.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "20%",
      render: (avatar) => (
        <Avatar
          src={avatar}
          size={{
            xs: 24,
            md: 40,
            xl: 60,
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        sticky
        columns={columns}
        dataSource={data}
        title={() => (
          <Title level={3} style={{ textAlign: "center" }}>
            List Of Registered Accounts
          </Title>
        )}
      />
    </div>
  );
}

export default GetUsers;
