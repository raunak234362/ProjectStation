import { MainContent, Sidebar } from '../../components/index'

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <MainContent />
    </div>
  )
}

export default Dashboard
