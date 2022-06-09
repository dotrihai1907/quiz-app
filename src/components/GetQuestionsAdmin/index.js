import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  Input,
  Table,
  Space,
  Button,
  Row,
  Form,
  Popconfirm,
  Tooltip,
  Typography,
} from "antd";
import Highlighter from "react-highlight-words";
import { useState, useRef, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectQuestionsAdmin } from "../../redux/question/selector";
import { selectAccessToken } from "../../redux/auth/selector";

import { updateQuestion, deleteQuestion } from "../../redux/question/actions";

function GetQuestionsAdmin() {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const questionsAdmin = useSelector(selectQuestionsAdmin);
  const accessToken = useSelector(selectAccessToken);

  const originData = questionsAdmin.map((item) => ({
    key: item.id,
    question: item.question,
    answer1: item.answer1,
    answer2: item.answer2,
    answer3: item.answer3,
    answer4: item.answer4,
    correctanswer: item.correctanswer,
  }));

  //=======search============================
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

  //=================edit=======
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
      {editing ? (
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
      ) : (
        children
      )}
    </td>
  );

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctanswer: "",
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

      let questionUpdate = { ...newData[index] };
      delete questionUpdate.key;

      let questionIdUpdate = newData[index].key;

      dispatch(updateQuestion(accessToken, questionUpdate, questionIdUpdate));
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  //==============delete=================

  const EditableContext = createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const handleDelete = (key) => {
    const newData = originData.filter((item) => item.key !== key);
    setData(newData);

    dispatch(deleteQuestion(key, accessToken));
  };

  //===========================

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      width: "20%",
      editable: true,
      ...getColumnSearchProps("question"),
    },
    {
      title: "Answer 1",
      dataIndex: "answer1",
      key: "answer1",
      width: "14%",
      editable: true,
    },
    {
      title: "Answer 2",
      dataIndex: "answer2",
      key: "answer2",
      width: "14%",
      editable: true,
    },
    {
      title: "Answer 3",
      dataIndex: "answer3",
      key: "answer3",
      width: "14%",
      editable: true,
    },
    {
      title: "Answer 4",
      dataIndex: "answer4",
      key: "answer4",
      width: "14%",
      editable: true,
    },
    {
      title: "Correct Answer",
      dataIndex: "correctanswer",
      key: "correctanswer",
      width: "14%",
      editable: true,
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
          <Row justify="space-around">
            <Tooltip placement="left" title="Edit">
              <EditOutlined
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              />
            </Tooltip>
            <Tooltip placement="right" title="Delete">
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.key)}
              >
                <DeleteOutlined disabled={editingKey !== ""} />
              </Popconfirm>
            </Tooltip>
          </Row>
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
        inputType: "text",
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
              row: EditableRow,
            },
          }}
          title={() => (
            <Title level={3} style={{ textAlign: "center" }}>
              List Of Questions
            </Title>
          )}
        />
      </Form>
    </div>
  );
}

export default GetQuestionsAdmin;
