import { useEffect } from 'react';
import { useEmployeeStore } from './Store/Store.js';
import AddEmployeePopup from './components/AddEmployeePopup';
import EmployeesTable from './components/EmployeesTable';
import EmployeeSearch from './components/EmployeeSearch';

function App() {
  const { fetchEmployees, setShowModal, employees } = useEmployeeStore();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const totalSalary = employees.reduce((total, e) => total + e.salary, 0);
  const uniqueDepartments: string[] = [];

  for (const employee of employees) {
    if (!uniqueDepartments.includes(employee.department)) {
      uniqueDepartments.push(employee.department);
    }
  }

  const departments = uniqueDepartments.length;


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
              <i className="fa-solid fa-users text-white text-sm" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Employee Manager</h1>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm"
          >
            <i className="fa-solid fa-plus" />
            Add Employee
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className=" flex-1 bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <i className="fa-solid fa-user-tie text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Employees</p>
              <p className="text-2xl font-bold text-blue-700">{employees.length}</p>
            </div>
          </div>
          <div className=" flex-1 bg-red-50 border border-red-200 rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <i className="fa-solid fa-building text-red-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">Departments</p>
              <p className="text-2xl font-bold text-red-700">{departments}</p>
            </div>
          </div>
          <div className=" flex-1 bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <i className="fa-solid fa-sack-dollar text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Total Payroll</p>
              <p className="text-2xl font-bold text-emerald-700">${totalSalary.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <EmployeeSearch />
        </div>

        <EmployeesTable />
      </div>

      <AddEmployeePopup />
    </div>
  );
}

export default App;