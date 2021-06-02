// ** Table Columns
import { data, basicColumns } from '../data'

// ** Third Party Components
import { ChevronDown, Plus } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Button } from 'reactstrap'

const DataTablesBasic = ({
  title = "", 
  columns = basicColumns, 
  dataD = data, 
  textButton = '',
  modal = () => {},
  showButton = true
 }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>{title}</CardTitle>
       {showButton && <Button className='ml-2' color='primary' onClick={() => { modal() }}>
          <Plus size={15} />
          <span className='align-middle ml-50'>{textButton}</span>
        </Button>}
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={dataD}
        columns={columns}
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Card>
  )
}

export default DataTablesBasic
