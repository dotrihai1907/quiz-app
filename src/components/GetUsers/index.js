import "antd/dist/antd.css";
import {
  SearchOutlined,
  EditOutlined,
  SaveOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Typography,
  Tag,
  Avatar,
  Row,
  Form,
  Popconfirm,
  Tooltip,
  Select,
} from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useSelector, useDispatch } from "react-redux";

import { selectUsers } from "../../redux/user/selector";
import { selectAccessToken } from "../../redux/auth/selector";

import { updateUser } from "../../redux/user/actions";

function GetUsers() {
  const { Title } = Typography;
  const { Option } = Select;
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const accessToken = useSelector(selectAccessToken);

  const originData = users.map((user) => ({
    key: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    score: user.score,
    avatar: user.avatar,
  }));

  //-------------search--------

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

  //---------------edit----------------

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => (
    <td {...restProps}>
      {editing && dataIndex !== "role" && (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      )}
      {editing && dataIndex === "role" && (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Select ${title}!`,
            },
          ]}
        >
          <Select>
            <Option value={"user"} />
            <Option value={"admin"} />
          </Select>
        </Form.Item>
      )}
      {!editing && children}
    </td>
  );

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      username: "",
      email: "",
      role: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }

      let userUpdate = { ...newData[index] };
      delete userUpdate.key;
      delete userUpdate.score;

      let userIdUpdate = newData[index].key;

      dispatch(updateUser(accessToken, userUpdate, userIdUpdate));
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  //-----------------------------------------

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "20%",
      editable: true,
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      editable: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "15%",
      editable: true,
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
      width: "10%",
      sorter: (a, b) => a.score.length - b.score.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "15%",
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Row justify="space-around">
            <Tooltip placement="left" title="Save">
              <SaveOutlined onClick={() => save(record.key)} />
            </Tooltip>

            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Tooltip placement="right" title="Cancel">
                <StopOutlined />
              </Tooltip>
            </Popconfirm>
          </Row>
        ) : (
          <Tooltip placement="top" title="Edit">
            <EditOutlined
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            />
          </Tooltip>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <Form form={form} component={false}>
        <Table
          sticky
          columns={mergedColumns}
          dataSource={data}
          bordered
          pagination={{ onChange: cancel }}
          rowClassName="editable-row"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          title={() => (
            <Title level={3} style={{ textAlign: "center" }}>
              List Of Registered Accounts
            </Title>
          )}
        />
      </Form>
    </div>
  );
}

export default GetUsers;
