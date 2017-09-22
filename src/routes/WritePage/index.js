import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 100,
  fixed: 'left',
  filters: [{
    text: 'Joe',
    value: 'Joe',
  }, {
    text: 'John',
    value: 'John',
  }],
  onFilter: (value, record) => record.name.indexOf(value) === 0,
}, {
  title: 'Other',
  children: [{
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 200,
    sorter: (a, b) => a.age - b.age,
  }, {
    title: 'Address',
    children: [{
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      width: 200,
    }, {
      title: 'Block',
      children: [{
        title: 'Building',
        dataIndex: 'building',
        key: 'building',
        width: 100,
      }, {
        title: 'Door No.',
        dataIndex: 'number',
        key: 'number',
        width: 100,
      }],
    }],
  }],
}, {
  title: 'Company',
  children: [{
    title: 'Company Address',
    dataIndex: 'companyAddress',
    key: 'companyAddress',
  }, {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName',
  }],
}, {
  title: 'Gender',
  dataIndex: 'gender',
  key: 'gender',
  width: 60,
  fixed: 'right',
}];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}
class WritePage extends React.PureComponent{
  componentWillMount(){
    this.props.dispatch({ type: 'route/hide', payload: { hideLeft: true }});
  }
  componentWillUnmount(){
    this.props.dispatch({ type: 'route/hide', payload: { hideLeft: false }});
  }
  componentDidMount(){
    this.props.dispatch({type: 'tableData/fetch', payload: { id: this.props.routeParams.id}})
  }
  render(){
    const { loading } = this.props;
    return (
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        size="middle"
        scroll={{ x: '130%', y: 240 }}
      />
    )
  }
}
function mapStateToProps({ loading: { models: { tableData }}}) {
  return {
    loading: tableData
  }
}

export default connect(mapStateToProps)(WritePage);
