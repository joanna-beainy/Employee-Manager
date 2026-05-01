import { useEmployeeStore } from '../Store/Store';
import Employee from './Employee';

function EmployeesTable() {
  const { filteredEmployees } = useEmployeeStore();
  const employees = filteredEmployees();

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md">
      <div className="max-h-[25rem] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0">
            <tr className="bg-slate-50 border-b border-slate-200">
              {['Name', 'Position', 'Department', 'Salary', 'Actions'].map((h) => (
                <th
                  key={h}
                  className={`px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider ${h === 'Actions' ? 'text-right' : 'text-left'}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.length > 0 ? (
              employees.map((employee) => (
                <Employee key={employee._id} employee={employee} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <i className="fa-solid fa-users-slash text-3xl text-slate-200" />
                    <p className="text-sm text-slate-400 font-medium">No employees found</p>
                    <p className="text-xs text-slate-300">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesTable;
